const hre = require("hardhat");
const logger = require("../srcs/logger");
require("dotenv").config();

const contractABI = require("../abi/TestAutomation_0.json");

async function main() {

  const [signer] = await ethers.getSigners();

  // 合约实例
  const testContract = new hre.ethers.Contract(
    "0x3dFB169E799f022ff67D38E5f4ef19d9B6c13b30",
    contractABI,
    signer
  );
  logger.info(`合约的实例，成功拿到，地址：${testContract.address}`);

  /////////////////////////////////////////////////////////////////////

  const tx = await testContract.doEmitEvent();
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
    npx hardhat run .\test\runTestAutomation_0.js --network sepolia
*/
