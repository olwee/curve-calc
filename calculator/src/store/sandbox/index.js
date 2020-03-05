import Vue from 'vue';
import Vuex from 'vuex';

import * as types from './mutation-types';
import * as actions from './actions';
import * as getters from './getters';

Vue.use(Vuex);

const state = {
  tokens: {
    cDAI: 'NOT_SET',
    cUSDC: 'NOT_SET',
  },
  tokenAddrs: {
    cDAI: '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643',
    cUSDC: '0x39AA39c021dfbaE8faC545936693aC917d5E7563',
  },
  tokenSettings: {
    cDAI: { decCoin: 8, decUnder: 18 },
    cUSDC: { decCoin: 8, decUnder: 6 },
  },
  tokenCache: {
    cDAI: 'NOT_SET',
    cUSDC: 'NOT_SET',
  },
};

const mutations = {
  /*  eslint-disable-next-line */
  [types.SET_TOKEN](state, { name, token }) {
    state.tokens[name] = token;
  },
  /*  eslint-disable-next-line */
  [types.SET_TOKEN_CACHE](state, { name, tokenCache }) {
    state.tokenCache[name] = tokenCache;
  },
};

export default {
  namespaced: true,
  actions,
  getters,
  state,
  mutations,
};
