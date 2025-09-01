import { Interface } from '@ethersproject/abi';
import { MulticallParams, MulticallWrapper } from './utils/MulticallWrapper';
import vPairFactory from '../../artifacts/vPairFactory.json';
import { abiCoderParsers } from './utils';

export type FactoryState = {
  pools: string[];
};

export class vFactory {
  static readonly vPairFactoryInterface = new Interface(vPairFactory.abi);
  static readonly contractPairsLengthParser = abiCoderParsers.Int.create(
    'allPairsLength',
    'uint256',
  );
  static readonly contractAllPairsParser = abiCoderParsers.Address.create(
    'allPairs',
    'address',
  );

  /**
   * The function generates state using on-chain calls.
   * @param factoryAddress - address of the vFactory contract
   * @param multiWrapper - MultiWrapper instance
   * @param vFactoryIface - Interface for the vFactory contract
   * @returns state of the event subscriber
   */
  static async generateFactoryState(
    factoryAddress: string,
    multiWrapper: MulticallWrapper,
    vFactoryIface: Interface = vFactory.vPairFactoryInterface,
  ): Promise<Readonly<FactoryState>> {
    // Get allPairsLength
    const lengthMultiCallParams = [
      vFactory.contractPairsLengthParser,
    ].map(
      ({ name, decodeFunction }) =>
        ({
          target: factoryAddress,
          callData: vFactoryIface.encodeFunctionData(name),
          decodeFunction,
        } as MulticallParams<ReturnType<typeof decodeFunction>>),
    );

    const [allPairsLength] = await multiWrapper.aggregate(
      lengthMultiCallParams,
    );

    // Get all pairs (addresses of pools)
    const allPairsMultiCallParams = Array.from(
      { length: allPairsLength },
      (_, i) =>
        ({
          target: factoryAddress,
          callData: vFactoryIface.encodeFunctionData('allPairs', [i]),
          decodeFunction:
            vFactory.contractAllPairsParser.decodeFunction,
        } as MulticallParams<string>),
    );

    const pools = await multiWrapper.aggregate(
      allPairsMultiCallParams,
    );

    return {
      pools,
    };
  }
}
