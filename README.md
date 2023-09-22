# ERC20 Token

> This code is a basic implementation of an ERC20 token. ERC20 is a standard interface for tokens on the Ethereum blockchain. It defines a set of rules that tokens must follow, such as how to transfer them, how to check balances, and so on.

## Explanation

```
    // SPDX-License-Identifier:MIT
    pragma solidity ^0.8.17;
```
* At the beginning we have comments which show information on the license we are using and publishing the code under and also the version of <b>Solidity language </b> we are currently using.

```
    contract Erc20Token{
```
* This line marks the beginning of the a new contract called `Erc20Token`.

```
    string public name;
    string public symbol;
    uint8 public decimals
    uint private totalSupply;
```

* The lines declare some properties of the token:
- name: The name of the token (e.g., "MyToken").
- symbol: A short code representing the token (e.g., "MA").
- decimals: How many decimal places the token takes
- _totalSupply: The total number of tokens.

```
mapping(address => uint) private balances;
mapping(mapping(address => uint)) private allowed

```