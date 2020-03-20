import Vue from 'vue';
import Vuex from 'vuex';

import wallet from './wallet';
import compound from './compound';
import curveUSDT from './curve-usdt';
import curveCompound from './curve-compound';
import sandbox from './sandbox';

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
    curveUSDT,
    curveCompound,
    sandbox,
  },
});
