<template>
  <div class="box-curve">
    <div class="tile is-child box">
      <h3 class="title is-4">
        CurveV4 (cUSDC-cDAI)
      </h3>
      <h3 class="title is-6">
        Pool Token Supply
      </h3>
      <nav class="level">
        <div class="level-left">
          cDAIcUSDC
        </div>
        <div class="level-right">
          <template v-if="curveCache !== 'NOT_SET'">
            {{ curveCache.totalSupply | roundOff(2) }}
          </template>
        </div>
      </nav> <!-- End Of cDAI Level -->
      <!-- End Of Total Supply -->
      <h3 class="title is-6">
        cToken Liquidity
      </h3>
      <nav class="level">
        <div class="level-left">
          Compound DAI
        </div>
        <div class="level-right">
          <template v-if="curveCache !== 'NOT_SET'">
            {{ curveCache.balances.cDAI | roundOff(2) }}
          </template>
        </div>
      </nav> <!-- End Of cDAI Level -->
      <nav class="level">
        <div class="level-left">
          Compound USDC
        </div>
        <div class="level-right">
          <template v-if="curveCache !== 'NOT_SET'">
            {{ curveCache.balances.cUSDC | roundOff(2) }}
          </template>
        </div>
      </nav> <!-- End Of cUSDC Level -->
      <!-- End Of Pool Liquidity -->
      <h3 class="title is-6">
        Sandbox Parameters
      </h3>
      <section class="has-text-left">
        <b-field label="A (uint256)">
          <b-input v-model="cstA"></b-input>
        </b-field>
        <b-field label="Fees (uint256)">
          <b-input v-model="cstFee"></b-input>
        </b-field>
        <b-button type="is-success"
          @click="updateParams"
          expanded
        >
          Update
        </b-button>
      </section> <!-- End of Form -->
    </div> <!-- End Of Curve Box -->
  </div>
</template>
<script>
// @ is an alias to /src
import BN from 'bignumber.js';

const clone = (x) => JSON.parse(JSON.stringify(x));

export default {
  name: 'CurveBox',
  data() {
    return {
      cstA: '',
      cstFee: '',
    };
  },
  components: {
    // HelloWorld,
  },
  filters: {
    roundOff: (x, y) => BN(x).toFormat(y),
  },
  computed: {
    curveCache() { return this.$store.getters['curveV4/cache']; },
    sboxParams() { return this.$store.state.sandbox; },
    sboxParamA() { return this.sboxParams.cstA; },
    sboxParamFee() { return this.sboxParams.cstFee; },
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  methods: {
    loaded() {
      this.cstA = clone(this.sboxParamA);
      this.cstFee = clone(this.sboxParamFee);
    },
    updateParams() {
      this.$store.dispatch('sandbox/updateParams', {
        cstA: clone(this.cstA),
        cstFee: clone(this.cstFee),
      });
    },
  },
};
</script>
