import { assert } from 'chai';
import BN from 'bignumber.js';
import Sandbox from '@/lib/sandbox';

// Helpers for Converting Tokens

const cOffset = BN('1e8');
const x18 = BN('1e18');

const toC = (x) => BN(x).times(cOffset).toFixed();
const fromC = (x) => BN(x).div(cOffset).toFixed();

// Token Amount Constants
const c100 = toC('100');
const c1000 = toC('1000');
const c10000 = toC('10000');
const c100000 = toC('100000');
const c1000000 = toC('1000000');
const c10000000 = toC('10000000');

describe('lib/sandbox', () => {
  let sandbox = {};
  it('should deploy a sandbox with initial params', () => {
    const A = '900';
    const coins = ['cDAI', 'cUSDC'];
    const cstPrecision = '1e18';
    const cstPrecisionLending = '1e18';
    const cstPrecisionMul = ['1', '1000000000000'];
    const cstFee = '4e6';
    const cstFeeDenom = '1e10';
    //
    sandbox = Sandbox({
      A,
      coins,
      cstPrecision,
      cstPrecisionLending,
      cstPrecisionMul,
      cstFee,
      cstFeeDenom,
    });
  });
  describe('# getVirtPx', () => {
    it('should get correct virtPx #9602375', () => {
      sandbox.setBlkNum('9602375');
      sandbox.setBalances([
        '489210517429217', // cDAI
        '2292338673317635', // cUSDC
      ]);
      sandbox.setToken('cDAI', {
        exchRateCurrent: '203007055292566490986051413',
        exchRateStored: '203007032800401776808751012',
        accrBlkNum: '9602372',
        supplyRatePerBlk: '36931667025',
      });
      sandbox.setToken('cUSDC', {
        exchRateCurrent: '209861845747373',
        exchRateStored: '209861845747373',
        accrBlkNum: '9602375',
        supplyRatePerBlk: '18817543291',
      });

      sandbox.setPoolSupply('579101905899211383355732');
      // Get VirtPx
      const expectedVirtPx = '1001796565572790359';
      const virtPx = sandbox.getVirtPx();
      assert.equal(expectedVirtPx, virtPx);
    });
    it('should get correct virtPx #9602585', () => {
      sandbox.setBlkNum('9602585');
      sandbox.setBalances([
        '495497533048759', // cDAI
        '2307690989163803', // cUSDC
      ]);
      sandbox.setToken('cDAI', {
        exchRateCurrent: '203008574204524127509329419',
        exchRateStored: '203008543594752569407117098',
        accrBlkNum: '9602581',
        supplyRatePerBlk: '36930707119',
      });
      sandbox.setToken('cUSDC', {
        exchRateCurrent: '209862673019203',
        exchRateStored: '209862590483577',
        accrBlkNum: '9602564',
        supplyRatePerBlk: '18727815702',
      });

      sandbox.setPoolSupply('583592189997880657606898');
      // Get VirtPx
      const expectedVirtPx = '1001801471644932091';
      const virtPx = sandbox.getVirtPx();
      assert.equal(expectedVirtPx, virtPx);
    });
  }); // End of Describe getVirtPx
  describe('# calcTokenAmt', () => {
    it('estimate amount of tokens burnt for asymmetric withdrawal [100, 0]', () => {
      // Environment
      sandbox.setBlkNum('9602951');
      sandbox.setBalances([
        '509635103401704', // cDAI
        '2342213640051001', // cUSDC
      ]);
      sandbox.setToken('cDAI', {
        exchRateCurrent: '203011234262793016219584937',
        exchRateStored: '203011208253884413125892599',
        accrBlkNum: '9602947',
        supplyRatePerBlk: '36930344019',
      });
      sandbox.setToken('cUSDC', {
        exchRateCurrent: '209864102524056',
        exchRateStored: '209864013048078',
        accrBlkNum: '9602928',
        supplyRatePerBlk: '18537050564',
      });

      sandbox.setPoolSupply('593689377770139148420042');

      const exptToken100 = '2032935942832783955';
      const burntToken100 = sandbox.calcTokenAmt([c100, '0'], false);

      assert.equal(exptToken100, burntToken100);
    });
    it('should estimate amount of tokens burnt for asymmetric withdrawal [1000, 0]', () => {
      // Environment
      sandbox.setBlkNum('9602951');
      sandbox.setBalances([
        '509635103401704', // cDAI
        '2342213640051001', // cUSDC
      ]);
      sandbox.setToken('cDAI', {
        exchRateCurrent: '203011234262793016219584937',
        exchRateStored: '203011208253884413125892599',
        accrBlkNum: '9602947',
        supplyRatePerBlk: '36930344019',
      });
      sandbox.setToken('cUSDC', {
        exchRateCurrent: '209864102524056',
        exchRateStored: '209864013048078',
        accrBlkNum: '9602928',
        supplyRatePerBlk: '18537050564',
      });

      sandbox.setPoolSupply('593689377770139148420042');

      const exptToken1000 = '20329370689657179153';
      const burntToken1000 = sandbox.calcTokenAmt([c1000, '0'], false);
      assert.equal(exptToken1000, burntToken1000);
    });
  }); // End of calcTokenAmt
  describe('# addLiquidity', () => {
    it('should estimate amount of tokens minted for asymmetric deposits [100, 0]', () => {
      // Environment
      sandbox.setBlkNum('9602951');
      sandbox.setBalances([
        '509635103401704', // cDAI
        '2342213640051001', // cUSDC
      ]);
      sandbox.setToken('cDAI', {
        exchRateCurrent: '203011234262793016219584937',
        exchRateStored: '203011208253884413125892599',
        accrBlkNum: '9602947',
        supplyRatePerBlk: '36930344019',
      });
      sandbox.setToken('cUSDC', {
        exchRateCurrent: '209864102524056',
        exchRateStored: '209864013048078',
        accrBlkNum: '9602928',
        supplyRatePerBlk: '18537050564',
      });

      sandbox.setPoolSupply('593689377770139148420042');

      const mintRaw = sandbox.addLiquidity([c100, '0']);
      const mintToken100 = BN(mintRaw).div(x18).toFixed();
      const exptToken100 = '2.032264394127875969';
      // Actual Expected
      assert.equal(mintToken100, exptToken100);
    });
  }); // End of Add Liquidity
  describe('# removeLiquidity', () => {
    it('should calculate amount of ctokens received for symmetric withdrawals', () => {
      // Environment
      sandbox.setBlkNum('9602951');
      sandbox.setBalances([
        '509635103401704', // cDAI
        '2342213640051001', // cUSDC
      ]);
      sandbox.setToken('cDAI', {
        exchRateCurrent: '203011234262793016219584937',
        exchRateStored: '203011208253884413125892599',
        accrBlkNum: '9602947',
        supplyRatePerBlk: '36930344019',
      });
      sandbox.setToken('cUSDC', {
        exchRateCurrent: '209864102524056',
        exchRateStored: '209864013048078',
        accrBlkNum: '9602928',
        supplyRatePerBlk: '18537050564',
      });

      sandbox.setPoolSupply('593689377770139148420042');

      const exptToken100 = BN('2.032264394127875969').times(x18).toFixed();
      const tokensRaw = sandbox.removeLiquidity(exptToken100);
      const tokens = tokensRaw.map(fromC);
      const exptTokens = ['17.44537318', '80.17656307'];
      assert.deepEqual(tokens, exptTokens);
    });
  }); // End of removeLiquidity
  describe('# removeLiquidityImbalance', () => {
    it('should calculate amount of ctokens burnt for asymmetric withdrawals', () => {
      // Environment
      sandbox.setBlkNum('9602951');
      sandbox.setBalances([
        '509635103401704', // cDAI
        '2342213640051001', // cUSDC
      ]);
      sandbox.setToken('cDAI', {
        exchRateCurrent: '203011234262793016219584937',
        exchRateStored: '203011208253884413125892599',
        accrBlkNum: '9602947',
        supplyRatePerBlk: '36930344019',
      });
      sandbox.setToken('cUSDC', {
        exchRateCurrent: '209864102524056',
        exchRateStored: '209864013048078',
        accrBlkNum: '9602928',
        supplyRatePerBlk: '18537050564',
      });

      sandbox.setPoolSupply('593689377770139148420042');
      // Amount of tokens from ideal calcTokenAmount, no fees
      // const exptToken100 = '2032935942832783955';
      // const idealToken100 = BN('2.033607176310299413').toFixed();
      const idealToken100 = BN('2.032935942832783955').toFixed();
      const burntTokenRaw = sandbox.removeLiquidityImbalance([c100, '0']);
      const burntToken = BN(burntTokenRaw).div(x18).toFixed();

      const diff = BN(idealToken100).div(burntToken).times(BN('100'));
      // Maximum deviation is 0.04% from ideal, symmetric withdrawal
      const withinBound = diff.gte(BN('99.96'));
      // Actual, Expected
      assert.equal(withinBound, true);
    });
    it('should compare symmetric and asymmetric withdrawals', () => {
      // Environment
      sandbox.setBlkNum('9602951');
      sandbox.setBalances([
        '509635103401704', // cDAI
        '2342213640051001', // cUSDC
      ]);
      sandbox.setToken('cDAI', {
        exchRateCurrent: '203011234262793016219584937',
        exchRateStored: '203011208253884413125892599',
        accrBlkNum: '9602947',
        supplyRatePerBlk: '36930344019',
      });
      sandbox.setToken('cUSDC', {
        exchRateCurrent: '209864102524056',
        exchRateStored: '209864013048078',
        accrBlkNum: '9602928',
        supplyRatePerBlk: '18537050564',
      });

      sandbox.setPoolSupply('593689377770139148420042');
      // Amount of tokens from ideal calcTokenAmount, no fees
      const idealToken100 = BN('2.032264394127875969');
      const cDAIPref = toC('17.44537318');
      const cUSDCPref = toC('80.17656307');

      const burntTokenRaw = sandbox.removeLiquidityImbalance([cDAIPref, cUSDCPref]);
      const burntToken = BN(burntTokenRaw).div(x18).toFixed();
      const diff = BN(idealToken100).div(burntToken).times(BN('100'));
      // Maximum deviation is 0.04% from ideal, symmetric withdrawal
      const withinBound = diff.gte(BN('99.99999'));
      // Actual, Expected
      assert.equal(withinBound, true);
    });
    it('should calculate asymmetric withdrawal slippage', () => {
      // Environment
      sandbox.setBlkNum('9602951');
      sandbox.setBalances([
        '509635103401704', // cDAI
        '2342213640051001', // cUSDC
      ]);
      sandbox.setToken('cDAI', {
        exchRateCurrent: '203011234262793016219584937',
        exchRateStored: '203011208253884413125892599',
        accrBlkNum: '9602947',
        supplyRatePerBlk: '36930344019',
      });
      sandbox.setToken('cUSDC', {
        exchRateCurrent: '209864102524056',
        exchRateStored: '209864013048078',
        accrBlkNum: '9602928',
        supplyRatePerBlk: '18537050564',
      });

      sandbox.setPoolSupply('593689377770139148420042');
      // Amount of tokens from ideal calcTokenAmount, no fees
      // const exptToken100 = '2032935942832783955';
      const checker = (x, p) => {
        const n = BN(x).div(x18).toFixed();
        console.log(`burnt(1e${p}): ${n}`);
      };

      checker(sandbox.removeLiquidityImbalance([c100, '0']), 0);
      checker(sandbox.removeLiquidityImbalance([c1000, '0']), 1);
      checker(sandbox.removeLiquidityImbalance([c10000, '0']), 2);
      checker(sandbox.removeLiquidityImbalance([c100000, '0']), 3);
      checker(sandbox.removeLiquidityImbalance([c1000000, '0']), 4);
      checker(sandbox.removeLiquidityImbalance([c10000000, '0']), 5);
    });
  });
});
