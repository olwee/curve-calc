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
    it('should get an estimate for 1 DAI Investment', () => {
      const curveToken = calc.investUnderlying({
        DAI: '1',
      });
      console.log(curveToken);
    });
    it('should get an estimate for 1 USDC Investment', () => {
      const curveToken = calc.investUnderlying({
        USDC: '1',
      });
      console.log(curveToken);
    });
    it('should get an estimate for 1 USDT Investment', () => {
      const curveToken = calc.investUnderlying({
        USDT: '1',
      });
      console.log(curveToken);
    });
  });
});
