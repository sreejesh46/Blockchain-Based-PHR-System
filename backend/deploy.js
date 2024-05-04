const fs = require('fs');
const Web3 = require('web3');

const abi = JSON.parse(fs.readFileSync("C:\\Users\\parth\\OneDrive\\Documents\\Programs and Projects\\Blockchain-Based-PHR-System\\backend\\contracts\\Cruds.abi"));
const bytecode = fs.readFileSync("C:\\Users\\parth\\OneDrive\\Documents\\Programs and Projects\\Blockchain-Based-PHR-System\\backend\\contracts\\Cruds.bin").toString();

const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

async function deploy() {
    let contract = new web3.eth.Contract(abi);
    contract = contract.deploy({data: bytecode});

    const deployContract = await contract.send({
        from: "0xCaa61b239DEE0F57308a03Ee32BC13A2d3da9D8F",
        gas: "6721975",
    })
    console.log(deployContract.options.address);
}  

deploy();
