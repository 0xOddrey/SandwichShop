import { ethers } from "ethers";
import { SmartWallet } from "@thirdweb-dev/wallets";
import {
  TWAPI_KEY,
  factoryAddress,
  activeChain,
  NFTDROP_ADDRESS,
  IMPLEMENTATION_ADDRESS,
  EDITIONDROP_ADDRESS
} from "../utils/constants";

import Web3 from 'web3';
var web3js = new Web3(new Web3.providers.HttpProvider('https://polygon-mumbai.g.alchemy.com/v2/mkWadI2ogZ3dw2tsjF3o7hN3h3hlZXaU'));
import { Network, Alchemy } from "alchemy-sdk";



const abi: any[] = [
    {"inputs":[{"internalType":"address","name":"implementation","type":"address"},{"internalType":"uint256","name":"chainId","type":"uint256"},{"internalType":"address","name":"tokenContract","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"salt","type":"uint256"}],"name":"account","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}
]

export default async function smartWallet(token: NFT) {
    let nftList: any[] = []
    let contractWeb3 = new web3js.eth.Contract(abi, factoryAddress);
    let smartWalletAddress = await contractWeb3.methods.account(
      IMPLEMENTATION_ADDRESS,
      activeChain.chainId,
      NFTDROP_ADDRESS,
      token.metadata.id,
      0
    ).call();

    const settings = {
        apiKey: "mkWadI2ogZ3dw2tsjF3o7hN3h3hlZXaU",
        network: Network.MATIC_MUMBAI,
    };
    
    const alchemy = new Alchemy(settings);
    const nfts = await alchemy.nft.getNftsForOwner(smartWalletAddress)
    nftList.push(nfts)
    return [smartWalletAddress, nftList];
  }




