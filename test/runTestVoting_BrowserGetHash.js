const hre = require("hardhat");
const logger = require("../srcs/logger");
const assert = require("assert");
require("dotenv").config();

async function main() {
  const candidateId = "12345"; // 候选人的ID
  const message = `I vote for candidate ${candidateId}`; // 投票的消息

  // 计算哈希值
  const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(message));
  logger.info(`hash = ${hash}`);

  const prefix = "\x19Ethereum Signed Message:\n32"; // 前缀
  const hashAddPrefix = ethers.utils.concat([ethers.utils.toUtf8Bytes(prefix), hash]); // 拼接前缀和哈希
  const hashToEth = ethers.utils.keccak256(hashAddPrefix); // 计算哈希
  logger.info(`hashToEth = ${hashToEth}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/*
    npx hardhat run .\test\runTestVoting_BrowserGetHash.js --network localGanache

    hash = 0x0b25b42715a38040a57e0ae9369af5f03b9fdafe02b291008d58c7911a2077e2
    hashToEth = 0xc2930031f49a003b2eea9b6dd8dc36fc9884963e7da7c7f977e798bf1236063a
    
    进入到浏览器：
    1. 确保已经安装了MetaMask钱包
    2. 确保测试链(如，Ganache)，已经加入到MetaMask中
    3. 确保连接的MetaMask账户，也就是后续步骤准备投票的账户(如，Ganache账户1)，这个非常重要！

    直接在浏览器控制台编写，如下：
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0]; // 获取第一个账户    
    const hash = "0x0b25b42715a38040a57e0ae9369af5f03b9fdafe02b291008d58c7911a2077e2"; // 要签名的哈希值
    //const message = "I vote for candidate 12345"; // 原始消息

    // 请求签名
    const signature = await ethereum.request({method: "personal_sign", params: [account, hash]})	

    console.log("Account:", account);
    console.log("Signature:", signature);     
    
    VM604:11 Account: 0x352307e6d885976d25b780f2af1f519084f6b2e7
    VM604:12 Signature: 0x6311711e04fc1d23de2a75b020062f67398c9bcd1728c7c1d01f86755286c3331412e4a7e15c67862b74803527e41d93ea5fcf7d4572b3317347b8c2b8c35efa1b
*/
