import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(Buefy);

router.beforeEach((to, from, next) => {
  const web3Provider = store.getters['wallet/web3'];
  const { name } = to;
  if (name !== 'Landing') {
    if (web3Provider === 'NOT_SET') next({ name: 'Landing' });
  }
  next();
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
