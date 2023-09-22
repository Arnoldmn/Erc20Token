const { ethers, upgrades } = require("hardhat");

async function main() {
  const Erc20Token = await ethers.getContractFactory("Erc20Token");

  const erc20Token = await upgrades.deployProxy(Erc20Token, ["Mumbex","MNA", 18, 1000000]);

  await erc20Token.deployed();
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
