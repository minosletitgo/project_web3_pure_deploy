const hre = require("hardhat");

async function main() {
    // 获取合约工厂
    const HelloEth = await hre.ethers.getContractFactory("HelloEth");
    
    // 部署合约，并发送 1 ETH 作为构造函数参数
    const helloEthDeployTx = await HelloEth.deploy({
        //value: ethers.parseEther("1.0")   // 发送 1 ETH
        value: 1                            // 发送 1 Wei
    });

    // 等待合约部署完成
    const helloEth = await helloEthDeployTx.deployed();

    console.log("Contract deployed to:", helloEth.address);
}

// 处理错误
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
