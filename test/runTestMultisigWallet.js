const hre = require("hardhat");
const logger = require("../srcs/logger");
const contractABI = require("../abi/TestMultisigWallet.json");
require("dotenv").config();

class User {
  // 用户私密数据
  constructor(signer, privateKey) {
    this.signer = signer;
    this.privateKey = privateKey;
  }
}

class UserSign {
  // 用户签名数据
  constructor(userAddress, signature) {
    this.userAddress = userAddress;
    this.signature = signature;
  }
}


async function main() {
  const signers = await ethers.getSigners();
  logger.info(`signers.length = ${signers.length}`);

  // 创始者5人
  const user_Alice = new User(signers[0], process.env.PRIVATE_KEY_localGanache);
  const user_Bob = new User(signers[1], process.env.PRIVATE_KEY_localGanache2);
  const user_Charlie = new User(
    signers[2],
    process.env.PRIVATE_KEY_localGanache3
  );
  const user_Dave = new User(signers[3], process.env.PRIVATE_KEY_localGanache4);
  const user_Eric = new User(signers[4], process.env.PRIVATE_KEY_localGanache5);

  // 创始者数组
  const userAllOwner = [];
  userAllOwner.push(user_Alice);
  userAllOwner.push(user_Bob);
  userAllOwner.push(user_Charlie);
  userAllOwner.push(user_Dave);
  userAllOwner.push(user_Eric);

  // 最后的交易目标(就以最简单的个人钱包为准)
  const user_Frank = new User(
    signers[5],
    process.env.PRIVATE_KEY_localGanache6
  );

  // 多签钱包的地址
  const contractAddress = "0xCC1f37E50456D4BBb8a67eD18c2c67A67FabE782";

  // 合约的ABI
  const abi = contractABI;

  // 创建智能合约实例
  const contract = new hre.ethers.Contract(
    contractAddress,
    abi,
    user_Alice.signer
  );
  logger.info(`合约的实例，成功拿到！`);
  
  // 定义每个创始者，为多签钱包捐献的备用金
  const initializeEth = "1";  

  // 定义创建交易时，准备转账的额度
  const transactionSendEth = "4";

  // 交易哈希值，过程中生成的
  const transactionHash = "0xc126b415617b57bf6925b9784ba85c3b660333b9c3c47c999e2fd7c76649f8c6";

  // 签名值汇总，过程中生成的
  const finalSignatures = "0x03742f9e3bbf3b2a3fa430f72d3aac6c5cd5f3c98622d862cd4432f3825e4d961b17cce75b3971d74c0ed60d3b52856bda478b745f602fccc9100ef1d7deae321b8505173197070e3310489f00c35f671642a1f0ca6f394717f33d72a3f80d525e08b105de96e9ce9ad16a7c345e8874ef13822c14afd8e923a0e560a38487f1111beec21454c95f1f6c8128738bfbd827e351d32f8ea1891616dcb6609a27483ace0b6ab6ea2b2aa3c283a2fd968f6965ce700341565747d5e66a16847e79d8148d1b";



  // 建立行为枚举
  const Operate = {
    getBalance: 0,
    encodeTransactionData: 1,
    testTransEthToTarget: 2,
    initializeEthToWallet: 3,
    createTransactionAndEncodeHash: 4,
    signTransaction: 5,
    collectAndSortSignatures: 6,
    submitTransaction: 7,
  };

  const opr = Operate.getBalance;

  switch (opr) {
    case Operate.getBalance:
      {
        // 测试，查询合约的余额
        await getBalance(contract);
      }
      break;
    case Operate.encodeTransactionData:
      {
        // 测试，查询合约生成的哈希值
        await encodeTransactionData(
          contract,
          user_Frank.signer.address,
          ethers.utils.parseEther(transactionSendEth),
          "0x",
          0,
          1337
        );

        // 直接调取本地的计算哈希函数
        await createTransactionAndEncodeHash(
          user_Frank.signer.address,
          ethers.utils.parseEther(transactionSendEth),
          "0x",
          0,
          1337
        );
      }
      break;
      case Operate.testTransEthToTarget:
        {
          // 测试，测试操控合约转账给指定地址
          await testTransEthToTarget(
            contract, 
            user_Frank.signer.address,
            ethers.utils.parseEther(transactionSendEth),
            "0x",
          );
        }
        break;      
    case Operate.initializeEthToWallet:
      {
        // 创始者为合约初始资金
        await initializeEthToWallet(user_Alice.signer, contract, initializeEth, "ether");
        await initializeEthToWallet(user_Bob.signer, contract, initializeEth, "ether");
        await initializeEthToWallet(user_Charlie.signer, contract, initializeEth, "ether");
        await initializeEthToWallet(user_Dave.signer, contract, initializeEth, "ether");
        await initializeEthToWallet(user_Eric.signer, contract, initializeEth, "ether");
      }
      break;
    case Operate.createTransactionAndEncodeHash:
      {
        // 创建一笔交易，且生成它的哈希值
        await createTransactionAndEncodeHash(
          user_Frank.signer.address,
          ethers.utils.parseEther(transactionSendEth),
          "0x",
          0,
          1337
        );
      }
      break;
    case Operate.signTransaction:
      {
        // 让每一个创始者，逐个完成签名(约定是"5签3")
        await signTransaction(
          transactionHash,
          user_Alice
        );
        await signTransaction(
          transactionHash,
          user_Bob
        );
        await signTransaction(
          transactionHash,
          user_Charlie
        );
      }
      break;
    case Operate.collectAndSortSignatures:
      {
        // 汇总所有创始者的签名
        const userSign_Alice = new UserSign(
          user_Alice.signer.address,
          "0xeec21454c95f1f6c8128738bfbd827e351d32f8ea1891616dcb6609a27483ace0b6ab6ea2b2aa3c283a2fd968f6965ce700341565747d5e66a16847e79d8148d1b"
        );
        const userSign_Bob = new UserSign(
          user_Bob.signer.address,
          "0x8505173197070e3310489f00c35f671642a1f0ca6f394717f33d72a3f80d525e08b105de96e9ce9ad16a7c345e8874ef13822c14afd8e923a0e560a38487f1111b"
        );
        const userSign_Charlie = new UserSign(
          user_Charlie.signer.address,
          "0x03742f9e3bbf3b2a3fa430f72d3aac6c5cd5f3c98622d862cd4432f3825e4d961b17cce75b3971d74c0ed60d3b52856bda478b745f602fccc9100ef1d7deae321b"
        );

        const userSigns = [];
        userSigns.push(userSign_Alice);
        userSigns.push(userSign_Bob);
        userSigns.push(userSign_Charlie);
        await collectAndSortSignatures(userSigns);
      }
      break;
    case Operate.submitTransaction: {
      // 最终提交交易，但这里赋予的参数是"前期提交"
      await submitTransaction(
        contract,
        user_Frank.signer.address,
        ethers.utils.parseEther(transactionSendEth),
        "0x",
        finalSignatures
      );
    }
    default:
      break;
  }
}

async function getBalance(contract) {
  const balance = await contract.getBalance();
  logger.info(`balance = ${balance}`);
  logger.info(
    `Contract balance: ${ethers.utils.formatUnits(balance, "kwei")} kwei`
  );
  logger.info(
    `Contract balance: ${ethers.utils.formatUnits(balance, "mwei")} mwei`
  );
  logger.info(
    `Contract balance: ${ethers.utils.formatUnits(balance, "gwei")} gwei`
  );
  logger.info(`Contract balance: ${ethers.utils.formatEther(balance)} eth`);
}

async function encodeTransactionData(
  contract,
  targetAddress,
  value,
  data,
  nonce,
  chainId
) {
  const tx = await contract.encodeTransactionData(
    targetAddress,
    value,
    data,
    nonce,
    chainId
  );

  // 等待交易被链上确认
  const receipt = await tx.wait();
  // 有效监控交易数据
  for (const event of receipt.events) {
    logger.info(JSON.stringify(event, null, 2));
  }
}

async function testTransEthToTarget(contract, targetAddress, value, data) {
  const tx = await contract.testTransEthToTarget(
    targetAddress,
    value,
    data
  );  
}

async function initializeEthToWallet(signer, contract, value, unit) {
  try {
    // 将金额转换为 Wei 单位
    let amountInWei;
    if (unit === "ether") {
      amountInWei = ethers.utils.parseEther(value);
    } else if (unit === "gwei") {
      amountInWei = ethers.utils.parseUnits(value, "gwei");
    } else if (unit === "kwei") {
      amountInWei = ethers.utils.parseUnits(value, "kwei");
    } else if (unit === "mwei") {
      amountInWei = ethers.utils.parseUnits(value, "mwei");
    } else {
      throw new Error("Unsupported unit");
    }

    // 构建交易对象
    const tx = {
      to: contract.address,
      value: amountInWei,
    };

    // 发送交易(通用方式，目标合约有receive函数即可)
    const receipt = await signer.sendTransaction(tx);

    // 等待交易被矿工确认
    await receipt.wait();

    console.log(`Transaction successful with hash: ${receipt.hash}`);
  } catch (error) {
    console.error("Failed to send transaction:", error);
  }
}

async function createTransactionAndEncodeHash(
  targetAddress,
  value,
  data,
  nonce,
  chainId
) {
  // data = "0x"; // 空数据
  // nonce = 0; // 假设是第一次交易
  // chainId = 1337; // 主网链ID，可以改为测试网链ID，如5是Goerli，11155111是Sepolia
  const ethValue = ethers.BigNumber.from(value);
  const dataHash = ethers.utils.keccak256(data);  
  const hashValue = ethers.utils.solidityKeccak256(
    ["address", "uint256", "bytes32", "uint256", "uint256"],
    [targetAddress, ethValue, dataHash, nonce, chainId]
  );

  logger.info(
    `createTransactionAndEncodeHash(${targetAddress}, ${ethValue}, ${dataHash}, ${nonce}, ${chainId}, ${hashValue})`
  );
}

async function signTransaction(txHash, user) {
  const wallet = new ethers.Wallet(user.privateKey);
  const messageHashBytes = ethers.utils.arrayify(txHash);
  const signature = await wallet.signMessage(messageHashBytes);
  logger.info(
    `user_address = ${user.signer.address}, signature = ${signature}`
  );
}

async function collectAndSortSignatures(userSigns) {
  // 按地址从小到大排序 userSigns 数组
  userSigns.sort((a, b) =>
    a.userAddress.toLowerCase().localeCompare(b.userAddress.toLowerCase())
  );

  let finalSignatures = "0x";
  for (let userSign of userSigns) {
    // 使用 splitSignature 拆分完整签名
    const { v, r, s } = ethers.utils.splitSignature(userSign.signature);
    finalSignatures +=
      r.slice(2) + s.slice(2) + v.toString(16).padStart(2, "0");
  }

  logger.info(`finalSignatures = ${finalSignatures}`);
}

async function submitTransaction(
  contract,
  targetAddress,
  value,
  data,
  finalSignatures
) {
  try {
    logger.info("contract.execTransaction 准备");

    // 调用合约的 execTransaction 方法
    const tx = await contract.execTransaction(
      targetAddress,
      value,
      data,
      finalSignatures
    );
    logger.info("contract.execTransaction 完毕");

    // 等待交易被链上确认
    const receipt = await tx.wait();
    // 有效监控交易数据
    for (const event of receipt.events) {
      logger.info(JSON.stringify(event, null, 2));
    }
  } catch (error) {
    logger.error("Error submitting transaction:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/*
    npx hardhat run .\test\runTestMultisigWallet.js --network localGanache
*/
