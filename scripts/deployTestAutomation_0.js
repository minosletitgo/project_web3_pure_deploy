const hre = require("hardhat");
const logger = require('../srcs/logger');

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    logger.info(`Deploying contracts with the account: ${deployer.address}`);

    const TestAutomation = await hre.ethers.getContractFactory("TestAutomation_0", { contractPath: "./contracts/TestAutomation_0.sol" });
    const testAutomation = await TestAutomation.deploy();
    await testAutomation.deployed();

    logger.info(`testAutomation Contract deployed to: ${testAutomation.address}`);
}

// 处理错误
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

/*
    npx hardhat run .\scripts\deployTestAutomation_0.js --network sepolia

    0x3dFB169E799f022ff67D38E5f4ef19d9B6c13b30
*/
