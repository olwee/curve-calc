<template>
  <div class="box-sandbox has-text-left">
    <h3 class="title is-4">
      Sandbox
    </h3>
    <h3 class="subtitle is-6">
      D: {{ D || roundOff(5) }}
    </h3>
    <div class="tile">
      <div class="tile is-parent">
        <div class="tile is-child box">
          <h3 class="title is-6">
            Deposit Calculator
          </h3>
          <section class="has-text-left">
            <b-field label="cDAI">
              <b-input v-model="cDAI"></b-input>
            </b-field>
            <b-field label="cUSDC">
              <b-input v-model="cUSDC"></b-input>
            </b-field>
          <h3 class="subtitle is-6 has-text-centered">
            Results
          </h3>
          <h3 class="heading has-text-centered">
            PoolToken
          </h3>
          <h3 class="title has-text-centered">
            {{ depositRecv | fromNative(18) | roundOff(3) }}
          </h3>
          </section> <!-- End of Form -->
        </div> <!-- End of Deposit Calc -->
      </div> <!-- End of LHS Column -->
      <div class="tile is-parent">
        <div class="tile is-child box">
          <h3 class="title is-6">
            Withdraw Symmetric Calculator
          </h3>
          <section class="has-text-left">
            <b-field label="PoolToken">
              <b-input v-model="wSymmPool"></b-input>
            </b-field>
          <h3 class="subtitle is-6 has-text-centered">
            Results
          </h3>
          <nav class="level">
            <div class="level-left">
              <div class="level-item has-text-centered">
                <div>
                  <h3 class="heading">
                    cDAI
                  </h3>
                  <h3 class="title">
                    {{ withdrawSymmRecv[0] | roundOff(3) }}
                  </h3>
                </div>
              </div> <!-- End Of Level Item -->
            </div>
            <div class="level-right">
              <div class="level-item has-text-centered">
                <div>
                  <h3 class="heading">
                    cUSDC
                  </h3>
                  <h3 class="title">
                    {{ withdrawSymmRecv[1] | roundOff(3) }}
                  </h3>
                </div>
              </div> <!-- End Of Level Item -->
            </div>
          </nav> <!-- End Of cDAI Level -->
          </section> <!-- End of Form -->
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
