import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
    preset: 'ts-jest',
    verbose: true,
    testTimeout: 10000,
    coveragePathIgnorePatterns: ['./src/dal/graphclients', './tests'],
};

export default jestConfig;
