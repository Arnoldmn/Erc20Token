const Erc20Token = require("Erc20Token");

Contract('Erc20', (accouts) => {
    let ercInstance;

    before(async () => {
        ercInstance = await Erc20Token.deployed();

    });

    it('Should have the correct name, symbol, and decimal', async () => {
        const name = await ercInstance.name();
        const symbol = await ercInstance.symbol();
        const decimals = await ercInstance.decimals();

        assert.equal(name, 'YourTokenname', 'Incorrect name');
        assert.equal(symbol,'SYM', 'Incorrect symbol');
        assert.equal(decimals, 18, 'Incorrect decimals');
    })
})