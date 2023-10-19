const Erc20Token = require("Erc20Token");

Contract('Erc20', (accouts) => {
    let erc20Instance;

    before(async () => {
        erc20Instance = await Erc20Token.deployed();

    });

    it('Should have the correct name, symbol, and decimal', async () => {
        const name = await erc20Instance.name();
        const symbol = await erc20Instance.symbol();
        const decimals = await erc20Instance.decimals();

        assert.equal(name, 'YourToken', 'Incorrect name');
        assert.equal(symbol,'SYM', 'Incorrect symbol');
        assert.equal(decimals, 18, 'Incorrect decimals');


    });

    it('should correctly mint initial supply to the deployer', async () => {
        const totalSupply = await erc20Instance.totalSupply();
        balanceOfDeployer = await erc20Instance.balanceOf(accouts[0]);

        assert.equal(totalSupply.toString(), '1000000000000000000000', 'Incorrect total supply');
        assert.equal(balanceOfDeployer.toString(), '1000000000000000000000', 'Incorrect balance for deployer');

    });

    it('should transfer tokens correctly', async () => {
        const amount = Web3.utils.toBN('1000000000000000000');

        await erc20Instance.approve(accounts[2], amount, { from: accounts[0] });
        await erc20Instance.transferFrom(accounts[0], accounts[3], amount, { from: accounts[2] });
    
        const balanceOfSender = await erc20Instance.balanceOf(accounts[0]);
        const balanceOfReceiver = await erc20Instance.balanceOf(accounts[3]);

        assert.equal(balanceOfSender.toString(), '999000000000000000000', 'Incorrect balance for sender');
        assert.equal(balanceOfReceiver.toString(), '1000000000000000000', 'I')
    });

    it('should approve and transferFrom tokens correctly', async () => {
        const amount = web3.utils.toBN('1000000000000000000'); // 1 token

        await erc20Instance.approve(accounts[2], amount, { from: accounts[0] });
        await erc20Instance.transferFrom(accounts[0], accounts[3], amount, { from: accounts[2] });

        const balanceOfSender = await erc20Instance.balanceOf(accounts[0]);
        const balanceOfReceiver = await erc20Instance.balanceOf(accounts[3]);

        assert.equal(balanceOfSender.toString(), '998000000000000000000', 'Incorrect balance for sender');
        assert.equal(balanceOfReceiver.toString(), '1000000000000000000', 'Incorrect balance for receiver');


    });

    it('should return correct allowance after approval', async () => {
        const amount = Web3.utils.toBN('1000000000000000000');

        await erc20Instance.approve(accounts[2], amount, {from: accounts[0]});

        const allowance = await erc20Instance.allowance(accounts[0], accounts[2]);

        assert.equal(allowance.toString(), '1000000000000000000', 'Incorrect allowance');
    })
})