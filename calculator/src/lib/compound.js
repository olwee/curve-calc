import BN from 'bignumber.js';

import { Convertor, toHex } from '@/lib/utils';
import CompoundABI from '@/lib/compound.abi';

const CompoundToken = (deployedAddr, { web3, decCoin, decUnder }) => {
  const inst = new web3.eth.Contract(CompoundABI, deployedAddr);
  // Cache
  const cache = {
    totalSupply: '0',
    exchangeRateCurrent: '0',
    exchangeRateStored: '0',
    accrualBlockNumber: '0',
    supplyRatePerBlock: '0',

    exchRateCurrent: '0',
    exchRateStored: '0',
    accrBlkNum: '0',
    supplyRatePerBlk: '0',
  };
  // Get correct units for cToken exchange rate
  const decRate = 18 + decUnder - decCoin;
  // Convertors
  const coinConvertor = Convertor(decCoin);
  const rateConvertor = Convertor(decRate);

  const totalSupply = async (blkNum) => {
    const rawN = await inst
      .methods
      .totalSupply()
      .call(toHex(blkNum));
    cache.totalSupply = coinConvertor.fromNative(rawN);
    return rawN;
  };

  const exchangeRateCurrent = async (blkNum) => {
    const rawN = await inst
      .methods
      .exchangeRateCurrent()
      .call(toHex(blkNum));
    cache.exchangeRateCurrent = BN(rateConvertor.fromNative(rawN));
    cache.exchRateCurrent = rawN;
    return rawN;
  };

  const exchangeRateStored = async (blkNum) => {
    const rawN = await inst
      .methods
      .exchangeRateStored()
      .call(toHex(blkNum));
    // cache.exchangeRateStored = rateConvertor.fromNative(rawN);
    cache.exchangeRateStored = BN(rateConvertor.fromNative(rawN));
    cache.exchRateStored = rawN;
    // console.log(cache);
    return rawN;
  };

  const accrualBlockNumber = async (blkNum) => {
    const rawN = await inst
      .methods
      .accrualBlockNumber()
      .call(toHex(blkNum));
    cache.accrualBlockNumber = rawN;
    cache.accrBlockNum = rawN;
    return rawN;
  };

  const supplyRatePerBlock = async (blkNum) => {
    const rawN = await inst
      .methods
      .supplyRatePerBlock()
      .call(toHex(blkNum));
    cache.supplyRatePerBlock = rawN;
    cache.supplyRatePerBlk = rawN;
    return rawN;
  };

  const clone = () => CompoundToken(deployedAddr, { web3, decCoin, decUnder });

  return {
    totalSupply,
    exchangeRateCurrent,
    exchangeRateStored,
    accrualBlockNumber,
    supplyRatePerBlock,
    cache,
    clone,
  };
};

export default CompoundToken;
