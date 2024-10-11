// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

//import "hardhat/console.sol";

contract Hello {
    event DoLog(string str);
    event DoLog2(string str, uint value, address addr);
    event DoLog3(bool success);
    event TestPrintLog(bool success);

    function print0() public returns (string memory) {
        emit DoLog("Hello, World!"); 
        return "Hello, World!";
    }

    function print1() public returns (string memory) {
        string memory str = unicode"print1() = 你好，世界!";
        emit DoLog(str);
        emit DoLog2(str, 9527, address(this));
        return str;
    }

    function print2() public returns (string memory) {
        string memory str = unicode"print2() = nihao，shijie!";
        emit DoLog(str);
        return str;
    }

    function print3() public returns (bool) {
        emit DoLog3(true);
        return true;
    }    

    function testPrint() public returns (bool) {
        bool success = true;
        // address voter = address(this);
        // address recoveredAddress = address(this);
        // emit VerifyVoteLog(success, voter, recoveredAddress);
        emit TestPrintLog(success);
        return success;
    }    
}