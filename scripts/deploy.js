const { ethers } = require('hardhat');

async function main() {
  // Get the ContractFactory and Signers here.
  const Erc20Token = await ethers.getContractFactory('ERC20');
  const [deployer] = await ethers.getSigners();

  // Deploy the contract
  const erc20Token = await Erc20Token.deploy(
    "MyToken",
    "MTK",
    18,
    ethers.utils.parseUnits('1000000', 18)
  );

  await erc20Token.deployed();

  console.log('ERC20 Token deployed to:', erc20Token.address);
  console.log('Deployer address:', deployer.address);

  const deployerBalance = await erc20Token.balanceOf(deployer.address);
  console.log(`Balance of deployer: ${ethers.utils.formatUnits(deployerBalance, 18)} MTK`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
