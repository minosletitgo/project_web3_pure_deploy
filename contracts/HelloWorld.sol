// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    uint256 public _value;

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