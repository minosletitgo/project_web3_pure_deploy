const hre = require("hardhat");
const logger = require('../srcs/logger');
const assert = require('assert');

async function main() {
    const signers = await hre.ethers.getSigners(); // 确保配置了5个账户
    logger.info(`Total accounts available: ${signers.length}`);

    const ownerCount = 5;
    const threshold = 3;
    assert(signers.length > ownerCount, 'signers.length > ownerCount');
   
    const adr_Alice = signers[0].address;
    const adr_Bob = signers[1].address;
    const adr_Charlie = signers[2].address;
    const adr_Dave = signers[3].address;
    const adr_Eric = signers[4].address;

    const ownerArray = [
        adr_Alice, adr_Bob, adr_Charlie, adr_Dave, adr_Eric
    ];

    logger.info(`Deploying contracts with the account: ${adr_Alice}`);

    const TestMultisigWallet = await hre.ethers.getContractFactory("TestMultisigWallet", { contractPath: "./contracts/TestMultisigWallet.sol" });
    const testMultisigWallet = await TestMultisigWallet.deploy(ownerArray, threshold);
    await testMultisigWallet.deployed();
    logger.info(`Contract deployed to: ${testMultisigWallet.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


/*
    npx hardhat run .\scripts\deployTestMultisigWallet.js --network localGanache

    合约地址： 0xFD1ad270fBD620107493A5DcE4CC543C121bD7d7
    部署者：0x352307e6d885976D25B780f2af1F519084F6b2E7
*/