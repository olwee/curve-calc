// import { assert } from 'chai';
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
      console.log(basketValue);
    });
    it('should get the dollar value of prior investment', () => {
      const curveAbs = calc.investUnderlying({
        DAI: '1',
      });
      const basketAbs = calc.getBasketValue(curveAbs, true);
      console.log(`[ABS] 1 DAI: ${basketAbs}`);
      const basketValue = calc.getBasketValue('1.012631216611139894');
      console.log(basketValue);
    });
    it('should get an estimate for DAI Investment [100]', () => {
      const curveAbs = calc.investUnderlying({
        DAI: '100',
      });
      console.log(`curveABS: ${curveAbs}`);
      const basketAbs = calc.getBasketValue(curveAbs, true);
      console.log(`[ABS] 100 Token: ${basketAbs}`);
      console.log('We want $100 worth of DAI');
      const investNorm = calc.normDollar('DAI', '100');
      console.log(`How much DAI for 100 USD: ${investNorm}`);
      const basketIdeal = calc.getBasketValue('98.67406', false);
      console.log(`basketIdeal $100: ${basketIdeal}`);
      const curveNorm = calc.investUnderlying({
        DAI: investNorm,
      });
      console.log(`curveNorm / poolAmt : ${curveNorm}`);
      const basketNorm = calc.getBasketValue(curveNorm, true);
      const bonus = calc.getBonus(curveNorm);
      console.log(`[NORM] 100 Token: ${basketNorm} Bonus: ${bonus}`);
    });
    it('should get an estimate for USDC Investment [100]', () => {
      const curveAbs = calc.investUnderlying({
        USDC: '100',
      });
      const basketAbs = calc.getBasketValue(curveAbs, true);
      console.log(`[ABS] 100 Token: ${basketAbs}`);
      const investNorm = calc.normDollar('USDC', '100');
      const curveNorm = calc.investUnderlying({
        USDC: investNorm,
      });
      const basketNorm = calc.getBasketValue(curveNorm, true);
      const bonus = calc.getBonus(curveNorm);
      console.log(`[NORM] 100 Token: ${basketNorm} Bonus: ${bonus}`);
    });
    it('should get an estimate for USDT Investment [100]', () => {
      const curveAbs = calc.investUnderlying({
        USDT: '100',
      });
      const basketAbs = calc.getBasketValue(curveAbs, true);
      console.log(`[ABS] 100 Token: ${basketAbs}`);
      const investNorm = calc.normDollar('USDT', '100');
      const curveNorm = calc.investUnderlying({
        USDT: investNorm,
      });
      const basketNorm = calc.getBasketValue(curveNorm, true);
      const bonus = calc.getBonus(curveNorm);
      console.log(`[NORM] 100 Token: ${basketNorm} Bonus: ${bonus}`);
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
      // calc.setDollarRate('DAI', '1.0243'); // 1.0243 on Curve
      // calc.setDollarRate('DAI', '1.00');
      calc.setDollarRate('USDC', '1.00'); // 1.00 on Curve
      calc.setDollarRate('USDT', '1.009803922'); // 1.00265 on Curve
      // calc.setDollarRate('USDT', '1.00265'); // 1.00265 on Curve
      const curveAbs = calc.investUnderlying({
        DAI: '1',
      });
      console.log(`Curve Tokens: ${curveAbs}`);
      const basketAbs = calc.getBasketValue(curveAbs, true);
      console.log(`[ABS] 1 DAI: ${basketAbs}`);
      const basketAct = calc.getBasketValue('1.007706964', false);
      console.log(`[ACTUAL] 1 DAI: ${basketAct}`);
    });
  });
});
