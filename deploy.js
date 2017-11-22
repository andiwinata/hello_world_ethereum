const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

// compile contract
const code = fs.readFileSync('Voting.sol').toString()
const solc = require('solc')
const compiledCode = solc.compile(code)

// deploy contract
const abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
const VotingContract = web3.eth.contract(abiDefinition)
const byteCode = compiledCode.contracts[':Voting'].bytecode
const deployedContract = VotingContract.new(['Rama', 'Nick', 'Jose'], {
	data: byteCode,
	from: web3.eth.accounts[0],
	gas: 4700000,
})
const contractInstance = VotingContract.at(deployedContract.address)