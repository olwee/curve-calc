import Sandbox from '@/lib/sandbox';

const sandbox = (state, getters, rootState) => {
  const {
    wallet: { blockHeight },
    curveV4: {
      curveCache,
    },
    compound: {
      tokenCache: {
        cDAI: cacheCDAI,
        cUSDC: cacheCUSDC,
      },
    },
  } = rootState;
  const isCurveSet = curveCache === 'NOT_SET';
  const isCompoundDAISet = cacheCDAI === 'NOT_SET';
  const isCompoundUSDCSet = cacheCUSDC === 'NOT_SET';

  if (isCurveSet || isCompoundDAISet || isCompoundUSDCSet) return 'NOT_SET';

  const {
    cstA: A,
    cstUseLending,
    cstCoins: coins,
    cstPrecision,
    cstPrecisionLending,
    cstPrecisionMul,
    cstFee,
    cstFeeDenom,
  } = state;

  const sbox = Sandbox({
    A,
    coins,
    cstUseLending,
    cstPrecision,
    cstPrecisionLending,
    cstPrecisionMul,
    cstFee,
    cstFeeDenom,
  });


  const {
    balancesRaw: {
      cDAI: balanceCDAI,
      cUSDC: balanceCUSDC,
    },
    totalSupplyRaw: poolSupply,
  } = curveCache;

  sbox.setBlkNum(String(blockHeight));

  sbox.setBalances([
    balanceCDAI,
    balanceCUSDC,
  ]);

  sbox.setToken('cDAI', cacheCDAI);
  sbox.setToken('cUSDC', cacheCUSDC);

  sbox.setPoolSupply(poolSupply);

  return sbox;
};

// eslint-disable-next-line import/prefer-default-export
export { sandbox };
