<template>
  <div class="home-wrapper">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item>
          <h3 class="title is4">Curve Calculator</h3>
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item tag="div">
          Account: {{ accountAddress | sumaddr }}
        </b-navbar-item>
        <b-navbar-item tag="div">
          Height: {{ blockHeight }}
        </b-navbar-item>
      </template>
    </b-navbar>
    <div class="tile is-ancestor">
      <div class="tile is-9">

      </div> <!-- End of Meat Section -->
      <div class="tile is-3 is-vertical is-parent">
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
                {{ cDAI.exchangeRateCurrent }}
              </template>
            </div>
          </nav> <!-- End Of cDAI Level -->
          <nav class="level">
            <div class="level-left">
              Compound USDC
            </div>
            <div class="level-right">
              <template v-if="cUSDC !== 'NOT_SET'">
                {{ cUSDC.exchangeRateCurrent }}
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
                {{ cDAI.exchangeRateStored }}
              </template>
            </div>
          </nav> <!-- End Of cDAI Level -->
          <nav class="level">
            <div class="level-left">
              Compound USDC
            </div>
            <div class="level-right">
              <template v-if="cUSDC !== 'NOT_SET'">
                {{ cUSDC.exchangeRateStored }}
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
                {{ cDAI.supplyRatePerBlock }}
              </template>
            </div>
          </nav> <!-- End Of cDAI Level -->
          <nav class="level">
            <div class="level-left">
              Compound USDC
            </div>
            <div class="level-right">
              <template v-if="cUSDC !== 'NOT_SET'">
                {{ cUSDC.supplyRatePerBlock }}
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
                {{ cDAI.accrualBlockNumber }}
              </template>
            </div>
          </nav> <!-- End Of cDAI Level -->
          <nav class="level">
            <div class="level-left">
              Compound USDC
            </div>
            <div class="level-right">
              <template v-if="cUSDC !== 'NOT_SET'">
                {{ cUSDC.accrualBlockNumber }}
              </template>
            </div>
          </nav> <!-- End Of cUSDC Level -->
          <!-- End of Accrual Block Number Section -->
        </div> <!-- End Of Compound Box -->
      </div> <!-- End of Meat Section -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    // HelloWorld,
  },
  filters: {
    sumaddr(x) { return `${x.substr(0, 6)}...${x.substr(x.length - 6, x.length)}`; },
  },
  computed: {
    accountAddress() { return this.$store.getters['wallet/accountAddress']; },
    blockHeight() { return this.$store.getters['wallet/blockHeight']; },
    web3() { return this.$store.getters['wallet/web3']; },
    cDAI() { return this.$store.getters['compound/cDAI']; },
    cUSDC() { return this.$store.getters['compound/cUSDC']; },
  },
};
</script>
