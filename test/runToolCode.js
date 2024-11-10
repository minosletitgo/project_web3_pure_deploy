const hre = require("hardhat");
const logger = require("../srcs/logger");
require("dotenv").config();
const contractABI = require("../abi/ToolCode.json");

async function main() {
  // 定义目标合约的函数签名
  const functionSignature = "burn(uint256)";

  // 创建合约接口实例
  const contractAbi = ["function burn(uint256)"];
  const contract = new ethers.utils.Interface(contractAbi);

  // 计算函数选择器
  const selector = contract.getSighash("burn");

  // 编码数据
  const encodedData = contract.encodeFunctionData("burn", [123]);

  console.log("Encoded Data:", encodedData);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/*
    npx hardhat run .\test\runTestCode.js --network localGanache
*/
