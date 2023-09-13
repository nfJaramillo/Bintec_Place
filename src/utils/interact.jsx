import { Alchemy, Network } from "alchemy-sdk";
import contractABI from '../assets/contractABI.json'
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { sendTransaction } from '@wagmi/core'


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


export const setPixelColor = async (x, y, color, address) => {
  try {
    const  txHash  = await sendTransaction({
      to: contractAddress,
      from: address,
      'data': contract.methods.setPixelColorAdmin(x, y, color).encodeABI() //make call to NFT smart contract 

    })
    console.log(txHash)
    return {
      success: true,
      severity: "success",
      status: "✅ Check out your transaction on Etherscan: https://sepolia.etherscan.io/tx/" + txHash.hash
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


