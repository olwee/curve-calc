export default [
  {
    name: 'TokenExchange',
    inputs: [
      {
        type: 'address',
        name: 'buyer',
        indexed: true,
      },
      {
        type: 'int128',
        name: 'sold_id',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'tokens_sold',
        indexed: false,
      },
      {
        type: 'int128',
        name: 'bought_id',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'tokens_bought',
        indexed: false,
      },
    ],
    anonymous: false,
    type: 'event',
  },
  {
    name: 'TokenExchangeUnderlying',
    inputs: [
      {
        type: 'address',
        name: 'buyer',
        indexed: true,
      },
      {
        type: 'int128',
        name: 'sold_id',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'tokens_sold',
        indexed: false,
      },
      {
        type: 'int128',
        name: 'bought_id',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'tokens_bought',
        indexed: false,
      },
    ],
    anonymous: false,
    type: 'event',
  },
  {
    name: 'AddLiquidity',
    inputs: [
      {
        type: 'address',
        name: 'provider',
        indexed: true,
      },
      {
        type: 'uint256[2]',
        name: 'token_amounts',
        indexed: false,
      },
      {
        type: 'uint256[2]',
        name: 'fees',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'invariant',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'token_supply',
        indexed: false,
      },
    ],
    anonymous: false,
    type: 'event',
  },
  {
    name: 'RemoveLiquidity',
    inputs: [
      {
        type: 'address',
        name: 'provider',
        indexed: true,
      },
      {
        type: 'uint256[2]',
        name: 'token_amounts',
        indexed: false,
      },
      {
        type: 'uint256[2]',
        name: 'fees',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'token_supply',
        indexed: false,
      },
    ],
    anonymous: false,
    type: 'event',
  },
  {
    name: 'RemoveLiquidityImbalance',
    inputs: [
      {
        type: 'address',
        name: 'provider',
        indexed: true,
      },
      {
        type: 'uint256[2]',
        name: 'token_amounts',
        indexed: false,
      },
      {
        type: 'uint256[2]',
        name: 'fees',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'invariant',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'token_supply',
        indexed: false,
      },
    ],
    anonymous: false,
    type: 'event',
  },
  {
    name: 'CommitNewAdmin',
    inputs: [
      {
        type: 'uint256',
        name: 'deadline',
        indexed: true,
        unit: 'sec',
      },
      {
        type: 'address',
        name: 'admin',
        indexed: true,
      },
    ],
    anonymous: false,
    type: 'event',
  },
  {
    name: 'NewAdmin',
    inputs: [
      {
        type: 'address',
        name: 'admin',
        indexed: true,
      },
    ],
    anonymous: false,
    type: 'event',
  },
  {
    name: 'CommitNewParameters',
    inputs: [
      {
        type: 'uint256',
        name: 'deadline',
        indexed: true,
        unit: 'sec',
      },
      {
        type: 'uint256',
        name: 'A',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'fee',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'admin_fee',
        indexed: false,
      },
    ],
    anonymous: false,
    type: 'event',
  },
  {
    name: 'NewParameters',
    inputs: [
      {
        type: 'uint256',
        name: 'A',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'fee',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'admin_fee',
        indexed: false,
      },
    ],
    anonymous: false,
    type: 'event',
  },
  {
    outputs: [],
    inputs: [
      {
        type: 'address[2]',
        name: '_coins',
      },
      {
        type: 'address[2]',
        name: '_underlying_coins',
      },
      {
        type: 'address',
        name: '_pool_token',
      },
      {
        type: 'uint256',
        name: '_A',
      },
      {
        type: 'uint256',
        name: '_fee',
      },
    ],
    constant: false,
    payable: false,
    type: 'constructor',
  },
  {
    name: 'get_virtual_price',
    outputs: [
      {
        type: 'uint256',
        name: 'out',
      },
    ],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function',
    gas: 1084167,
  },
  {
    name: 'calc_token_amount',
    outputs: [
      {
        type: 'uint256',
        name: 'out',
      },
    ],
    inputs: [
      {
        type: 'uint256[2]',
        name: 'amounts',
      },
      {
        type: 'bool',
        name: 'deposit',
      },
    ],
    constant: true,
    payable: false,
    type: 'function',
    gas: 4239939,
  },
  {
    name: 'add_liquidity',
    outputs: [],
    inputs: [
      {
        type: 'uint256[2]',
        name: 'amounts',
      },
      {
        type: 'uint256',
        name: 'min_mint_amount',
      },
    ],
    constant: false,
    payable: false,
    type: 'function',
    gas: 6479997,
  },
  {
    name: 'get_dy',
    outputs: [
      {
        type: 'uint256',
        name: 'out',
      },
    ],
    inputs: [
      {
        type: 'int128',
        name: 'i',
      },
      {
        type: 'int128',
        name: 'j',
      },
      {
        type: 'uint256',
        name: 'dx',
      },
    ],
    constant: true,
    payable: false,
    type: 'function',
    gas: 2543681,
  },
  {
    name: 'get_dx',
    outputs: [
      {
        type: 'uint256',
        name: 'out',
      },
    ],
    inputs: [
      {
        type: 'int128',
        name: 'i',
      },
      {
        type: 'int128',
        name: 'j',
      },
      {
        type: 'uint256',
        name: 'dy',
      },
    ],
    constant: true,
    payable: false,
    type: 'function',
    gas: 2543687,
  },
  {
    name: 'get_dy_underlying',
    outputs: [
      {
        type: 'uint256',
        name: 'out',
      },
    ],
    inputs: [
      {
        type: 'int128',
        name: 'i',
      },
      {
        type: 'int128',
        name: 'j',
      },
      {
        type: 'uint256',
        name: 'dx',
      },
    ],
    constant: true,
    payable: false,
    type: 'function',
    gas: 2543506,
  },
  {
    name: 'get_dx_underlying',
    outputs: [
      {
        type: 'uint256',
        name: 'out',
      },
    ],
    inputs: [
      {
        type: 'int128',
        name: 'i',
      },
      {
        type: 'int128',
        name: 'j',
      },
      {
        type: 'uint256',
        name: 'dy',
      },
    ],
    constant: true,
    payable: false,
    type: 'function',
    gas: 2543512,
  },
  {
    name: 'exchange',
    outputs: [],
    inputs: [
      {
        type: 'int128',
        name: 'i',
      },
      {
        type: 'int128',
        name: 'j',
      },
      {
        type: 'uint256',
        name: 'dx',
      },
      {
        type: 'uint256',
        name: 'min_dy',
      },
    ],
    constant: false,
    payable: false,
    type: 'function',
    gas: 5184573,
  },
  {
    name: 'exchange_underlying',
    outputs: [],
    inputs: [
      {
        type: 'int128',
        name: 'i',
      },
      {
        type: 'int128',
        name: 'j',
      },
      {
        type: 'uint256',
        name: 'dx',
      },
      {
        type: 'uint256',
        name: 'min_dy',
      },
    ],
    constant: false,
    payable: false,
    type: 'function',
    gas: 5200817,
  },
  {
    name: 'remove_liquidity',
    outputs: [],
    inputs: [
      {
        type: 'uint256',
        name: '_amount',
      },
      {
        type: 'uint256[2]',
        name: 'min_amounts',
      },
    ],
    constant: false,
    payable: false,
    type: 'function',
    gas: 153898,
  },
  {
    name: 'remove_liquidity_imbalance',
    outputs: [],
    inputs: [
      {
        type: 'uint256[2]',
        name: 'amounts',
      },
      {
        type: 'uint256',
        name: 'max_burn_amount',
      },
    ],
    constant: false,
    payable: false,
    type: 'function',
    gas: 6479708,
  },
  {
    name: 'commit_new_parameters',
    outputs: [],
    inputs: [
      {
        type: 'uint256',
        name: 'amplification',
      },
      {
        type: 'uint256',
        name: 'new_fee',
      },
      {
        type: 'uint256',
        name: 'new_admin_fee',
      },
    ],
    constant: false,
    payable: false,
    type: 'function',
    gas: 146105,
  },
  {
    name: 'apply_new_parameters',
    outputs: [],
    inputs: [],
    constant: false,
    payable: false,
    type: 'function',
    gas: 133512,
  },
  {
    name: 'revert_new_parameters',
    outputs: [],
    inputs: [],
    constant: false,
    payable: false,
    type: 'function',
    gas: 21835,
  },
  {
    name: 'commit_transfer_ownership',
    outputs: [],
    inputs: [
      {
        type: 'address',
        name: '_owner',
      },
    ],
    constant: false,
    payable: false,
    type: 'function',
    gas: 74512,
  },
  {
    name: 'apply_transfer_ownership',
    outputs: [],
    inputs: [],
    constant: false,
    payable: false,
    type: 'function',
    gas: 60568,
  },
  {
    name: 'revert_transfer_ownership',
    outputs: [],
    inputs: [],
    constant: false,
    payable: false,
    type: 'function',
    gas: 21925,
  },
  {
    name: 'withdraw_admin_fees',
    outputs: [],
    inputs: [],
    constant: false,
    payable: false,
    type: 'function',
    gas: 12831,
  },
  {
    name: 'kill_me',
    outputs: [],
    inputs: [],
    constant: false,
    payable: false,
    type: 'function',
    gas: 37878,
  },
  {
    name: 'unkill_me',
    outputs: [],
    inputs: [],
    constant: false,
    payable: false,
    type: 'function',
    gas: 22015,
  },
  {
    name: 'coins',
    outputs: [
      {
        type: 'address',
        name: 'out',
      },
    ],
    inputs: [
      {
        type: 'int128',
        name: 'arg0',
      },
    ],
    constant: true,
    payable: false,
    type: 'function',
    gas: 2190,
  },
  {
    name: 'underlying_coins',
    outputs: [
      {
        type: 'address',
        name: 'out',
      },
    ],
    inputs: [
      {
        type: 'int128',
        name: 'arg0',
      },
    ],
    constant: true,
    payable: false,
    type: 'function',
    gas: 2220,
  },
  {
    name: 'balances',
    outputs: [
      {
        type: 'uint256',
        name: 'out',
      },
    ],
    inputs: [
      {
        type: 'int128',
        name: 'arg0',
      },
    ],
    constant: true,
    payable: false,
    type: 'function',
    gas: 2250,
  },
  {
    name: 'A',
    outputs: [
      {
        type: 'uint256',
        name: 'out',
      },
    ],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function',
    gas: 2081,
  },
  {
    name: 'fee',
    outputs: [
      {
        type: 'uint256',
        name: 'out',
      },
    ],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function',
    gas: 2111,
  },
  {
    name: 'admin_fee',
    outputs: [
      {
        type: 'uint256',
        name: 'out',
      },
    ],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function',
    gas: 2141,
  },
  {
    name: 'owner',
    outputs: [
      {
        type: 'address',
        name: 'out',
      },
    ],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function',
    gas: 2171,
  },
  {
    name: 'admin_actions_deadline',
    outputs: [
      {
        type: 'uint256',
        unit: 'sec',
        name: 'out',
      },
    ],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function',
    gas: 2201,
  },
  {
    name: 'transfer_ownership_deadline',
    outputs: [
      {
        type: 'uint256',
        unit: 'sec',
        name: 'out',
      },
    ],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function',
    gas: 2231,
  },
  {
    name: 'future_A',
    outputs: [
      {
        type: 'uint256',
        name: 'out',
      },
    ],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function',
    gas: 2261,
  },
  {
    name: 'future_fee',
    outputs: [
      {
        type: 'uint256',
        name: 'out',
      },
    ],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function',
    gas: 2291,
  },
  {
    name: 'future_admin_fee',
    outputs: [
      {
        type: 'uint256',
        name: 'out',
      },
    ],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function',
    gas: 2321,
  },
  {
    name: 'future_owner',
    outputs: [
      {
        type: 'address',
        name: 'out',
      },
    ],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function',
    gas: 2351,
  },
];
