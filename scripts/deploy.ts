import { ethers } from "hardhat";

async function main() {
  const Aggregator = await ethers.getContractFactory("Aggregator");
  const aggregator = await Aggregator.deploy(
    [
      '0xD99D1c33F9fC3444f8101754aBC46c52416550D1', '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3',
      '0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F', '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506'],
    [
      '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd', '0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684',
      '0x8BaBbB98678facC7342735486C851ABD7A0d17Ca', '0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7',
      '0x8a9424745056Eb399FD19a0EC26A14316684e274', '0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F',
      '0x094616F0BdFB0b526bD735Bf66Eca0Ad254ca81F'
    ]
  );

  await aggregator.deployed();

  console.log("address: ", aggregator.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
