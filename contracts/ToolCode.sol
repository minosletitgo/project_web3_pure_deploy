// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract ToolCode{

    function encodeWithSelector() public pure returns(bytes memory) {
        bytes4 data = bytes4(keccak256("setValue4(uint256)"));
        bytes memory encodedData = abi.encodeWithSelector(data, 123);
        return encodedData;
    } 

    /////////////////////////////////////////////////////////////

    function encode_burn() public pure returns(bytes memory) {
        bytes4 data = bytes4(keccak256("burn(uint256)"));
        bytes memory encodedData = abi.encodeWithSelector(data, 7);
        return encodedData;
    } 

    function encode_collate_propagate_storage() public pure returns(bytes memory) {
        bytes4 data = bytes4(keccak256("collate_propagate_storage(bytes16)"));
        bytes memory encodedData = abi.encodeWithSelector(data, 7);
        return encodedData;
    }

    /////////////////////////////////////////////////////////////

    function encode_upgradeTo(address target) public pure returns(bytes memory) {
        bytes4 data = bytes4(keccak256("upgradeTo(address)"));
        bytes memory encodedData = abi.encodeWithSelector(data, target);
        return encodedData;
    }     

    /////////////////////////////////////////////////////////////

    event Burned(address indexed from, uint256 value);

    function burn(uint256 value) public {
        emit Burned(msg.sender, value);
        console.log("burn %d", value);
    }

    /////////////////////////////////////////////////////////////

    error ReentrancyGuardReentrantCall();
    function foo() external pure {
        revert ReentrancyGuardReentrantCall();
    }
}