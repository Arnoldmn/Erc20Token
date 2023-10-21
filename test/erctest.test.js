const { expect } = require("chai");
const { ethers } = require("ethers");

describe("ERC20 Token Contract", function () {
  let Erc20Token;
  let erc20Token;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    Erc20Token = await ethers.getContractFactory("Erc20Token");
    [owner, addr1, addr2] = await ethers.getSigners();
    erc20Token = await Erc20Token.deploy("MyToken", "MTK", 18, ethers.utils.parseEther("1000000"));
    await erc20Token.deployed();
  });

  it("Should deploy with correct initial values", async function () {
    expect(await erc20Token.name()).to.equal("MyToken");
    expect(await erc20Token.symbol()).to.equal("MTK");
    expect(await erc20Token.decimals()).to.equal(18);

    const totalSupply = await erc20Token.totalSupply();
    expect(totalSupply).to.equal(ethers.utils.parseEther("1000000"));

    const ownerBalance = await erc20Token.balanceOf(owner.address);
    expect(ownerBalance).to.equal(ethers.utils.parseEther("1000000"));
  });

  it("Should allow transfers between accounts", async function () {
    const amount = ethers.utils.parseEther("1000");

    await erc20Token.transfer(addr1.address, amount);
    const addr1Balance = await erc20Token.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(amount);

    await erc20Token.connect(addr1).transfer(addr2.address, amount);
    const addr2Balance = await erc20Token.balanceOf(addr2.address);
    expect(addr2Balance).to.equal(amount);
  });

  it("Should update balances after transfers", async function () {
    const amount = ethers.utils.parseEther("1000");

    await erc20Token.transfer(addr1.address, amount);
    await erc20Token.connect(addr1).transfer(addr2.address, amount);

    const ownerBalance = await erc20Token.balanceOf(owner.address);
    const addr1Balance = await erc20Token.balanceOf(addr1.address);
    const addr2Balance = await erc20Token.balanceOf(addr2.address);

    expect(ownerBalance).to.equal(ethers.utils.parseEther("998000"));
    expect(addr1Balance).to.equal(0);
    expect(addr2Balance).to.equal(amount);
  });

  it("Should emit Transfer event on successful transfer", async function () {
    const amount = ethers.utils.parseEther("1000");

    await expect(erc20Token.transfer(addr1.address, amount))
      .to.emit(erc20Token, "Transfer")
      .withArgs(owner.address, addr1.address, amount);
  });

  it("Should not allow transfers exceeding balance", async function () {
    const amount = ethers.utils.parseEther("2000000");

    await expect(erc20Token.transfer(addr1.address, amount)).to.be.revertedWith("Insufficient balance");
  });
});
