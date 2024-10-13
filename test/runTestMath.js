const hre = require("hardhat");
const logger = require("../srcs/logger");
require("dotenv").config();

// 建立行为枚举
const ValueType = {
  address: 0,
  uint256: 1,
  bytes32: 2,
  bytes: 3,
};

async function main() {
  //await testKeccak256(ValueType.uint256, 123);
  //await testKeccak256(ValueType.address, '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4');
  //await testKeccak256_Mix('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4', 123);
  await testKeccak256_Mix2("0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", 123456, "0x", 0, 1337);
}

function testKeccak256(valueType, value) {
  let hashValue = null;
  switch (valueType) {
    case ValueType.uint256:
      hashValue = ethers.utils.solidityKeccak256(["uint256"], [value]);
      break;
    case ValueType.address:
      hashValue = ethers.utils.solidityKeccak256(["address"], [value]);
      break;
  }

  logger.info(`value = ${value} -> ${hashValue}`);
}

function testKeccak256_Mix(targetAddress, value) {
    let hashValue = null;
    hashValue = ethers.utils.solidityKeccak256(
        ["address", "uint256"], 
        [targetAddress, value]
    );
    logger.info(`hashValue = ${hashValue}`);
}

function testKeccak256_Mix2(targetAddress, value, data, nonce, chainid) {
    let hashValue = null;
    const dataHash = ethers.utils.keccak256(data);  
    hashValue = ethers.utils.solidityKeccak256(
        ["address", "uint256", "bytes32", "uint256", "uint256"],
        [targetAddress, value, dataHash, nonce, chainid]
      );
    logger.info(`hashValue = ${hashValue}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/*
    npx hardhat run .\test\runTestMath.js --network localGanache

    0x5569044719a1ec3b04d0afa9e7a5310c7c0473331d13dc9fafe143b2c4e8148a
    0x5569044719a1ec3b04d0afa9e7a5310c7c0473331d13dc9fafe143b2c4e8148a

*/
