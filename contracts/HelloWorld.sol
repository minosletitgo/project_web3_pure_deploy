// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract HelloWorld is Ownable {
    uint256 public _value;

    constructor() Ownable(msg.sender) {

    }

    function testToMin() external {
        _value = type(uint256).min;
    }

    function testToMax() external {
        _value = type(uint256).max;
    }

    function testToOverflow_Min() external {
        _value = type(uint256).min;
        _value = _value - 1;
    }    

    function testToOverflow_Max() external {
        _value = type(uint256).max;
        _value = _value + 1;
    }
}
