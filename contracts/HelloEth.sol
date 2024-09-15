// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract HelloEth {
    constructor() payable {}

    // receive() 函数在 ETH 转账且 msg.data 为空时被调用
    receive() external payable {
        // 可以在这里添加处理接收 ETH 的逻辑
    }

    // fallback() 函数用来处理其他调用或附带数据的转账
    fallback() external payable {
        // 可以在这里处理其他类型的调用
    }
}
