const hre = require("hardhat");
const logger = require("../srcs/logger");
const contractABI = require("../abi/TestVoting.json");
const assert = require("assert");
require("dotenv").config();

async function main() {
  const candidateId = "12345"; // 候选人的ID
  const message = `I vote for candidate ${candidateId}`; // 投票的消息

  const privateKey = process.env.PRIVATE_KEY_localGanache;
  const wallet = new hre.ethers.Wallet(privateKey);

  try {
    // 签名消息
    const signature = await wallet.signMessage(message);

    // 拆分签名数据
    const { r, s, v } = hre.ethers.utils.splitSignature(signature);

    const userAddress = wallet.address;

    const [signer] = await ethers.getSigners();
    const signerAddress = await signer.getAddress();
    assert.strictEqual(signerAddress, userAddress);

    // 已经部署完毕的，投票合约的地址
    const contractAddress = "0x24320D020dC25241C3d1a38404bf4e4CbEDD9250"; 
    const abi = contractABI;

    // 创建智能合约实例
    const contract = new hre.ethers.Contract(contractAddress, abi, signer);

    // 调用智能合约的投票验证方法
    const tx = await contract.verifyVote(userAddress, message, v, r, s);
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
    npx hardhat run .\test\runTestVoting.js --network localGanache
*/
