import CurveV4 from '@/lib/curvev4';
import * as types from './mutation-types';

const hookInit = async ({ commit, dispatch, state }, web3) => {
  //
  const { addrs: { curveV4, curveV4Pool } } = state;
  const curve = CurveV4(curveV4, curveV4Pool, { web3 });
  commit(types.SET_CURVE_INST, curve);
  // Fire Off New Block
  dispatch('hookNewBlock');
};

const hookNewBlock = async ({ state, commit }) => {
  //
  const { curveInst } = state;
  const curve = curveInst.clone();
  const tasks = [
    curve.balanceOf('cDAI'),
    curve.balanceOf('cUSDC'),
    curve.balanceOf('USDT'),
    curve.totalSupply(),
  ];
  await Promise.all(tasks);
  commit(types.SET_CURVE_CACHE, curve.cache);
};

export {
  hookInit,
  hookNewBlock,
};
