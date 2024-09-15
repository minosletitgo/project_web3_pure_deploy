// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import "hardhat/console.sol";

contract Hello {
    event DoLog(string str);
    event DoLog2(string str, uint value, address addr);

    function print0() public returns (string memory) {
        emit DoLog("Hello, World!"); 
        return "Hello, World!";
    }

    function print1() public returns (string memory) {
        string memory str = unicode"print1() = 你好，世界";
        emit DoLog(str);
        emit DoLog2(str, 9527, address(this));
        return str;
    }

    function print2() public returns (string memory) {
        string memory str = unicode"print2() = nihao，shijie";
        emit DoLog(str);
        return str;
    }
}
