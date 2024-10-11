const hre = require("hardhat");
const logger = require('../srcs/logger');

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    logger.info(`Deploying contracts with the account: ${deployer.address}`);

    logger.info("Begin...TestVoting_Browser...");

    const TestVoting_Browser = await hre.ethers.getContractFactory("TestVoting_Browser", { contractPath: "./contracts/TestVoting_Browser.sol" });
    //const TestVoting_Browser = await hre.ethers.getContractFactory("TestVoting_Browser");
    const testVoting_Browser = await TestVoting_Browser.deploy();
    await testVoting_Browser.deployed();
    logger.info(`Contract deployed to: ${testVoting_Browser.address}`);
    
    logger.info("End...TestVoting_Browser...");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


/*
    npx hardhat run .\scripts\deployTestVoting_Browser.js --network localGanache

    合约地址： 0xBCc9FbAd4210E0161BA0a03833C9104c4F30722B
    部署者：0x352307e6d885976D25B780f2af1F519084F6b2E7
*/