// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TestVoting {
    function verifyVote(
        address voter,        // 投票用户的地址
        string memory message,  // 投票消息
        uint8 v,               // 签名的 v 值
        bytes32 r,             // 签名的 r 值
        bytes32 s              // 签名的 s 值
    ) public pure returns (bool) {
        // 将消息哈希处理为以太坊格式的消息签名
        bytes32 messageHash = keccak256(abi.encodePacked(message));
        bytes32 ethSignedMessageHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash));

        // 从签名数据恢复出签名者的地址
        address recoveredAddress = ecrecover(ethSignedMessageHash, v, r, s);
        
        // 比较恢复出的地址和提供的用户地址
        return (recoveredAddress == voter);
    }
}
