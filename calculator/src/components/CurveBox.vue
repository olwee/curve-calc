<template>
  <div class="box-curve">
    <div class="tile is-child box">
      <h3 class="title is-4">
        Curve-USDT (cUSDC-cDAI-USDT)
      </h3>
      <h3 class="title is-6">
        Pool Token Supply
      </h3>
      <nav class="level">
        <div class="level-left">
          cDAIcUSDCUSDT
        </div>
        <div class="level-right">
          <template v-if="curveCache !== 'NOT_SET'">
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
          </template>
        </div>
      </nav> <!-- End Of cDAI Level -->
      <nav class="level">
        <div class="level-left">
          Compound USDC
        </div>
        <div class="level-right">
          <template v-if="curveCache !== 'NOT_SET'">
          </template>
        </div>
      </nav> <!-- End Of cUSDC Level -->
      <!-- End Of Pool Liquidity -->
    </div> <!-- End Of Curve Box -->
  </div>
</template>
<script>
// @ is an alias to /src
import BN from 'bignumber.js';

export default {
  name: 'CurveBox',
  data() {
    return {
      cstA: '',
      cstFee: '',
      curveCache: 'NOT_SET',
    };
  },
  components: {
    // HelloWorld,
  },
  filters: {
    roundOff: (x, y) => BN(x).toFormat(y),
  },
  computed: {
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  methods: {
    loaded() {
    },
    updateParams() {
    },
  },
};
</script>
