<template>
  <div class="box-compound">
    <div class="tile is-child box">
      <h3 class="title is-4">
        Compound Tokens
      </h3>
      <h3 class="title is-6">
        Exchange Rate Current
      </h3>
      <nav class="level">
        <div class="level-left">
          Compound DAI
        </div>
        <div class="level-right">
          <template v-if="cDAI !== 'NOT_SET'">
            {{ cDAI.exchangeRateCurrent | roundPrec(7) }}
          </template>
        </div>
      </nav> <!-- End Of cDAI Level -->
      <nav class="level">
        <div class="level-left">
          Compound USDC
        </div>
        <div class="level-right">
          <template v-if="cUSDC !== 'NOT_SET'">
            {{ cUSDC.exchangeRateCurrent | roundPrec(7) }}
          </template>
        </div>
      </nav> <!-- End Of cUSDC Level -->
      <!-- End Exchange Rate Current Section -->
      <h3 class="title is-6">
        Exchange Rate Stored
      </h3>
      <nav class="level">
        <div class="level-left">
          Compound DAI
        </div>
        <div class="level-right">
          <template v-if="cDAI !== 'NOT_SET'">
            {{ cDAI.exchangeRateStored | roundPrec(7) }}
          </template>
        </div>
      </nav> <!-- End Of cDAI Level -->
      <nav class="level">
        <div class="level-left">
          Compound USDC
        </div>
        <div class="level-right">
          <template v-if="cUSDC !== 'NOT_SET'">
            {{ cUSDC.exchangeRateStored | roundPrec(7) }}
          </template>
        </div>
      </nav> <!-- End Of cUSDC Level -->
      <!-- End Exchange Rate Stored Section -->
      <h3 class="title is-6">
        Supply Rate
      </h3>
      <nav class="level">
        <div class="level-left">
          Compound DAI
        </div>
        <div class="level-right">
          <template v-if="cDAI !== 'NOT_SET'">
            {{ cDAI.supplyRatePerBlock | roundOff(0) }}
          </template>
        </div>
      </nav> <!-- End Of cDAI Level -->
      <nav class="level">
        <div class="level-left">
          Compound USDC
        </div>
        <div class="level-right">
          <template v-if="cUSDC !== 'NOT_SET'">
            {{ cUSDC.supplyRatePerBlock | roundOff(0) }}
          </template>
        </div>
      </nav> <!-- End Of cUSDC Level -->
      <!-- End of Supply Rate Section -->
      <h3 class="title is-6">
        Accrual Block Number
      </h3>
      <nav class="level">
        <div class="level-left">
          Compound DAI
        </div>
        <div class="level-right">
          <template v-if="cDAI !== 'NOT_SET'">
            {{ cDAI.accrualBlockNumber | roundOff(0) }}
          </template>
        </div>
      </nav> <!-- End Of cDAI Level -->
      <nav class="level">
        <div class="level-left">
          Compound USDC
        </div>
        <div class="level-right">
          <template v-if="cUSDC !== 'NOT_SET'">
            {{ cUSDC.accrualBlockNumber | roundOff(0) }}
          </template>
        </div>
      </nav> <!-- End Of cUSDC Level -->
      <!-- End of Accrual Block Number Section -->
    </div> <!-- End Of Compound Box -->
  </div>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import BN from 'bignumber.js';

export default {
  name: 'CompoundBox',
  components: {
    // HelloWorld,
  },
  filters: {
    roundOff: (x, y) => BN(x).toFormat(y),
    roundPrec: (x, y) => BN(x).toPrecision(y),
  },
  computed: {
    cDAI() { return this.$store.getters['compound/cDAI']; },
    cUSDC() { return this.$store.getters['compound/cUSDC']; },
  },
};
</script>
