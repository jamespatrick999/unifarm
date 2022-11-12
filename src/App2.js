import { useState, useEffect } from "react"; 
import getBlockchain from './ethereum.js';
import { ethers, Contract } from 'ethers';
import "./App.css";
 
function App() {
  // Property Variables

  const [currentAcc, setCurrentAcc] = useState("")
  const [val, setVal] = useState(0)
  const [contractAddress, setContractAddress] = useState("")
  const [contractInstance, setContractInstance] = useState("") 
  // Helper Functions

//   useEffect(() => {
//     const init = async () => {
      
//       const { contractAddress, contractInstance, currentAcc } = await getBlockchain();
//       setCurrentAcc(currentAcc)
//       setContractAddress(contractAddress)
//       setContractInstance(contractInstance)
//       // console.log(currentAcc);
//       // console.log(contractAddress);
//       // console.log(contractInstance);
//       // const hasMinted = await contractInstance.hasMinted(currentAcc);
//       // setMinted(hasMinted)
//       // console.log(hasMinted)

//       // const tokenId = await contractInstance.uriTokenIDMap(currentAcc);
//       // const tokenURI_ = await contractInstance.tokenURI(tokenId);
//       // setTokenURI("0x"+tokenURI_) 
       
//     };
//     init();
//   }, []); 
  
const setValHnadler = (e) => { 
    setVal((e.target.value*10000).toFixed(4));
    console.log(val);
}

async function connectToMetamask(){
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
}

   
async function store(val)  {

    const { contractInstance } = await getBlockchain();
    setContractInstance(contractInstance);

    const tx = await contractInstance
        .newStore(val); 

        await tx.wait();  
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
         
        <div className="custom-buttons">
          <p>Contract Address: <a href="https://mumbai.polygonscan.com/address/0x46886549D8b68C36724D94d2c9838fFEb8aFd689" style={{textDecoration:"none", color: "orange"}}>{contractAddress}</a></p>
          <p>Address: {currentAcc}</p> 
            <div>
                <input onChange={setValHnadler} placeholder="Enter a number" />
                <button onClick={store(val)} style={{ backgroundColor: "red" }}>
                  Store
                </button>
                 
            </div>
            <button onClick={connectToMetamask}>Connect </button> 
        </div> 
         

        {/* Current Value stored on Blockchain */}
        {/* <h2 className="greeting">Greeting: {currentGreeting}</h2> */}
      </div>
    </div>
  );
}

export default App;