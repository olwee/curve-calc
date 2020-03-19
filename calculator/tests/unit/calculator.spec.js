import { assert } from 'chai';
// import BN from 'bignumber.js';
import Calculator from '@/lib/calculator';

describe('lib/calculator', () => {
  describe('# Curve USDT', () => {
    let calc = {};
    it('should deploy the calculator', () => {
      calc = Calculator.fromUSDT();
      /*
      calc.setBlkNum('9687706');
      calc.setBalances([
        '16594648995000', // cDAI
        '274995384569632', // cUSDC
        '46833053825', // USDT
      ]);
      calc.setToken('cDAI', {
        exchRateCurrent: '203818388133583889370401002',
        exchRateStored: '203818366823233430210082203',
        accrBlkNum: '9687704',
        supplyRatePerBlk: '52277797117',
      });
      calc.setToken('cUSDC', {
        exchRateCurrent: '210075136135729',
        exchRateStored: '210075135294569',
        accrBlkNum: '9687704',
        supplyRatePerBlk: '2002055668',
      });
      calc.sandbox.setPoolSupply('106414428596068108721473');
      */
      calc.setBlkNum('9694529');
      calc.setBalances([
        '19437468120621', // cDAI
        '369722540791198', // cUSDC
        '26375769800', // USDT
      ]);
      calc.setToken('cDAI', {
        exchRateCurrent: '203874427145564973743220876',
        exchRateStored: '203874390115508032934463034',
        accrBlkNum: '9694524',
        supplyRatePerBlk: '36326344784',
      });
      calc.setToken('cUSDC', {
        exchRateCurrent: '210077603146208',
        exchRateStored: '210077601517781',
        accrBlkNum: '9694524',
        supplyRatePerBlk: '1550311337',
      });
      calc.sandbox.setPoolSupply('106415311225489458823714');
    });
    it('should get the dollar value of a Curve Portfolio [100]', () => {
      calc.setDollarRate('USDC', '1.00'); // 1.00 on Curve
      // calc.setDollarRate('DAI', '1.03'); // 1.0243 on Curve
      // calc.setDollarRate('USDT', '1.009803922'); // 1.00265 on Curve

      calc.setDollarRate('DAI', '1.0243'); // 1.0243 on Curve
      calc.setDollarRate('USDT', '1.00265'); // 1.00265 on Curve
      // calc.setDollarRate('DAI', '1.00');
      // calc.setDollarRate('USDT', '1.00');
      const basketValue = calc.getBasketValue('100');
      assert.equal(basketValue, '101.34376');
    });
    it('should get the dollar value of prior investment', () => {
      const basketValue = calc.getBasketValue('1.012631216611139894');
      assert.equal(basketValue, '1.02624');
    });
    it('should get an estimate for DAI Investment [100]', () => {
      const { dollars: basketAbs } = calc.investUnderlying({
        DAI: { value: '100', norm: false },
      });
      const { dollars: basketNorm, bonus } = calc.investUnderlying({
        DAI: { value: '100', norm: true },
      });
      assert.equal(basketAbs, '102.07064');
      assert.equal(basketNorm, '99.65040');
      assert.equal(bonus, '-0.00350');
    });
    it('should get an estimate for USDC Investment [100]', () => {
      const { dollars: basketAbs } = calc.investUnderlying({
        USDC: { value: '100', norm: false },
      });
      const { dollars: basketNorm, bonus } = calc.investUnderlying({
        USDC: { value: '100', norm: true },
      });
      assert.equal(basketAbs, '99.68674');
      assert.equal(basketNorm, '99.68674');
      assert.equal(bonus, '-0.00313');
    });
    it('should get an estimate for USDT Investment [100]', () => {
      const { dollars: basketAbs } = calc.investUnderlying({
        USDT: { value: '100', norm: false },
      });
      const { dollars: basketNorm, bonus } = calc.investUnderlying({
        USDT: { value: '100', norm: true },
      });
      assert.equal(basketAbs, '99.92932');
      assert.equal(basketNorm, '99.66521');
      assert.equal(bonus, '-0.00335');
    });
  });
  describe('# Curve USDT Real Invest Tx', () => {
    let calc = {};
    it('should deploy the calculator', () => {
      calc = Calculator.fromUSDT();
      calc.setBlkNum('9694643');
      calc.setBalances([
        '19442373080372', // cDAI
        '369722540791198', // cUSDC
        '26375769800', // USDT
      ]);
      calc.setToken('cDAI', {
        exchRateCurrent: '203875271302186564360901395',
        exchRateStored: '203875271302186564360901395',
        accrBlkNum: '9694643',
        supplyRatePerBlk: '36365319271',
      });
      calc.setToken('cUSDC', {
        exchRateCurrent: '210077640271896',
        exchRateStored: '210077640271896',
        accrBlkNum: '9694643',
        supplyRatePerBlk: '1550240029',
      });
      calc.sandbox.setPoolSupply('106416318932453277735904');
    });
    it('should get the dollar value of prior investment', () => {
      calc.setDollarRate('DAI', '1.03'); // 1.0243 on Curve
      calc.setDollarRate('USDC', '1.00'); // 1.00 on Curve
      calc.setDollarRate('USDT', '1.009803922'); // 1.00265 on Curve

      const { dollars: basketAbs } = calc.investUnderlying({
        DAI: { value: '1', norm: false },
      });
      assert.equal(basketAbs, '1.01927');
      const basketAct = calc.getBasketValue('1.007706964', false);
      console.log(`[ACTUAL] 1 DAI: ${basketAct}`);
    });
  });
});
