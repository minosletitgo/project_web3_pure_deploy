const hre = require("hardhat");
const logger = require("../srcs/logger");
const contractABI = require("../abi/Hello.json");
require('dotenv').config();

async function main() {
    const [signer] = await ethers.getSigners();

    const contractAddress = "0xE4cA9a8f04ca23731B7863742F24032f561682F1";
    const abi = contractABI;
    
    // 创建智能合约实例
    const contract = new hre.ethers.Contract(contractAddress, abi, signer);
    logger.info(`合约的实例，成功拿到！`);

    const tx = await contract.print3();
    const contractReceipt = await tx.wait(); // 等待交易打包进区块
    //强制打印交易Json数据  
    for (const event of contractReceipt.events) {
      logger.info(JSON.stringify(event, null, 2)); // 格式化 JSON 输出
    }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });




/*
    npx hardhat run .\test\runHello.js --network localGanache
*/