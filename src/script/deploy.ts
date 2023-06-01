import { Provider, Account, Contract, ec, json, stark, uint256, shortString } from "starknet";
import fs from 'fs';

async function deploy() {
    // connect provider
    const provider = new Provider({ sequencer: { network: "goerli-alpha" } });
    // connect your account. To adapt to your own account :
    const privateKey0 = process.env.ACCOUNT_PRIVATE_KEY;
    const account0Address: string = "0x04d0c90a094dea4fc9490ab6dba8308c7753a4f48619b6515a7b2b4dffc03fa7";

    const starkKeyPair0 = ec.getKeyPair(privateKey0);
    const account0 = new Account(provider, account0Address, starkKeyPair0);
    
    // Declare & deploy Test contract in devnet
    // ClassHash has been calculated previously with specific tool
    const testClassHash = "0x19696a84e2368147f9d76b4b8424eac9a292b0fa4b29c3fce164adbcd9be04";
    const compiledTest = json.parse(fs.readFileSync("./build/erc20.json").toString("ascii"));
    const deployResponse = await account0.declareDeploy({ contract: compiledTest, classHash: testClassHash });

    // Connect the new contract instance :
    const myTestContract = new Contract(compiledTest.abi, deployResponse.deploy.contract_address, provider);
    console.log('✅ Test Contract connected at =', myTestContract.address);
}

deploy();
