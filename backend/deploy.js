const fs = require('fs');
const Web3 = require('web3');

const abi = JSON.parse(fs.readFileSync("C:\\Users\\parth\\OneDrive\\Documents\\Programs and Projects\\Blockchain-Based-PHR-System\\backend\\contracts\\Cruds.abi"));
const bytecode = fs.readFileSync("C:\\Users\\parth\\OneDrive\\Documents\\Programs and Projects\\Blockchain-Based-PHR-System\\backend\\contracts\\Cruds.bin").toString();

const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

async function deploy() {
    let contract = new web3.eth.Contract(abi);
    contract = contract.deploy({data: bytecode});

    const deployContract = await contract.send({
        from: "0xbeB6177E21f52f80349156042C605662d9c70919",
        gas: "6721975",
    })
    console.log(deployContract.options.address);
}  

deploy();
