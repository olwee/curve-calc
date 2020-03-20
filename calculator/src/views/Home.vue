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
    <div class="padded-top">&nbsp;</div>
    <div class="tile is-ancestor">
      <div class="tile is-3">
      </div> <!-- End of Curve Box Section -->
      <div class="tile is-9">
      </div> <!-- End of Meat Section -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import CompoundBox from '@/components/CompoundBox.vue';
// import CurveBox from '@/components/CurveBox.vue';
// import Sandbox from '@/components/Sandbox.vue';

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    // 'compound-box': CompoundBox,
    // 'curve-box': CurveBox,
    // sandbox: Sandbox,
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
    USDT() { return this.$store.getters['compound/USDT']; },
  },
};
</script>
<style lang="sass">
.padded-top { margin-bottom: 1rem; }
</style>
