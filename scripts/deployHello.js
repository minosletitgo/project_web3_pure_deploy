const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Hello = await ethers.getContractFactory("Hello", {
    contractPath: "./contracts/Hello.sol",
  });
  //const Hello = await ethers.getContractFactory("Hello");
  const hello = await Hello.deploy();
  await hello.deployed(); // 等待合约部署完成

  // 监听事件，并且保存回调函数以便稍后移除监听器
  // 部署到Sepolia，可以在区块链浏览器上，稳定的看到事件的日志
  // 部署到Ganache，在其UI的面板上，合约页签与事件页签，完全不显示，据说是官方只支持Truffle Project)
  // 在VSCode控制台，对事件的监听，有时候可以看到，有时候不能看到  
  // 放弃监听，注销掉
  // let logListener = (str) => {
  //   console.log(`hello event detected!`);
  //   console.log(`str: ${str}`);
  // };

  // console.log("Adding event listener...");
  // //hello.on("DoLog", logListener);
  // console.log("Event listener added.");

  console.log("Begin...");

  // 终于(2024.09.15 晚22:30)，我在Hardhat官方的issues中，找到了"在VSCode控制台，打印事件日志"的方式，不需要监听，直接打印

  const tx0 = await hello.print0(); // 实际发送交易
  const contractReceipt0 = await tx0.wait(); // 等待交易打包进区块
  //强制打印交易Json数据  
  for (const event of contractReceipt0.events) {
    console.log(JSON.stringify(event, null, 2)); // 格式化 JSON 输出
  }

  const tx1 = await hello.print1(); // 实际发送交易
  const contractReceipt1 = await tx1.wait(); // 等待交易打包进区块
  //强制打印交易Json数据  
  for (const event of contractReceipt1.events) {
    console.log(JSON.stringify(event, null, 2)); // 格式化 JSON 输出
  }
  
  console.log("End...");

  console.log("Hello deployed to (address):", hello.address);

  // // 确保在所有操作完成后移除监听器
  // console.log("Removing event listener...");
  // hello.off("DoLog", logListener);
  // console.log("Event listener removed.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });