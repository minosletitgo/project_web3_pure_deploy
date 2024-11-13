// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TestAutomation_0 {

    event TestEvent_0(uint256 timestamp);

    function doEmitTestEvent_0() external {
        emit TestEvent_0(block.timestamp);
    }
}
