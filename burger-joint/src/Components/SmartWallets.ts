

import { NFT } from "@thirdweb-dev/sdk";

import {
  factoryAddress,
  activeChain,
  NFTDROP_ADDRESS,
  IMPLEMENTATION_ADDRESS,
} from "../utils/constants";
import { Network, Alchemy } from "alchemy-sdk";
import Web3 from 'web3';
var web3js = new Web3(new Web3.providers.HttpProvider('https://polygon-mumbai.g.alchemy.com/v2/mkWadI2ogZ3dw2tsjF3o7hN3h3hlZXaU'));


export default async function smartWallet(token: NFT) {
    let nftList: any[] = []
    var contractWeb3 = new web3js.eth.Contract([
            {"inputs":[
                {"internalType":"address","name":"implementation","type":"address"},
                {"internalType":"uint256","name":"chainId","type":"uint256"},
                {"internalType":"address","name":"tokenContract","type":"address"},
                {"internalType":"uint256","name":"tokenId","type":"uint256"},
                {"internalType":"uint256","name":"salt","type":"uint256"}
                    ],
            "name":"account",
            "outputs":[
                {"internalType":"address","name":"","type":"address"}
                ],
            "stateMutability":"view","type":"function"}
        ], factoryAddress);
    console.log(contractWeb3)
  
    const smartWalletAddress = await contractWeb3.methods.account(
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
    const nfts = await alchemy.nft.getNftsForOwner(smartWalletAddress as unknown as string)
    nftList.push(nfts)
    return [smartWalletAddress, nftList];
  }




