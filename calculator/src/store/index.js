import Vue from 'vue';
import Vuex from 'vuex';

import wallet from './wallet';
import compound from './compound';
import curveV4 from './curvev4';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    wallet,
    compound,
    curveV4,
  },
});
