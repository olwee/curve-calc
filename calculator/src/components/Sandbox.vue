<template>
  <div class="box-sandbox has-text-left">
    <h3 class="title is-4">
      Trade Ticket
    </h3>
    <section>
      <b-field
        label="Nominal Amount"
      >
        <b-input v-model="newNominalAmt" />
      </b-field> <!-- End Of NominalAmt Field -->
      <b-field
        label="DAI-DOLLAR"
      >
        <b-input v-model="newDollarDAI" />
      </b-field> <!-- End Of DollarDAI Field -->
      <b-field
        label="USDC-DOLLAR"
      >
        <b-input v-model="newDollarUSDC" />
      </b-field> <!-- End Of DollarDAI Field -->
      <b-field
        label="USDT-DOLLAR"
      >
        <b-input v-model="newDollarUSDT" />
      </b-field> <!-- End Of DollarDAI Field -->
      <b-button @click="updatePortfolio">Update</b-button>
    </section>  <!-- End of Trade Ticket -->
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
      newNominalAmt: '1000.00',
      newDollarDAI: '1.000',
      newDollarUSDC: '1.000',
      newDollarUSDT: '1.000',
    };
  },
  components: {
  },
  filters: {
    roundOff: (x, y) => BN(x).toFormat(y),
    fromNative: (x, y) => BN(x).div(BN(`1e${y}`)).toFixed(),
  },
  computed: {
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  methods: {
    loaded() {
    },
    updatePortfolio() {
      this.$store.dispatch('sandbox/updateParams', {
        dollarAmt: this.newNominalAmt,
        dollarDAI: this.newDollarDAI,
        dollarUSDC: this.newDollarUSDC,
        dollarUSDT: this.newDollarUSDT,
      });
    },
  },
};
</script>
