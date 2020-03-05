import BN from 'bignumber.js';

const Convertor = (places) => {
  const offset = BN(`1e${places}`);
  const toNative = (n) => BN(n).times(offset).integerValue().toFixed();
  const fromNative = (n) => BN(n).div(offset).toFixed();

  return { toNative, fromNative };
};

// eslint-disable-next-line consistent-return
const toHex = (n) => {
  if (typeof n !== 'undefined') {
    return `0x${BN(n).toString(16)}`;
  }
};

export {
  Convertor,
  toHex,
};
