const hre = require("hardhat");
const logger = require("../srcs/logger");
const contractABI = require("../abi/TestVoting_Browser.json");
const assert = require("assert");
require("dotenv").config();

async function main() {
//   const candidateId = "12345"; // 候选人的ID
//   const message = `I vote for candidate ${candidateId}`; // 投票的消息

  // 该账户为投票者，它是Ganache的账户1
  const privateKey = process.env.PRIVATE_KEY_localGanache;
  const wallet = new hre.ethers.Wallet(privateKey);

  try {
    // 拿现成的hashToEth值
    const hashToEth = "0xc2930031f49a003b2eea9b6dd8dc36fc9884963e7da7c7f977e798bf1236063a";

    // 签名消息(向浏览器的钱包，交互返回的)
    const signature =
      "0x6311711e04fc1d23de2a75b020062f67398c9bcd1728c7c1d01f86755286c3331412e4a7e15c67862b74803527e41d93ea5fcf7d4572b3317347b8c2b8c35efa1b";      

    // // 拆分签名数据
    // const { r, s, v } = hre.ethers.utils.splitSignature(signature);

    const userAddress = wallet.address;

    const [signer] = await ethers.getSigners();
    const signerAddress = await signer.getAddress();
    assert.strictEqual(signerAddress, userAddress);

    // 已经部署完毕的，投票合约的地址
    const contractAddress = "0xBCc9FbAd4210E0161BA0a03833C9104c4F30722B";
    const abi = contractABI;

    // 创建智能合约实例
    const contract = new hre.ethers.Contract(contractAddress, abi, signer);

    // 调用智能合约的投票验证方法
    const tx = await contract.verifyVote(userAddress, hashToEth, signature);
    const contractReceipt = await tx.wait(); // 等待交易打包进区块
    // 有效监控交易数据
    for (const event of contractReceipt.events) {
      logger.info(JSON.stringify(event, null, 2));
    }
    logger.info(`交易发送成功：", ${tx}`);
  } catch (error) {
    logger.error(`签名失败：", ${error}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/*
    npx hardhat run .\test\runTestVoting_BrowserToContract.js --network localGanache

    投票者：Ganache的账户1
    签名者：
*/
