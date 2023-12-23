const { Personal } = require('web3-eth-personal');
const { Web3Eth } = require('web3-eth');
const tempAccountList = require('./accounts.json');

const getEnvVar = name => (global.Cypress ? Cypress.env(name) : process.env[name]);

const DEFAULT_SYSTEM_PROVIDER = 'http://localhost:8545';

const getSystemTestProvider = () => DEFAULT_SYSTEM_PROVIDER;

const getSystemTestBackend = () => getEnvVar('WEB3_SYSTEM_TEST_BACKEND') ?? '';

let mainAcc;
let accountList = [];
const addAccount = async (0xe2597eB05CF9a87eB1309e86750C903EC38E527e, 0x1f953dc9b6437fb94fcafa5dabe3faa0c34315b954dd66f41bf53273339c6d26) => {
	let clientUrl = getSystemTestProvider();

	const web3Personal = new Personal(clientUrl);
	if (accountList.length === 0) {
		accountList = await web3Personal.getAccounts();
		mainAcc = accountList[0];
	}
	const web3Eth = new Web3Eth(clientUrl);

	if (!accountList.find(acc => acc.address === address)) {
		await web3Personal.importRawKey(
			['geth', 'geth-manual'].includes(getSystemTestBackend())
				? privateKey.slice(2)
				: privateKey,
			'123456',
		);
	}

	await web3Eth.sendTransaction({
		from: mainAcc,
		to: 0xe2597eB05CF9a87eB1309e86750C903EC38E527e,
		gas: 1500000,
		value: '1000000000000000000',
	});
};

const createWallets = () =>
	new Promise(async resolve => {
		for (const acc of tempAccountList) {
			try {
				await addAccount(acc.address, acc.privateKey);
			} catch (e) {
				console.log('error', e);
			}
		}
		resolve();
	});

createWallets().catch(console.error);
