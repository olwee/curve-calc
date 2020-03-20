import CompoundToken from '@/lib/compound';
import * as types from './mutation-types';

const hookInit = async ({ commit, dispatch, state }, web3) => {
  //
  const tokenList = Object.keys(state.tokens);
  tokenList.forEach((t) => {
    const {
      tokenAddrs: { [t]: deployedAddr },
      tokenSettings: { [t]: tokenSettings },
    } = state;
    const token = CompoundToken(deployedAddr, { ...tokenSettings, web3 });
    commit(types.SET_TOKEN, { name: t, token });
  });
  // Fire Off New Block
  dispatch('hookNewBlock');
};

const hookNewBlock = async ({ state, commit }) => {
  //
  const tokenList = Object.keys(state.tokens);

  const updater = async (t) => {
    const { tokens: { [t]: tokenStored } } = state;
    const token = tokenStored.clone();
    if (t !== 'USDT') {
      const tasks = [
        token.exchangeRateCurrent(),
        token.exchangeRateStored(),
        token.accrualBlockNumber(),
        token.supplyRatePerBlock(),
      ];
      await Promise.all(tasks);
      commit(types.SET_TOKEN, { name: t, token });
      commit(types.SET_TOKEN_CACHE, { name: t, tokenCache: token.cache });
    }
  };
  const tokenTasks = tokenList.map(updater);
  await Promise.all(tokenTasks);
};

export {
  hookInit,
  hookNewBlock,
};
