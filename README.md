# ERC20 Token

> This code is a basic implementation of an ERC20 token. ERC20 is a standard interface for tokens on the Ethereum blockchain. It defines a set of rules that tokens must follow, such as how to transfer them, how to check balances, and so on.

## Explanation

```
    // SPDX-License-Identifier:MIT
    pragma solidity ^0.8.17;
```
- At the beginning we have comments which show information on the license we are using and publishing the code under and also the version of <b>Solidity language </b> we are currently using.

```
    contract Erc20Token{
```
- This line marks the beginning of the a new contract called `Erc20Token`.

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
mapping(mapping(address => uint)) private allowed;

```
* These lines declare two "mappings". In simple terms, mappings are like dictionaries in Javascript and many other languages. The enable us associate a value to another.

    - `balances`: Maps address to the amount of tokens they have.
    - `allowed `: Maps addresses to other addresses to other address and the amount of tokens a address is allowed to spend on behalf of another address.

```
event Transfer(address indexed _from, address indexed _to, uint _value);
event Approval(address indexed _owner, address indexed _spender, uint _value);
```
* These lines declare two events. Events are away to log information on the blockchain.
    - Transfer: This event is emitted when tokens are transferred from one address to another.
    - Approval: This event is emitted when one address approves another to spend tokens on its behalf.
