const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    console.log("Begin...Deploy1...");

    const Deploy1 = await hre.ethers.getContractFactory("Deploy1", { contractPath: "./contracts/TestCreate2.sol" });
    //const Deploy1 = await hre.ethers.getContractFactory("Deploy1");
    const deploy1 = await Deploy1.deploy();
    await deploy1.deployed();
    
    const addrByDeploy1 = await deploy1.deployHello1_Create();
    const addrByDeploy1_Receipt = await addrByDeploy1.wait(); // 等待交易打包进区块    
    for (const event of addrByDeploy1_Receipt.events) {//强制打印交易Json数据  
      console.log(JSON.stringify(event, null, 2)); // 格式化 JSON 输出
    }

    const calculateHello1Addr = await deploy1.calculateHello1Addr();
    const calculateHello1Addr_Receipt = await calculateHello1Addr.wait(); // 等待交易打包进区块    
    for (const event of calculateHello1Addr_Receipt.events) {//强制打印交易Json数据  
      console.log(JSON.stringify(event, null, 2)); // 格式化 JSON 输出
    }

    console.log("deploy1 deployed to (address):", deploy1.address);

    console.log("End...Deploy1...");

    console.log("------------------------------------------");

    console.log("Begin...Deploy2...");

    const Deploy2 = await hre.ethers.getContractFactory("Deploy2", { contractPath: "./contracts/TestCreate2.sol" });
    //const Deploy2 = await hre.ethers.getContractFactory("Deploy2");
    const deploy2 = await Deploy2.deploy();
    await deploy2.deployed();
    
    const addrByDeploy2 = await deploy2.deployHello2_Create("hahaha");
    const addrByDeploy2_Receipt = await addrByDeploy2.wait(); // 等待交易打包进区块    
    for (const event of addrByDeploy2_Receipt.events) {//强制打印交易Json数据  
      console.log(JSON.stringify(event, null, 2)); // 格式化 JSON 输出
    }

    const calculateHello2Addr = await deploy2.calculateHello2Addr("hahaha");
    const calculateHello2Addr_Receipt = await calculateHello2Addr.wait(); // 等待交易打包进区块    
    for (const event of calculateHello2Addr_Receipt.events) {//强制打印交易Json数据  
      console.log(JSON.stringify(event, null, 2)); // 格式化 JSON 输出
    }

    console.log("deploy2 deployed to (address):", deploy2.address);
    
    console.log("End...Deploy2...");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
