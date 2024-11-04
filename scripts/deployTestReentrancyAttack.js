const hre = require("hardhat");
const logger = require('../srcs/logger');

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    logger.info(`Deploying contracts with the account: ${deployer.address}`);

    const Bank = await hre.ethers.getContractFactory("Bank", { contractPath: "./contracts/TestReentrancyAttack.sol" });
    const bank = await Bank.deploy({
        value: ethers.utils.parseEther("10.0")
    });
    await bank.deployed();
    logger.info(`Bank Contract deployed to: ${bank.address}`);    
    logger.info(`Bank Contract getBalanceOfSelf : ${await bank.getBalanceOfSelf()}`);
    
    const Attack = await hre.ethers.getContractFactory("Attack", { contractPath: "./contracts/TestReentrancyAttack.sol" });
    const attack = await Attack.deploy(bank.address);
    await attack.deployed();
    logger.info(`Attack Contract deployed to: ${attack.address}`);    
    logger.info(`Attack Contract getBalanceOfSelf : ${await attack.getBalanceOfSelf()}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


/*
    npx hardhat node
    npx hardhat run .\scripts\deployTestReentrancyAttack.js --network localHardhat

    部署者： 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
    
    Bank 合约地址： 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9
    Attack 合约地址： 0x5FC8d32690cc91D4c39d9d3abcBD16989F875707    
*/