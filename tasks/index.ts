import { task } from "hardhat/config";

task("quote")
    .setAction(async (args, hre) => {
        const aggregator = (await hre.ethers.getContractAt("Aggregator",
            '0x02Fa77FE15C8A52B29dbb383228caeCC2D673EbE'))
        const result = await aggregator.quote('10000',
            '0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684',
            '0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7',
            { gasLimit: 300000 });
        console.log("max amountOut: " + result[0])
        console.log("router: " + result[1])
        console.log("path: " + result[2])
    });

task("swap")
    .setAction(async (args, hre) => {
        const aggregator = (await hre.ethers.getContractAt("Aggregator",
            '0x02Fa77FE15C8A52B29dbb383228caeCC2D673EbE'))
        const path = ['0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684', '0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7'];
        const router = '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3';
        const erc20 = (await hre.ethers.getContractAt("IERC20",
            '0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684'))
        await erc20.approve("0x02Fa77FE15C8A52B29dbb383228caeCC2D673EbE", "10500");
        await aggregator.swap(10500, 9700, router, path);
        console.log("swaped")
    });
