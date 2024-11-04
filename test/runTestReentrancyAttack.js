const hre = require("hardhat");
const logger = require("../srcs/logger");
const bankContractABI = require("../abi/Bank.json");
const attackContractABI = require("../abi/Attack.json");
require('dotenv').config();

async function main() {
    const [signer] = await ethers.getSigners();

    // 合约实例 - bank
    const bankContract = new hre.ethers.Contract("0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9", bankContractABI, signer);
    logger.info(`bank 合约的实例，成功拿到，地址：${bankContract.address}`);    
    logger.info(`bank 余额 = ${await bankContract.getBalanceOfSelf()}`);    

    // 合约实例 - attack
    const attackContract = new hre.ethers.Contract("0x5FC8d32690cc91D4c39d9d3abcBD16989F875707", attackContractABI, signer);
    logger.info(`attack 合约的实例，成功拿到，地址：${attackContract.address}`);
    logger.info(`attack 余额 = ${await attackContract.getBalanceOfSelf()}`);   

    const tx = await attackContract.attack({
        value: ethers.utils.parseEther("1")
    });
    const contractReceipt = await tx.wait(); // 等待交易打包进区块
    if (contractReceipt) {
        logger.info(`contractReceipt.status = ${contractReceipt.status}`);
    
        if (contractReceipt.events && contractReceipt.events.length > 0) {
          logger.info(
            `contractReceipt.events.length = ${contractReceipt.events.length}`
          );
          for (const event of contractReceipt.events) {
            logger.info(JSON.stringify(event, null, 2)); // 格式化 JSON 输出
          }
        }
    }

    logger.info(`bank 余额 = ${await bankContract.getBalanceOfSelf()}`);    
    logger.info(`attack 余额 = ${await attackContract.getBalanceOfSelf()}`);   
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


  /*
    npx hardhat run .\test\runTestReentrancyAttack.js --network localHardhat
*/

