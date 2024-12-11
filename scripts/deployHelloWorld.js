const { ethers } = require("hardhat");
const logger = require("../srcs/logger");

async function main() {
  const accounts  = await ethers.getSigners();
  const deployer = accounts[accounts.length - 1];

  const HelloWorld = await ethers.getContractFactory("HelloWorld", {
    contractPath: "./contracts/HelloWorld.sol",
  });
  const helloWorld = await HelloWorld.connect(deployer).deploy();
  await helloWorld.deployed();

  logger.info(`helloWorld deployed to (address): ${helloWorld.address}`);
  logger.info(`helloWorld deployed by (address): ${await helloWorld.owner()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/*
    npx hardhat run .\scripts\deployHelloWorld.js --network localHardhat
    npx hardhat run .\scripts\deployHelloWorld.js --network sepolia
    0xAE9F867f849f6F5B2508B0FAaa93f97AC5602179
  */
