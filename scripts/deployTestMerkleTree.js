const hre = require("hardhat");
const logger = require('../srcs/logger');

const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

const { LocalStorage } = require('node-localstorage');

async function main() {

    // 白名单地址（10 个测试地址）
    const whitelistAddresses = [
        "0x1234567890123456789012345678901234567890",
        "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
        "0x1111111111111111111111111111111111111111",
        "0x2222222222222222222222222222222222222222",
        "0x3333333333333333333333333333333333333333",
        "0x4444444444444444444444444444444444444444",
        "0x5555555555555555555555555555555555555555",
        "0x6666666666666666666666666666666666666666",
        "0x7777777777777777777777777777777777777777",
        "0x8888888888888888888888888888888888888888"
    ];

    // 生成 Merkle Tree
    const leaves = whitelistAddresses.map(addr => keccak256(addr));
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });    

    // Merkle Root
    const merkleRoot = tree.getHexRoot();
    console.log("Merkle Root:", merkleRoot);
    // 0x1686db040dd21934633a086bb0a00f91367551239593d2473bf797eae2af040f

    // 生成每个地址的 Merkle Proof
    const proofs = whitelistAddresses.reduce((acc, addr) => {
        const leaf = keccak256(addr);
        acc[addr] = tree.getHexProof(leaf);
        return acc;
    }, {});    

    // 输出每个地址的 Merkle Proof
    console.log("Merkle Proofs:", proofs);    

    // 将 Merkle Root 和 Proofs 序列化为 JSON 字符串
    const dataToStore = {
        merkleRoot,
        proofs
    };    


    // 创建一个本地存储实例，指定存储目录
    const localStorage = new LocalStorage('./my_files');

    // 将树的根和 Proof 存储到 localStorage
    localStorage.setItem('merkleTree', JSON.stringify(dataToStore));

    const [deployer] = await hre.ethers.getSigners();
    logger.info(`Deploying contracts with the account: ${deployer.address}`);

    const TestMerkleTree = await hre.ethers.getContractFactory("TestMerkleTree", { contractPath: "./contracts/TestMerkleTree.sol" });
    const testMerkleTree = await TestMerkleTree.deploy(merkleRoot);
    await testMerkleTree.deployed();

    logger.info(`TestMerkleTree Contract deployed to: ${testMerkleTree.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

/*
    npx hardhat node
    npx hardhat run .\scripts\deployTestMerkleTree.js --network localHardhat

    默克尔树Root： 0x1686db040dd21934633a086bb0a00f91367551239593d2473bf797eae2af040f

    部署者： 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
    
    合约地址： 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9   
*/