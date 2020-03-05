<template>
  <section>
    <b-button
      @click="setProvider"
    >
      MetaMask
    </b-button>
  </section>
</template>
<style>
</style>
<script>
export default {
  name: 'landing',
  data() {
    return {
    };
  },
  computed: {
    web3Provider() { return this.$store.getters['wallet/web3']; },
  },
  watch: {
    web3Provider(to) {
      if (to !== 'NOT_SET') this.$router.push({ name: 'Home' });
    },
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  methods: {
    setProvider() {
      this.$store.dispatch('wallet/setWeb3Provider', {});
    },
  },
};
</script>
