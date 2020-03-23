import Vue from 'vue';
import Vuex from 'vuex';

import * as types from './mutation-types';
import * as actions from './actions';
import * as getters from './getters';

Vue.use(Vuex);

const state = {
  addrs: {
    curveV4: '0xa2b47e3d5c44877cca798226b7b8118f9bfb7a56',
    curveV4Pool: '0x845838df265dcd2c412a1dc9e959c7d08537f8a2',
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
