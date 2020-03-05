import BN from 'bignumber.js';

import { Convertor, toHex } from '@/lib/utils';
import CompoundABI from '@/lib/compound.abi';
import CurveABI from '@/lib/curve.abi';

const Curve = (deployedAddr, poolAddr, { web3 }) => {
  const instCurve = new web3.eth.Contract(CurveABI, deployedAddr);
  const instPool = new web3.eth.Contract(CompoundABI, poolAddr);

  const poolConvertor = Convertor(18);
  const cTokenConvertor = Convertor(8);

  const coinMap = {
    cDAI: 0,
    cUSDC: 1,
  };

  const cache = {
    // UI Values
    balances: { cDAI: '0', cUSDC: '0' },
    totalSupply: '0',
    // Contract Values
    balancesRaw: { cDAI: '0', cUDC: '0' },
    totalSupplyRaw: '0',
  };

  const totalSupply = async (blkNum) => {
    const rawN = await instPool
      .methods
      .totalSupply()
      .call(toHex(blkNum));
    cache.totalSupply = poolConvertor.fromNative(rawN);
    cache.totalSupplyRaw = rawN;
    return rawN;
  };

  // cDAI, cUSDC is in 8 decimals
  const balanceOf = async (coin, blkNum) => {
    const coinIdx = coinMap[coin];
    const rawN = await instCurve
      .methods
      .balances(coinIdx)
      .call(toHex(blkNum));
    cache.balances[coin] = BN(cTokenConvertor.fromNative(rawN)).toFixed();
    cache.balancesRaw[coin] = rawN;
    return rawN;
  };

  const clone = () => Curve(deployedAddr, poolAddr, { web3 });

  return {
    cache,
    totalSupply,
    balanceOf,
    clone,
  };
};

export default Curve;
