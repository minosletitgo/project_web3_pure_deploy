const { ethers } = require("hardhat");
const logger = require('../srcs/logger');

async function main() {

  logger.error("hello");
  logger.warn("hello");
  logger.info("hello");
  logger.http("hello");
  logger.verbose("hello");
  logger.debug("hello");
  logger.silly("hello");

  const [deployer] = await ethers.getSigners();
  logger.info(`Deploying contracts with the account: ${deployer.address}`);

  const Hello = await ethers.getContractFactory("Hello", {
    contractPath: "./contracts/Hello.sol",
  });
  //const Hello = await ethers.getContractFactory("Hello");
  const hello = await Hello.connect(deployer).deploy();
  await hello.deployed(); // 等待合约部署完成

  // 监听事件，并且保存回调函数以便稍后移除监听器
  // 部署到Sepolia，可以在区块链浏览器上，稳定的看到事件的日志
  // 部署到Ganache，在其UI的面板上，合约页签与事件页签，完全不显示，据说是官方只支持Truffle Project)
  // 在VSCode控制台，对事件的监听，有时候可以看到，有时候不能看到  
  // 放弃监听，注销掉
  // let logListener = (str) => {
  //   logger.info(`hello event detected!`);
  //   logger.info(`str: ${str}`);
  // };

  // logger.info("Adding event listener...");
  // //hello.on("DoLog", logListener);
  // logger.info("Event listener added.");

  logger.info("Begin...");

  // 终于(2024.09.15 晚22:30)，我在Hardhat官方的issues中，找到了"在VSCode控制台，打印事件日志"的方式，不需要监听，直接打印

  const tx0 = await hello.print0(); // 实际发送交易
  const contractReceipt0 = await tx0.wait(); // 等待交易打包进区块
  //强制打印交易Json数据  
  for (const event of contractReceipt0.events) {
    logger.info(JSON.stringify(event, null, 2)); // 格式化 JSON 输出
  }

  const tx1 = await hello.print1(); // 实际发送交易
  const contractReceipt1 = await tx1.wait(); // 等待交易打包进区块
  //强制打印交易Json数据  
  for (const event of contractReceipt1.events) {
    logger.info(JSON.stringify(event, null, 2)); // 格式化 JSON 输出
  }

  const tx2 = await hello.print2(); // 实际发送交易
  const contractReceipt2 = await tx2.wait(); // 等待交易打包进区块
  //强制打印交易Json数据  
  for (const event of contractReceipt2.events) {
    logger.info(JSON.stringify(event, null, 2)); // 格式化 JSON 输出
  }  
  
  const tx3 = await hello.print3(); // 实际发送交易
  const contractReceipt3 = await tx3.wait(); // 等待交易打包进区块
  //强制打印交易Json数据  
  for (const event of contractReceipt3.events) {
    logger.info(JSON.stringify(event, null, 2)); // 格式化 JSON 输出
  }    

  logger.info("End...");

  logger.info(`Hello deployed to (address): ${hello.address}`);

  // // 确保在所有操作完成后移除监听器
  // logger.info("Removing event listener...");
  // hello.off("DoLog", logListener);
  // logger.info("Event listener removed.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/*
    npx hardhat run .\scripts\deployHello.js --network localHardhat
*/