<template>
  <div class="box-sandbox has-text-left">
    <h3 class="title is-4">
      Sandbox
    </h3>
    <h3 class="subtitle is-6">
      D: x
    </h3>
    <div class="tile">
      <div class="tile is-parent">
        <div class="tile is-child box">
          <h3 class="title is-6">
            Deposit Calculator
          </h3>
        </div> <!-- End of Deposit Calc -->
      </div> <!-- End of LHS Column -->
      <div class="tile is-parent">
        <div class="tile is-child box">
          <h3 class="title is-6">
            Withdraw Symmetric Calculator
          </h3>
        </div> <!-- End of Withdraw Symm Calc -->
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import BN from 'bignumber.js';

// const clone = (x) => JSON.parse(JSON.stringify(x));

export default {
  name: 'Sandbox',
  data() {
    return {
      cDAI: '0',
      cUSDC: '0',
      wSymmPool: '0',
    };
  },
  components: {
  },
  filters: {
    roundOff: (x, y) => BN(x).toFormat(y),
    fromNative: (x, y) => BN(x).div(BN(`1e${y}`)).toFixed(),
  },
  computed: {
    /*
    sbox() { return this.$store.getters['sandbox/sandbox']; },
    D() {
      if (this.sbox === 'NOT_SET') return -1;
      return this.sbox.getVirtD();
    },
    depositRecv() {
      if (this.sbox === 'NOT_SET') return 0;
      const nativeCDAI = BN(this.cDAI).times(BN('1e8')).toFixed();
      const nativeCUSDC = BN(this.cUSDC).times(BN('1e8')).toFixed();
      return this.sbox.addLiquidity([nativeCDAI, nativeCUSDC]);
    },
    withdrawSymmRecv() {
      if (this.sbox === 'NOT_SET') return ['0', '0'];
      const nativePOOL = BN(this.wSymmPool).times(BN('1e18')).toFixed();
      const result = this.sbox.removeLiquidity(nativePOOL);
      return result.map((r) => BN(r).div(BN('1e8')).toFixed());
    },
    */
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  methods: {
    loaded() {
    },
  },
};
</script>
