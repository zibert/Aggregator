import { task } from "hardhat/config";

task("quote")
    .setAction(async (args, hre) => {
      const aggregator = (await hre.ethers.getContractAt("Aggregator", 
      '0x83B7fBEB91a7db7D90E75A8dB27D2ec6B51E19cB'))

      const result = await aggregator.quote(100, 
        '0xa229fCf9cfa171BeB7c23a37faF82FF5459868d6', 
        '0xC6aD70F2a8D583620C1631D81f2b1Da587029fc8', 
        {gasLimit: 300000});

      console.log("max amountOut: " + result[0])
      console.log("router: " + result[1])
      console.log("path: " + result[2])
    });