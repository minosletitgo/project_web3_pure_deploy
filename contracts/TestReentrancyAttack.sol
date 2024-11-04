// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/*
    演示 重入攻击 - 防御
*/

import "hardhat/console.sol";

abstract contract ReentrancyGuard {
    uint256 private constant NOT_ENTERED = 1;
    uint256 private constant ENTERED = 2;

    uint256 private _status;

    error ReentrancyGuardReentrantCall();

    constructor() {
        _status = NOT_ENTERED;
    }

    modifier nonReentrant() {
        _nonReentrantBefore();
        _;
        _nonReentrantAfter();
    }

    function _nonReentrantBefore() private {
        if (_status == ENTERED) {
            console.log("ready ! revert ReentrancyGuardReentrantCall()");
            revert ReentrancyGuardReentrantCall();
        }

        _status = ENTERED;
    }

    function _nonReentrantAfter() private {
        _status = NOT_ENTERED;
    }

    function _reentrancyGuardEntered() internal view returns (bool) {
        return _status == ENTERED;
    }
}

contract Bank is ReentrancyGuard {
    mapping (address => uint256) public balanceOf;

    constructor() payable {
        console.log("Bank constructor msg.value = %d ", msg.value);
    }    

    // 存入ether，并更新余额
    function deposit() external payable {
        balanceOf[msg.sender] += msg.value;
    }

    // 提取msg.sender的全部ether
    function withdraw() external nonReentrant {
        console.log("Bank.withdraw.001 use -- nonReentrant, but [balanceOf[msg.sender] = 0] at last!");

        uint256 balance = balanceOf[msg.sender]; // 获取余额
        require(balance > 0, "Insufficient balance");

        // 先更新余额
        balanceOf[msg.sender] = 0;
        
        console.log("Bank.withdraw.002");

        // 转账 ether，此时，已经有防御了
        (bool success, ) = msg.sender.call{value: balance}("");

        console.log("Bank.withdraw.003");

        require(success, "Failed to send Ether");

        console.log("Bank.withdraw.004");
    }

    // 获取银行合约的总余额
    function getBalanceOfSelf() external view returns (uint256) {
        return address(this).balance;
    }

    function setDebugValue1(uint256 value) external pure {
        console.log("Bank.setDebugValue1(%d)", value);
    }     
}

contract Attack {
    Bank public bank; // Bank合约地址

    // 初始化Bank合约地址
    constructor(Bank _bank) {
        bank = _bank;
    }

    // 回调函数，用于重入攻击Bank合约，反复的调用目标的withdraw函数
    receive() external payable {
        if (bank.getBalanceOfSelf() >= 1 ether) {
            bank.withdraw();
        }
    }

    // 攻击函数，调用时 msg.value 设为 1 ether
    function attack() external payable {
        require(msg.value == 1 ether, "Require 1 Ether to attack");
        bank.deposit{value: 1 ether}();
        bank.withdraw();
    }

    // 获取本合约的余额
    function getBalanceOfSelf() external view returns (uint256) {
        return address(this).balance;
    }
}