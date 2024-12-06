const { ethers, run, network } = require("hardhat");

// 在你的部署脚本中
async function main() {
  const contractAddress = "0xAE9F867f849f6F5B2508B0FAaa93f97AC5602179";
  const constructorArgs = [];
  console.log("contractAddress:", contractAddress );

  // 验证合约
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: constructorArgs,
    });
    console.log("Contract verified successfully!");
  } catch (e) {
    console.error("Failed to verify on Etherscan", e);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  /*
    npx hardhat run .\scripts\verifyHelloWorld.js --network sepolia
  */  
