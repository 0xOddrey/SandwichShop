import { useParams } from "react-router-dom";

import { NFT, ThirdwebSDK } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
import smartWallet from "./SmartWallets";
import { activeChain, NFTDROP_ADDRESS } from "../utils/constants";

type Props = {
    nft: NFT
}

function matchIngredients(requriedNFTs: any[], ownedNFTs: any[]){
    const matchedNFTs: any[] = []
    const requiredNFTs: any[] = []
    if (ownedNFTs != null && requriedNFTs.length > 0) {
        ownedNFTs.forEach((ownedNFT) => {
            requiredNFTs.push(ownedNFT.value)
        })
        requriedNFTs.forEach((requriedNFT) => {
            console.log('line 20', requriedNFT.balance)
            for (let i = 0; i < requriedNFT.balance; i++) {
                matchedNFTs.push(requriedNFT.title.toLowerCase())
            }
        })
    }

    let overlap = matchedNFTs.filter(function(v,i,a){
        return requiredNFTs.indexOf(v) > -1;
      });
    
    if (overlap.length == 4) {
        return true
    } else {
        return false
    }
    

}

export default function Token() {
    const params = useParams();
    const newToken = parseInt(params.tokenId || '0') - 1
    const tokenId  = newToken

    const [smartWalletAddress, setSmartWalletAddress] = useState<string | null>(
        null
    );
    const [nftList, setNftList] = useState<any[] | null>(null)
    const [smartNFT, setSmartNFT] = useState<NFT | null>(null)
    const [completed, setCompleted] = useState(false)
    useEffect(() => {
        const createSmartWallet = async () => {
            const sdk = new ThirdwebSDK(activeChain)
            const contract = await sdk.getContract(NFTDROP_ADDRESS)
            if (tokenId && smartWalletAddress == null) {
                const nft = await contract.erc721.get(tokenId)
                setSmartNFT(nft)
                const [smartResult, smartNFTS] = await smartWallet(nft)
                setSmartWalletAddress(smartResult) 
                setNftList(smartNFTS[0].ownedNfts) 
               
            }
            
        }
        createSmartWallet()
        const results = matchIngredients(nftList as any[], smartNFT?.metadata.attributes as any[])
        setCompleted(results)
    }, [tokenId, smartWalletAddress])



return (
    <>
    <h1 className="text-3xl mx-4 my-4">Order {tokenId + 1}</h1>
    {completed ? (
         <div className="bg-green-500 text-black px-11 py-11">
         <p>Completed: TRUE</p>
     </div>
        ) 
    : (
        <div className="bg-white bg-red-200 text-black px-11 py-11">
        <p>Completed: FALSE</p>
        </div>
        )}
 
    <div>
        {nftList && nftList.length > 0 
        ? (
            nftList.map((nft) => {
                return (
                    <div className="mx-11 mt-4 py-2 px-11 bg-gray-800" key={nft.tokenId}>
                        <p>{nft.title}</p>
                        <p>QTY: {nft.balance}</p>
                    </div>
                )
            })
        )
        : (<p>No NFTs</p>)}
    </div>
    </>
    );
}
