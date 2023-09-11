import { Alchemy, Network } from "alchemy-sdk";
import contractABI from '../assets/contractABI.json'
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

const contractAddress = '0x4B214177d0a205FAc8D3d2910146F7290bd619F5';
const web3 = createAlchemyWeb3("https://eth-sepolia.g.alchemy.com/v2/MZOFtJq4vlHU3MlvX7nCWJjtvEijsfDw");
const contract = await new web3.eth.Contract(contractABI, contractAddress);//loadContract();

const settings = {
  apiKey: 'MZOFtJq4vlHU3MlvX7nCWJjtvEijsfDw',
  network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);

export const getAllPixels = async () => {

  try {
    let tx = {
      to: contractAddress,
      data: contract.methods.getAllPixels().encodeABI(),
    }
    let pixels = await alchemy.core.call(tx)
    let type = contract.methods.getAllPixels()._method.outputs[0].type
    pixels = web3.eth.abi.decodeParameter(type, pixels)
    return pixels
  }
  catch (err) {
    console.log(err)
  }
}


export const setPixelColor = async (x, y, color) => {
  try {
    //Transaction set up
    const transactionParameters = {
      to: contractAddress,
      from: window.ethereum.selectedAddress,
      'data': contract.methods.setPixelColor(x, y, color).encodeABI() //make call to NFT smart contract 
    };

    //sign transaction via Metamask
    const txHash = await window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
    return {
      success: true,
      severity: "success",
      status: "✅ Check out your transaction on Etherscan: https://sepolia.etherscan.io/tx/" + txHash
    }
  }
  catch (err) {
    return {
      success: false,
      severity: "error",
      status: "😥 " + err.message,
    };
  }
}


export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "Billetera conectada"
        ,
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        severity: "error",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      severity: "warning",
      status: (
        <div>
          {" "}
          🦊{" "}
          <a target="_blank" rel="noopener noreferrer" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </div>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        severity: "error",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      severity: "warning",
      status: (
        <div>
          {" "}
          🦊{" "}
          <a target="_blank" rel="noopener noreferrer" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </div>
      ),
    };
  }
};
