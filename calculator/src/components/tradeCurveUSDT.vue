<template>
  <div class="has-text-left">
    <h3 class="title is-4">
      Curve USDT Products
    </h3>
    <h3 class="subtitle is-6">
      <b-table :data="quotes" :columns="tradeTable.columns" />
    </h3>
  </div>
</template>

<script>
// @ is an alias to /src
import { Convertor } from '@/lib/utils';
import BN from 'bignumber.js';

// const clone = (x) => JSON.parse(JSON.stringify(x));


const poolConvertor = Convertor(18);

const underConvertor = {
  DAI: Convertor(18),
  USDC: Convertor(6),
  USDT: Convertor(6),
};

// const nominalAmt = '1000';

export default {
  name: 'TradeCurveUSDT',
  data() {
    return {
      tradeTable: {
        columns: [{
          field: 'symbol',
          label: 'Symbol',
        }, {
          field: 'pool',
          label: 'POOL',
          numeric: true,
        }, {
          field: 'pxBid',
          label: 'Bid',
          numeric: true,
        }, {
          field: 'pxAsk',
          label: 'Ask',
          numeric: true,
        }, {
          field: 'pxSpread',
          label: 'Spread',
          numeric: true,
        }],
      },
    };
  },
  components: {
  },
  filters: {
    roundOff: (x, y) => BN(x).toFormat(y),
    fromNative: (x, y) => BN(x).div(BN(`1e${y}`)).toFixed(),
  },
  computed: {
    calculator() { return this.$store.getters['curveUSDT/calculator']; },
    quotes() {
      const nominalAmt = this.dollarAmt;
      if (this.calculator === 'NOT_SET') return [];
      const pairs = ['DAI', 'USDC', 'USDT'];
      const underQuotes = pairs.map((underName) => {
        //
        // const symbol = `${underName}-POOL`;
        const symbol = `${underName}-POOL`;
        const {
          /* eslint-disable-next-line no-unused-vars */
          pool,
        } = this.calculator.investUnderlying({
          [underName]: { value: nominalAmt, norm: true },
        });
        const poolToken = BN(poolConvertor.fromNative(pool));
        /* eslint-disable-next-line no-unused-vars */
        const { underlying } = this.calculator.redeemUnderlying(
          underName,
          pool,
        );
        const underAmt = BN(underConvertor[underName].fromNative(underlying));
        // Calculate DAI - POOL
        const pxAsk = BN(nominalAmt).div(poolToken);
        const pxBid = BN(underAmt).div(poolToken);
        /*
        const pxAsk = tokenAsk.div(poolToken);
        const pxBid = tokenBid.div(poolToken);

        const pxSpread = (pxAsk.minus(pxBid)).div(pxAsk);
        */

        const pxSpread = (pxAsk.minus(pxBid)).div(pxAsk);

        return {
          symbol,
          pool: poolToken.toFixed(3),
          pxAsk: pxAsk.toFixed(6),
          pxBid: pxBid.toFixed(6),
          pxSpread: pxSpread.toFixed(6),
        };
      });
      // Calculate DOLLAR-POOL
      const poolNorm = this.calculator.normBasket(nominalAmt);
      const poolDollars = this.calculator.getBasketValue(poolNorm);
      const poolBid = BN(nominalAmt).div(BN(poolDollars));

      underQuotes.push({
        symbol: 'DOLLAR-POOL',
        pool: poolNorm,
        pxAsk: poolBid.toFixed(6),
        pxBid: poolBid.toFixed(6),
        pxSpread: '0',
      });
      return underQuotes;
    },
    D() {
      if (this.calculator === 'NOT_SET') return -1;
      return this.calculator.sandbox.getVirtD();
    },
    dollarAmt() { return this.$store.getters['sandbox/dollarAmt']; },
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
