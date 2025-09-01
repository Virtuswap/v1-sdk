import { BigIntMath } from './utils/BigIntMath';
import { BigIntRational } from './utils/BigIntRational';
import { AutoBaseFunction, FConstants, FMaximums, FPair } from './types';
import * as exactInFunctions from './functions/exactIn';
import * as exactOutFunctions from './functions/exactOut';
import { autoFdx } from './functions/approximateDerivatives';

function autoObjective(
    autoSol: bigint[],
    constants: FConstants[],
    max: FMaximums[],
    autoF: AutoBaseFunction
): bigint {
    let total = BigInt(0);
    const n = constants.length;
    for (let i = 0; i < n; i++) {
        total += autoF(autoSol[i], constants[i], max[i]);
    }
    return total;
}

/**
 * Project the solution vector onto the feasible set:
 * - For each i:
 *     x_i is clamped to [0, maxValues[i]]
 *     y_i is clamped to [0, Infinity)
 * - And the sum of all components is forced to be exactly amount.
 *
 * We use a simple iterative redistribution of any surplus/deficit among the
 * "free" coordinates that are not at their bounds.
 */
function project(
    sol: bigint[],
    amount: bigint,
    maxValues: FMaximums[],
    tol = BigInt(0),
    maxIter = 100
): bigint[] {
    const dim = sol.length;
    // First, clamp each coordinate to its individual box constraints.
    const proj = sol.slice();
    for (let i = 0; i < dim; i++) {
        if (i % 2 === 0) {
            // x_i: lower bound 0, upper bound maxValues[i/2].max_x
            proj[i] = BigIntMath.min(
                BigIntMath.max(proj[i], BigInt(0)),
                maxValues[i / 2].max_x
            );
        } else {
            // y_i: lower bound 0, upper bound maxValues[(i-1)/2].max_y
            proj[i] = BigIntMath.min(
                BigIntMath.max(proj[i], BigInt(0)),
                maxValues[(i - 1) / 2].max_y
            );
        }
    }
    // Now, adjust the vector so that the sum equals amount.
    // We will iteratively adjust only the coordinates that are not at a bound.
    for (let iter = 0; iter < maxIter; iter++) {
        const total = proj.reduce((acc, v) => acc + v, BigInt(0));
        const delta = amount - total;
        if (BigIntMath.abs(delta) <= tol) break;
        // Determine indices that are not at their bound in the direction we need to change.
        const freeIndices: number[] = [];
        for (let i = 0; i < dim; i++) {
            if (delta > 0) {
                // We need to add. Which indices can increase?
                if (i % 2 === 0) {
                    // x_i: can increase if proj[i] < maxValues[i/2].max_x
                    if (proj[i] < maxValues[i / 2].max_x - tol)
                        freeIndices.push(i);
                } else {
                    // y_i: can increase if proj[i] < maxValues[(i-1)/2].max_y
                    if (proj[i] < maxValues[(i - 1) / 2].max_y - tol)
                        freeIndices.push(i);
                }
            } else {
                // We need to subtract. Which indices can decrease?
                if (proj[i] > tol) freeIndices.push(i);
            }
        }
        let unprocessedDelta = delta;
        let unprocessedIndicesLength = BigInt(freeIndices.length);
        if (unprocessedIndicesLength === BigInt(0)) break; // no free indices
        for (const i of freeIndices) {
            const addVal = BigIntMath.divRoundAwayFromZero(
                unprocessedDelta,
                unprocessedIndicesLength
            );
            if (addVal === BigInt(0)) break;
            proj[i] += addVal;
            // Reapply bounds.
            if (i % 2 === 0) {
                proj[i] = BigIntMath.min(
                    BigIntMath.max(proj[i], BigInt(0)),
                    maxValues[i / 2].max_x
                );
            } else {
                proj[i] = BigIntMath.min(
                    BigIntMath.max(proj[i], BigInt(0)),
                    maxValues[(i - 1) / 2].max_y
                );
            }
            unprocessedDelta -= addVal;
            unprocessedIndicesLength -= BigInt(1);
        }
        if (BigIntMath.abs(unprocessedDelta) > BigInt(0))
            throw new Error('Amount exceeds maximum');
    }
    return proj;
}

export function optimize(
    isExactInput: boolean,
    amount: bigint,
    constants: FConstants[],
    maxValues: FMaximums[],
    maxTime = Number.POSITIVE_INFINITY,
    tol = BigInt(100)
): { solution: FPair[]; values: FPair[] } {
    const { F, autoF } = isExactInput ? exactInFunctions : exactOutFunctions;
    const n = BigInt(constants.length);
    const D = 2 * constants.length;
    const D_BI = BigInt(2) * n;
    // Initialize solution
    const scoreDistribution = new Array<BigIntRational>(constants.length);
    let totalScore = new BigIntRational();
    let step = BigIntMath.divRoundAwayFromZero(amount, BigInt(2));
    for (let i = 0; i < constants.length; i++) {
        const res = autoF(step, constants[i], maxValues[i]);
        const score =
            res === BigInt(0)
                ? new BigIntRational()
                : isExactInput
                  ? new BigIntRational(res)
                  : new BigIntRational(BigInt(1), res);
        scoreDistribution[i] = score;
        totalScore = totalScore.add(score);
    }
    let autoSol = new Array<bigint>(constants.length);
    for (let i = 0; i < constants.length; i++) {
        const k = scoreDistribution[i].div(totalScore);
        autoSol[i] = BigIntMath.divRoundAwayFromZero(amount * k.num, k.den);
    }

    let sol = new Array<bigint>(2 * constants.length);
    for (let i = 0; i < constants.length; i++) {
        const total = autoSol[i];
        const x = BigIntMath.min(total, maxValues[i].max_x);
        const y = total - x;
        sol[2 * i] = x;
        sol[2 * i + 1] = y;
    }

    sol = project(sol, amount, maxValues);
    let bestSol = sol.slice();

    for (let i = 0; i < constants.length; i++) {
        autoSol[i] = sol[2 * i] + sol[2 * i + 1];
    }
    let autoObj = autoObjective(autoSol, constants, maxValues, autoF);

    let bestAutoSol = autoSol.slice();
    let bestObj = autoObj;

    while (step > tol) {
        const microStep =
            BigIntMath.max(BigIntMath.divRoundAwayFromZero(step, n), tol) *
            BigInt(isExactInput ? 1 : -1);
        const upperBounds: bigint[] = new Array(constants.length);
        const lowerBounds: bigint[] = new Array(constants.length);
        const grad: BigIntRational[] = new Array(constants.length);
        let totalGrad = new BigIntRational();
        let maxAbsIndex = 0;
        while (true) {
            for (let i = 0; i < constants.length; i++) {
                upperBounds[i] =
                    maxValues[i].max_x + maxValues[i].max_y - autoSol[i];
                lowerBounds[i] = -autoSol[i];
                grad[i] = autoFdx(
                    autoSol[i],
                    constants[i],
                    maxValues[i],
                    autoF,
                    microStep
                );
                totalGrad = totalGrad.add(grad[i]);
                if (
                    BigIntMath.abs(grad[i].num * grad[maxAbsIndex].den) >
                    BigIntMath.abs(grad[maxAbsIndex].num * grad[i].den)
                )
                    maxAbsIndex = i;
            }
            if (
                totalGrad.num === BigInt(0) &&
                grad.every((g) => g.num === BigInt(0))
            )
                break;

            const avgGrad = new BigIntRational(
                totalGrad.num,
                totalGrad.den * n
            );
            const scaleFactorDenominator = grad[maxAbsIndex].sub(avgGrad);
            if (scaleFactorDenominator.num === BigInt(0)) break;
            const scaleFactor = new BigIntRational(microStep).div(
                scaleFactorDenominator
            );

            let stepVectorSum = BigInt(0);
            const stepVector: bigint[] = new Array(constants.length);

            for (let i = 0; i < constants.length; i++) {
                const normalizedGrad = grad[i].sub(avgGrad).mul(scaleFactor);
                stepVector[i] = BigIntMath.min(
                    BigIntMath.max(
                        BigIntMath.divRoundClosest(
                            normalizedGrad.num,
                            normalizedGrad.den
                        ),
                        lowerBounds[i]
                    ),
                    upperBounds[i]
                );
                stepVectorSum += stepVector[i];
            }

            let residual = -stepVectorSum;
            while (residual !== BigInt(0)) {
                const [minValue, maxValue] = stepVector.reduce(
                    ([min, max], c) => [
                        BigIntMath.min(min, c),
                        BigIntMath.max(max, c),
                    ],
                    [stepVector[0], stepVector[0]]
                );
                let bounds: bigint[];
                const weights: bigint[] = new Array(constants.length);
                // Depending on the sign of residual, decide which free indices can be adjusted.
                // If residual > 0, we need to add to some entries; if residual < 0, we need to subtract.
                const freeIndices: number[] = [];
                let totalWeight = BigInt(0);
                if (residual > BigInt(0)) {
                    bounds = upperBounds;
                    // Need to add: free indices are those that are below their upper bound.
                    for (let i = 0; i < constants.length; i++) {
                        if (stepVector[i] < bounds[i]) {
                            freeIndices.push(i);
                            const weight = stepVector[i] - minValue + BigInt(1);
                            weights[i] = weight;
                            totalWeight += weight;
                        } else {
                            weights[i] = BigInt(0);
                        }
                    }
                } else {
                    // residual < 0n
                    bounds = lowerBounds;
                    // Need to subtract: free indices are those that are above their lower bound.
                    for (let i = 0; i < constants.length; i++) {
                        if (stepVector[i] > bounds[i]) {
                            freeIndices.push(i);
                            const weight = maxValue - stepVector[i] + BigInt(1);
                            weights[i] = weight;
                            totalWeight += weight;
                        } else {
                            weights[i] = BigInt(0);
                        }
                    }
                }
                if (freeIndices.length === 0) break; // No further adjustment possible.

                freeIndices.sort((a, b) => {
                    if (weights[a] > weights[b]) return -1;
                    else if (weights[a] < weights[b]) return 1;
                    else return 0;
                });

                // For each free index, compute its proportional adjustment.
                // desired adjustment = residual * weight[i] / totalWeight
                // Then update stepVector[i] while ensuring we do not exceed bounds.
                let adjustedSomething = false;
                for (let i of freeIndices) {
                    const bound = bounds[i];
                    const weight = weights[i];
                    // Compute desired adjustment.
                    const desired =
                        i === freeIndices[0]
                            ? BigIntMath.divRoundAwayFromZero(
                                  residual * weight,
                                  totalWeight
                              )
                            : (residual * weight) / totalWeight;
                    // Tentative new value.
                    let newVal = stepVector[i] + desired;
                    if (residual > BigInt(0) && newVal > bound) {
                        // Clamp to upper bound.
                        stepVector[i] = bound;
                        adjustedSomething = true;
                    } else if (residual < BigInt(0) && newVal < bound) {
                        // Clamp to lower bound.
                        stepVector[i] = bound;
                        adjustedSomething = true;
                    } else {
                        stepVector[i] = newVal;
                        adjustedSomething = true;
                    }
                }
                // Recompute the current sum and the residual.
                stepVectorSum = stepVector.reduce((acc, y) => acc + y);
                residual = -stepVectorSum;
                if (!adjustedSomething) break; // Avoid an infinite loop if no adjustment is possible.
            }

            const autoCandidate = autoSol.map((v, i) => v + stepVector[i]);
            const autoCandidateObj = autoObjective(
                autoCandidate,
                constants,
                maxValues,
                autoF
            );

            if (
                isExactInput
                    ? autoCandidateObj <= autoObj
                    : autoCandidateObj >= autoObj
            )
                break;

            autoSol = autoCandidate;
            autoObj = autoCandidateObj;

            if (
                isExactInput
                    ? autoCandidateObj > bestObj
                    : autoCandidateObj < bestObj
            ) {
                bestObj = autoCandidateObj;
                bestAutoSol = autoCandidate.slice();
            }

            if (performance.now() >= maxTime) break;
        }

        if (performance.now() >= maxTime) break;

        step = BigIntMath.divRoundAwayFromZero(step, BigInt(2));
    }

    for (let i = 0; i < constants.length; i++) {
        const total = bestAutoSol[i];
        const x = BigIntMath.min(total, maxValues[i].max_x);
        const y = total - x;
        bestSol[2 * i] = x;
        bestSol[2 * i + 1] = y;
    }

    let refineStep = BigIntMath.divRoundAwayFromZero(
        bestSol.reduce((p, v) => BigIntMath.max(p, BigIntMath.abs(v))),
        D_BI
    );
    while (refineStep > tol) {
        if (performance.now() >= maxTime) break;

        let bestDelta = BigInt(0);

        do {
            if (performance.now() >= maxTime) break;

            bestDelta = BigInt(0);
            let best_i = 0,
                best_j = 0;

            const solMinusStep = new Array<bigint | undefined>(bestSol.length);
            const solPlusStep = new Array<bigint | undefined>(bestSol.length);
            const objs = new Array<bigint>(bestSol.length);
            const objsMinus = new Array<bigint | undefined>(bestSol.length);
            const objsPlus = new Array<bigint | undefined>(bestSol.length);
            const objsMinusPlus = new Array<bigint | undefined>(bestSol.length);
            const objsPlusMinus = new Array<bigint | undefined>(bestSol.length);
            for (let i = 0; i < constants.length; i++) {
                [objs[2 * i], objs[2 * i + 1]] = F(
                    bestSol[2 * i],
                    bestSol[2 * i + 1],
                    constants[i]
                );
                objs[2 * i] += objs[2 * i + 1];
                objs[2 * i + 1] = objs[2 * i];

                const solXMinusStep = bestSol[2 * i] - refineStep;
                if (solXMinusStep >= BigInt(0)) {
                    solMinusStep[2 * i] = solXMinusStep;
                    let d: bigint;
                    [objsMinus[2 * i], d] = F(
                        solXMinusStep,
                        bestSol[2 * i + 1],
                        constants[i]
                    );
                    objsMinus[2 * i]! += d;
                }

                const solYMinusStep = bestSol[2 * i + 1] - refineStep;
                if (solYMinusStep >= BigInt(0)) {
                    solMinusStep[2 * i + 1] = solYMinusStep;
                    let d: bigint;
                    [d, objsMinus[2 * i + 1]] = F(
                        bestSol[2 * i],
                        solYMinusStep,
                        constants[i]
                    );
                    objsMinus[2 * i + 1]! += d;
                }

                const solXPlusStep = bestSol[2 * i] + refineStep;
                if (solXPlusStep <= maxValues[i].max_x) {
                    solPlusStep[2 * i] = solXPlusStep;
                    let d: bigint;
                    [objsPlus[2 * i], d] = F(
                        solXPlusStep,
                        bestSol[2 * i + 1],
                        constants[i]
                    );
                    objsPlus[2 * i]! += d;
                    if (solYMinusStep >= BigInt(0)) {
                        [objsPlusMinus[2 * i], objsMinusPlus[2 * i + 1]] = F(
                            solXPlusStep,
                            solYMinusStep,
                            constants[i]
                        );
                        objsPlusMinus[2 * i]! += objsMinusPlus[2 * i + 1]!;
                        objsMinusPlus[2 * i + 1] = objsPlusMinus[2 * i];
                    }
                }

                const solYPlusStep = bestSol[2 * i + 1] + refineStep;
                if (solYPlusStep <= maxValues[i].max_y) {
                    solPlusStep[2 * i + 1] = solYPlusStep;
                    let d: bigint;
                    [d, objsPlus[2 * i + 1]] = F(
                        bestSol[2 * i],
                        solYPlusStep,
                        constants[i]
                    );
                    objsPlus[2 * i + 1]! += d;
                    if (solXMinusStep >= BigInt(0)) {
                        [objsMinusPlus[2 * i], objsPlusMinus[2 * i + 1]] = F(
                            solXMinusStep,
                            solYPlusStep,
                            constants[i]
                        );
                        objsMinusPlus[2 * i]! += objsPlusMinus[2 * i + 1]!;
                        objsPlusMinus[2 * i + 1] = objsMinusPlus[2 * i];
                    }
                }
            }

            for (let i = 0; i < D; i++) {
                if (solMinusStep[i] === undefined) continue;

                for (let j = 0; j < D; j++) {
                    if (i === j) continue;
                    if (solPlusStep[j] === undefined) continue;

                    let refinedObj_i: bigint;
                    let refinedObj_j: bigint;
                    if ((i ^ 1) === j) {
                        refinedObj_i = objsMinusPlus[i]!;
                        refinedObj_j = objsPlusMinus[j]!;
                    } else {
                        refinedObj_i = objsMinus[i]!;
                        refinedObj_j = objsPlus[j]!;
                    }

                    const obj_ij = objs[i] + objs[j];
                    const refinedObj_ij = refinedObj_i + refinedObj_j;

                    const delta =
                        (refinedObj_ij - obj_ij) /
                        ((i ^ 1) === j ? BigInt(2) : BigInt(1));
                    if (isExactInput ? delta > bestDelta : delta < bestDelta) {
                        bestDelta = delta;
                        best_i = i;
                        best_j = j;
                    }
                }
            }

            if (bestDelta !== BigInt(0)) {
                bestSol[best_i] = solMinusStep[best_i]!;
                bestSol[best_j] = solPlusStep[best_j]!;
                bestObj += bestDelta;
            }
        } while (bestDelta !== BigInt(0));

        refineStep = BigIntMath.divRoundAwayFromZero(refineStep, BigInt(2));
    }

    const solution = new Array<{ x: bigint; y: bigint }>(constants.length);
    const values = new Array<{ x: bigint; y: bigint }>(constants.length);
    for (let i = 0; i < constants.length; i++) {
        solution[i] = { x: bestSol[2 * i], y: bestSol[2 * i + 1] };
        const [value_x, value_y] = F(
            bestSol[2 * i],
            bestSol[2 * i + 1],
            constants[i]
        );
        values[i] = { x: value_x, y: value_y };
    }

    return { solution, values };
}
