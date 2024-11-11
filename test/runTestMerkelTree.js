const hre = require("hardhat");
const logger = require("../srcs/logger");
require("dotenv").config();

const contractABI = require("../abi/TestMerkleTree.json");

const { LocalStorage } = require('node-localstorage');

async function main() {

  const [signer] = await ethers.getSigners();

  // 合约实例
  const testContract = new hre.ethers.Contract(
    "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
    contractABI,
    signer
  );
  logger.info(`合约的实例，成功拿到，地址：${testContract.address}`);

  /////////////////////////////////////////////////////////////////////

  // 读取默克尔树的数据
  const localStorage = new LocalStorage('./my_files');  
  const storedData = JSON.parse(localStorage.getItem('merkleTree'));

  const testAddress = '0x1111111111111111111111111111111111111111';
  
  // 验证地址是否在白名单中
  const isValid = await testContract.verifyAddressInWhitelist(storedData.proofs[testAddress], testAddress);
  logger.info(`verifyAddressInWhitelist：${testAddress} -> ${isValid}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/*
    npx hardhat run .\test\runTestMerkelTree.js --network localHardhat
*/
