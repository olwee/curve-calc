import Web3 from 'web3';

import * as types from './mutation-types';

/* eslint-disable-next-line no-unused-vars */
const setWeb3Provider = async ({ commit, state, dispatch }, cfg) => {
  if (typeof web3 !== 'undefined') {
    //
    try {
      await window.ethereum.enable();
    } catch (err) {
      if (err) console.log(err);
    }
    /* eslint-disable */
    const web3js = new Web3(web3.currentProvider);
    const accounts = await web3js.eth.getAccounts();
    const accountAddress = accounts[0];
    const blockHeight = await web3js.eth.getBlockNumber();
    commit(types.SET_BLOCK_HEIGHT, blockHeight);
    // Get Current Block Height
    commit(types.SET_ACCOUNT_ADDRESS, accountAddress);
    commit(types.SET_WEB3_PROVIDER, web3js);
    // Load Compound Tokens
    dispatch('compound/hookInit', web3js, { root: true });
    // Load Curve
    // dispatch('curveV4/hookInit', web3js, { root: true });
    // Subscribe to New Block Headers
    web3js.eth.subscribe('newBlockHeaders', (err, blockRes) => {
      if (!err) {
        const { number: newBlockHeight } = blockRes;
        commit(types.SET_BLOCK_HEIGHT, newBlockHeight);
        // Fire Hooks
        dispatch('compound/hookNewBlock', web3js, { root: true });
        // dispatch('curveV4/hookNewBlock', web3js, { root: true });
      }
    });
  } else {
    alert('Please install Metamask Extension');
  }
};

export {
  setWeb3Provider,
};
