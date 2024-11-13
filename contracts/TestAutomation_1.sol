// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";

contract TestAutomation_1 is AutomationCompatibleInterface {
    uint public lastTimeStamp;
    uint public interval = 30 seconds;

    event TestEvent_1(uint256 timestamp);

    // 构造函数
    constructor() {
        lastTimeStamp = block.timestamp;
    }    

    // checkUpkeep函数：用于判断是否需要执行定时任务
    function checkUpkeep(bytes calldata /*checkData*/) external view override returns (bool upkeepNeeded, bytes memory) {
        // 在Chainlink Automation 的任务中设置，如 每分钟触发一次，进入到此函数
        upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;
    }

    // performUpkeep函数：执行自动化任务
    function performUpkeep(bytes calldata /*performData*/) external override {
        // 如果"触发的checkUpkeep函数，返回true"，则会进入到此函数，开始执行真实的逻辑
        lastTimeStamp = block.timestamp;
        // 这里可以执行你需要自动化的操作，比如转账、状态更新等
        emit TestEvent_1(block.timestamp);
    }
}
