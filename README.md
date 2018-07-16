# BlockNap
# Version 0.0.1

 1.Create account in https://infura.io/
    
 2.Create wallet in https://www.myetherwallet.com/
    
 3.Get ether in http://faucet.ropsten.be:3001/
    
 4.Clone repository.
    
 5.Install nodeJS libraries. Execute "npm install" in folder.
    
 6.Edit configuration file

 - ADDRESS_WALLET = Address of wallet create
 - PRIVATE_KEY_WALLET = Private key of wallet
 - PRIVATE_KEY_INFURA = Private key of infura

> {
>     "account":"ADDRESS_WALLET", 
>     "private":"PRIVATE_KEY_WALLET",
>     "fileSol":"test.sol", //smart contract file to load
>     "nameSC": ":BlockNapTEST", //name of smart contract
>     "host": "https://ropsten.infura.io/PRIVATE_KEY_INFURA",
>     "gas": "0xee3a8",
>     "gasPrice": "0x12a05f200"
>      }


7.Execute init.sh
