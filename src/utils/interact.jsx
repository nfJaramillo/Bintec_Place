import Web3 from 'web3';
import contractABI from '../assets/contractABI.json'
const web3 = new Web3(window.ethereum);
const contractAddress = '0x02e34659F0181D9AC2e8e012b614aa8FB3Cf9b20';
const contract = new web3.eth.Contract(contractABI, contractAddress);

export const getAllPixelsPerRow = async () => {
  try {
    const pixels = await contract.methods.getAllPixels().call()
    return pixels
  }
  catch (err) {
    return {
      address: "",
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
