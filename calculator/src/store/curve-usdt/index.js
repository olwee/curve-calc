import Vue from 'vue';
import Vuex from 'vuex';

import * as types from './mutation-types';
import * as actions from './actions';
import * as getters from './getters';

Vue.use(Vuex);

const state = {
  addrs: {
    curveV4: '0x52EA46506B9CC5Ef470C5bf89f17Dc28bB35D85C',
    curveV4Pool: '0x9fc689ccada600b6df723d9e47d84d76664a1f23',
  },
  curveInst: {},
  curveCache: 'NOT_SET',
  calculator: {},
};

const mutations = {
  /*  eslint-disable-next-line */
  [types.SET_CURVE_INST](state, curveInst) {
    state.curveInst = curveInst;
  },
  /*  eslint-disable-next-line */
  [types.SET_CURVE_CACHE](state, curveCache) {
    state.curveCache = curveCache;
  },
};

export default {
  namespaced: true,
  actions,
  getters,
  state,
  mutations,
};
