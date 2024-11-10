const hre = require("hardhat");
const logger = require("../srcs/logger");
require("dotenv").config();

async function main() {
  {
    // 示例：无参函数
    const contract = new ethers.utils.Interface(["function doSomething()"]);
    const selector = contract.getSighash("doSomething");
    const encodedData = contract.encodeFunctionData("doSomething", []);
    console.log("Encoded Data With Null:", encodedData);
    // 返回值是：0x82692679
  }

  {
    // 示例：有参函数，为123
    const contract = new ethers.utils.Interface(["function doSomething(uint256)"]);
    const selector = contract.getSighash("doSomething");
    const encodedData = contract.encodeFunctionData("doSomething", [123]);
    console.log("Encoded Data With 123:", encodedData);
    // 返回值是：0xa6b206bf000000000000000000000000000000000000000000000000000000000000007b
  }  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/*
    npx hardhat run .\test\runToolCode.js --network localGanache
*/
