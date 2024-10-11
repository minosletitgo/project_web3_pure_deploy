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


/*
    npx hardhat run .\scripts\deployTestVoting.js --network localGanache

    合约地址： 0x9A6BD890d692F80BB49E5368d3e2B3972f6C425a
    部署者：0x352307e6d885976D25B780f2af1F519084F6b2E7
*/