const { ethers } = require("hardhat");
const logger = require('../srcs/logger');

async function main() {
  const [deployer] = await ethers.getSigners();
  logger.info(`Deploying contracts with the account: ${deployer.address}`);

  const HelloWorld = await ethers.getContractFactory("HelloWorld", {
    contractPath: "./contracts/HelloWorld.sol",
  });
  const helloWorld = await HelloWorld.deploy();
  await helloWorld.deployed();

  logger.info(`helloWorld deployed to (address): ${helloWorld.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  /*
    npx hardhat run .\scripts\deployHelloWorld.js --network sepolia
    0xAE9F867f849f6F5B2508B0FAaa93f97AC5602179
  */
