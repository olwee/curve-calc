// import { assert } from 'chai';
// import BN from 'bignumber.js';
import Calculator from '@/lib/calculator';

describe('lib/calculator', () => {
  describe('# Curve USDT', () => {
    let calc = {};
    it('should deploy the calculator', () => {
      calc = Calculator.fromUSDT();
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
    });
    it('should get the dollar value of a Curve Portfolio [100]', () => {
      calc.setDollarRate('DAI', '1.03');
      // calc.setDollarRate('DAI', '1.00');
      calc.setDollarRate('USDC', '1.00');
      calc.setDollarRate('USDT', '1.009803922');
      // calc.setDollarRate('USDT', '1.00');
      const basketValue = calc.getBasketValue('100');
      console.log(basketValue);
    });
    it('should get an estimate for DAI Investment [100]', () => {
      const curveAbs = calc.investUnderlying({
        DAI: '100',
      });
      const basketAbs = calc.getBasketValue(curveAbs, true);
      console.log(`[ABS] 100 Token: ${basketAbs}`);
      const investNorm = calc.normDollar('DAI', '100');
      const curveNorm = calc.investUnderlying({
        DAI: investNorm,
      });
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
});
