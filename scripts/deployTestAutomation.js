const hre = require("hardhat");
const logger = require('../srcs/logger');

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    logger.info(`Deploying contracts with the account: ${deployer.address}`);

    const TestAutomation = await hre.ethers.getContractFactory("TestAutomation", { contractPath: "./contracts/TestAutomation.sol" });
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
    npx hardhat run .\scripts\deployTestAutomation.js --network sepolia

    0xa685f5aC79f4C6485F50c8bF5252898e075Cff3b
*/
