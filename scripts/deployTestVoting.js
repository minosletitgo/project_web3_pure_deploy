const hre = require("hardhat");
const logger = require('../srcs/logger');

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    logger.info(`Deploying contracts with the account: ${deployer.address}`);

    logger.info("Begin...TestVoting...");

    const TestVoting = await hre.ethers.getContractFactory("TestVoting", { contractPath: "./contracts/TestVoting.sol" });
    //const TestVoting = await hre.ethers.getContractFactory("TestVoting");
    const testVoting = await TestVoting.deploy();
    await testVoting.deployed();
    logger.info(`Contract deployed to: ${testVoting.address}`);
    
    logger.info("End...TestVoting...");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
