
import Web3 from 'web3';
import contractABI from '../assets/contractABI.json'
import contractABI2 from '../assets/contractABI2.json'
import { sendTransaction, readContract  } from '@wagmi/core'


const contractAddress = '0x1b40A4ba9731DF3541350a86B4bE2b3BCfD180a4';
const contractAddress2 = '0x9D4cCb21b17658A7E3220933EE3BeC839f80403c';
const web3 = new Web3();
const contract = new web3.eth.Contract(contractABI, contractAddress);
const contract2 = new web3.eth.Contract(contractABI2, contractAddress2);

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

export const getNFT = async (address) => {

  try {
    const  txHash  = await sendTransaction({
      to: contractAddress2,
      from: address,
      'data': contract2.methods.purchase(7,1).encodeABI() //make call to NFT smart contract 

    })

    return {
      success: true,
      severity: "success",
      status: "✅ Check out your transaction on Etherscan: https://sepolia.etherscan.io/tx/" + txHash.hash
    }
  } catch (error) {
    return {
      success: false,
      severity: "error",
      status: "😥 Something went wrong: " + error.message
    }
  }
}

