
----------------------------------------------------------------------------------------------------
切记不要忽视版本号(停留在当前5.X.X)，特别是当ethers版本号>=6的时候，语法都有差异(甚至一些未知问题)！！！

初始化 Node.js 项目
npm init

npm install hardhat@2.22.9

选择"创建一个空的 hardhat.config.js"

npm install ethers@5.4.1

npm install web3@4.12.1

npm install @nomiclabs/hardhat-ethers@2.2.1

npm install @nomiclabs/hardhat-etherscan@3.1.7

npm install dotenv@16.4.5
npm install --save-dev chai@4.3.6

npm install --save-dev hardhat-gas-reporter@2.2.1

----------------------------------------------------------------------------------------------------

自行搭建hardhat.config.js 以及 .env配置文件

----------------------------------------------------------------------------------------------------

部署：
npx hardhat run .\scripts\deploy_XXX.js --network sepolia

验证：(由于我的VPN比较差，所以验证都失败，虽然我尝试了很多方式)
npx hardhat run .\scripts\verify_XXX.js --network sepolia

测试：
npx hardhat test test/Hello.test.js