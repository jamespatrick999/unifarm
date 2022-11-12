import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers'; 

// Import ABI Code to interact with smart contract 
const contractABI =  require('./abis/Unifarm.json');

const getBlockchain = () =>
  new Promise( async (resolve, reject) => {

    let provider = await detectEthereumProvider();
    let flag = false;
    if(provider && flag === false) {
      flag = true;
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
       // console.log(currentAcc )
      // console.log(contractAddress )
      // console.log(contractABI  )
      provider = new ethers.providers.Web3Provider(provider);
      const signer = provider.getSigner();
      // console.log(signer.address )
	  //  const contractInstance = new Contract(
    //   contractAddress,
    //   contractABI ,
    //   signer
	  //  );
    //  console.log(contractInstance)
    
    //  console.log(contractInstance.on("NewStake" , ()))
     resolve({ signer, contractABI  }); 

      return;
    }
    reject('Install/Use Web3 provider like Metamask or Trust Wallet ');
  });

export default getBlockchain;
