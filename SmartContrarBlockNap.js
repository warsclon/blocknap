const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');
const propertiesRaw = fs.readFileSync('properties.json');
const pro = JSON.parse(propertiesRaw);

console.log("provider:"+pro.host)
var web3 = new Web3(new Web3.providers.HttpProvider(pro.host));
console.log("web3_version:"+web3.version);

exports.openAccount = function openAccount() {
    const account = web3.eth.accounts.privateKeyToAccount('0x' + pro.private);
    web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = account.address;
    console.log("account.address:https://ropsten.etherscan.io/address/"+account.address)
    console.log("gas:"+web3.utils.hexToNumber(pro.gas)+" Limit")
    console.log("gasPrice:"+web3.utils.hexToNumber(pro.gasPrice)+" Wei")
}


exports.process = function process(info, res) {
    var compile = compileSol();
    newContract(info,res,compile);
}

function compileSol() {


    var dateInit = new Date();
    console.log("> Compiling new contract")
    var compile = {};
    var input = fs.readFileSync(pro.fileSol);
    var output = solc.compile(input.toString(), 1);
    var dateEnd = new Date();
    console.log("> End compiling contract:"+(dateEnd - dateInit) / 1000+ "seconds");
    var contract = output.contracts;
    var bytecode = contract[pro.nameSC].bytecode;
    var abi = JSON.parse(contract[pro.nameSC].interface);
    console.log("abi:"+contract[pro.nameSC].interface);
    compile.abi = abi;
    compile.bytecode = bytecode;
    return compile;
}


function newContract(info, res, compile) {
    var dateInit = new Date();
    console.log("> Creating new contract")
    const contract = new web3.eth.Contract(compile.abi);
    contract.deploy({
        data: '0x' + compile.bytecode,
        arguments: [info.date, info.issuer,info.receiver,info.subject]
    })
        .send({
            from: web3.eth.defaultAccount,
            gas: pro.gas,
            gasPrice: pro.gasPrice
        })
        .on('error', function(error){
            res.json({'address':'','status':'ERROR','error':error})
        })
        .then(function(newContractInstance){
            var contractAdress = newContractInstance.options.address;
            var dateEnd = new Date();
            console.log("> End creating contract:"+(dateEnd - dateInit) / 1000+ "seconds");
            console.log("contract:https://ropsten.etherscan.io/address/"+contractAdress);
            res.json({'address':contractAdress,'status':'OK','error':''})

        });
}