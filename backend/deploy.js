const fs = require('fs');
const Web3 = require('web3');

const abi = JSON.parse(fs.readFileSync("C:\\Users\\parth\\OneDrive\\Documents\\Programs and Projects\\Blockchain-Based-PHR-System\\backend\\contracts\\Cruds.abi"));
const bytecode = fs.readFileSync("C:\\Users\\parth\\OneDrive\\Documents\\Programs and Projects\\Blockchain-Based-PHR-System\\backend\\contracts\\Cruds.bin").toString();

const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

async function deploy() {
    let contract = new web3.eth.Contract(abi);
    contract = contract.deploy({data: bytecode});

    const deployContract = await contract.send({
        from: "0x41E169591Ae9705E0dF6335390d83f9C7B3E854a",
        gas: "6721975",
    });

    const deployedAddress = deployContract.options.address;
    console.log("Deployed Contract Address:", deployedAddress);

    // Read contract.json
    const contractJsonPath = "C:\\Users\\parth\\OneDrive\\Documents\\Programs and Projects\\Blockchain-Based-PHR-System\\app\\src\\contracts\\contract.json";
    const contractJson = JSON.parse(fs.readFileSync(contractJsonPath));

    // Update address field in contract.json
    contractJson.address = deployedAddress;

    // Write updated contract.json back to file
    fs.writeFileSync(contractJsonPath, JSON.stringify(contractJson, null, 2));

    console.log("Updated contract.json with deployed address.");
}

deploy();
