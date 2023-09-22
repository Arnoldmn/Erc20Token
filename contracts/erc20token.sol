// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

contract Erc20Token{

    string public name;
    string public symbol;
    uint8 public decimals;
    uint private _totalSupply;

   mapping(address => uint) private balances;
   mapping(address => mapping(address => uint)) private allowed;

   event Transfer(address indexed _from, address _to, uint _value);
   event Approval(address indexed _owner, address _spender, uint _value);

   constructor (
    string memory _name,
    string memory _symbol,
    uint8 _decimals,
    uint _initialSupply
   ){
    name = _name;
    symbol = _symbol;
    decimals = _decimals;
    _totalSupply = _initialSupply * 10 ** uint256(_decimals);
    balances[msg.sender] = _totalSupply;

   }

   function totalSupply() public view returns (uint) {
    return _totalSupply;
   }

   function balanceOf(address _owner) public view returns (uint) {
    return balances[_owner];
   }

   function transfer(address _to, uint _value) public returns (bool){
        require(_to != address(0), "Address is invalid!");
        require(_value <= balances[msg.sender], "Insufficient balace");

        balances[msg.sender] -= _value;
        balances[_to] += _value;

        emit Transfer( msg.sender, _to, _value);
        return true;
   }

   function transferFrom(address _from, address _to, uint _value) public returns (bool){
    require(_from != address(0), "Address not valid");
    require(_to != address(0), "Address Inalid");
    require(_value <= balances[_from], "Balance not sufficient");
    require(_value <= allowed[_from][msg.sender], "Allowance exceeded");

    balances[_from] -= _value;
    balances[_to] += _value;
    allowed[_from][msg.sender] -= _value;

    emit Transfer(_from, _to, _value);

    return true;

   }

   function approve(address _spender, uint _value) public returns (bool) {
        allowed[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);

        return true;
   }

   function allowance(address _owner, address _spender) public view returns(uint) {
    return allowed[_owner][_spender];
   }

}