
import Web3 from 'web3';
import contractABI from '../assets/contractABI.json'
import { sendTransaction, readContract  } from '@wagmi/core'


const contractAddress = '0x4B214177d0a205FAc8D3d2910146F7290bd619F5';
const web3 = new Web3();
const contract = new web3.eth.Contract(contractABI, contractAddress);

export const getAllPixels = async () => {
  try {

    let pixels = await readContract({
      address: contractAddress,
      abi: contractABI,
      functionName: 'getAllPixels',
    })

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


