import { useState, useEffect } from "react";  
import getBlockchain from './ethereum.js'; 
import { ethers, Contract } from 'ethers';
import "./App.css";
 
function App() {
  // Property Variables
  const contractAddress = "0x75a0634E607c6b61b9f45B9Db65B8f2c69BaA8dE";  
  const [currentAcc, setCurrentAcc] = useState("")
  const [val, setVal] = useState(0)  
  const [totalWallets, setTotalWallets] = useState([]);
  const [totalSum, setTotalSum] = useState([]);
  const [contractInstance, setContractInstance] = useState("") 
  // Helper Functions 
   
  useEffect(() => {
    const init = async () => {
       const { contractABI, signer } = await getBlockchain();
       const contractInstance = new Contract(
        contractAddress,
        contractABI ,
        signer
    );

    setContractInstance(contractInstance);
    
    const total_sum = await contractInstance.total_sum();
    setTotalSum(Number(total_sum/10000).toFixed(4));

    const total_wallets = await contractInstance.total_count();
    setTotalWallets(Number(total_wallets));

    // console.log(contractInstance);
    //    console.log('inside')
    console.log('here')
    const check_stored = await contractInstance.numbers(currentAcc,0);
    console.log(check_stored)
    };
    init();
  }, []); 
  
const setValHnadler = (e) => { 
    setVal((e.target.value*10000)); 
}

async function store()  {
    
    console.log(val);
    const { contractABI, signer } = await getBlockchain();
    
    const contractInstance = new Contract(
        contractAddress,
        contractABI ,
        signer
    );

    setContractInstance(contractInstance);
    // console.log(contractInstance);

    const tx = await contractInstance
        .newStore(val); 

    await tx.wait(); 

    const total_sum = await contractInstance.total_sum();
    setTotalSum(Number(total_sum/10000).toFixed(4));

    const total_wallets = await contractInstance.total_count();
    setTotalWallets(Number(total_wallets));
       
     
        
}

async function connectToMetamask(){
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const account = await signer.getAddress();
    setCurrentAcc(account)
    // console.log("Account:", await signer.getAddress());
  } 

  // Return
  return (
    <div className="App">
      <div className="App-header">
        {/* DESCRIPTION  */}
        <div className="description">
          <h1>Unifarm</h1>
          <p>(Network: Polygon (Mumbai testnet))</p>  
        </div> 
        {
            currentAcc === "" 
            ?
            <div className="custom-buttons">
                <button onClick={connectToMetamask} style={{ backgroundColor: "green" }}> Connect </button> 
            </div>
            : <p>Connected to : <br/>{currentAcc}</p>  
        }  
        <p>Contract Address: <br/> <a href="https://mumbai.polygonscan.com/address/0x46886549D8b68C36724D94d2c9838fFEb8aFd689" style={{textDecoration:"none", color: "orange"}}>{contractAddress}</a></p>
        <div className="custom-buttons">
            <input onChange={setValHnadler} placeholder="Enter a number" />
            <button onClick={store} style={{ backgroundColor: "red" }}>
                Store
            </button> 
        </div> 
        <p>Total No of Wallets : {totalWallets}</p>
        <p>Total Sum : {totalSum}</p>
      

        
         

        {/* Current Value stored on Blockchain */}
        {/* <h2 className="greeting">Greeting: {currentGreeting}</h2> */}
      </div>
    </div>
  );
}

export default App;