import { useParams } from "react-router-dom";

import { NFT, ThirdwebSDK } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
import smartWallet from "./SmartWallets";
import { activeChain, NFTDROP_ADDRESS } from "../utils/constants";

type Props = {
    nft: NFT
}


export default function Token() {
    const params = useParams();
    const { tokenId } = params;
    const [smartWalletAddress, setSmartWalletAddress] = useState<string | null>(
        null
    );
    const [nftList, setNftList] = useState<any[] | null>(null)

    useEffect(() => {
        const createSmartWallet = async () => {
            const sdk = new ThirdwebSDK(activeChain)
            const contract = await sdk.getContract(NFTDROP_ADDRESS)
            if (tokenId && smartWalletAddress == null) {
                const nft = await contract.erc721.get(tokenId)
                const [smartResult, smartNFTS] = await smartWallet(nft)
                setSmartWalletAddress(smartResult) 
                setNftList(smartNFTS[0].ownedNfts) 
            }
            
        }
        createSmartWallet()
    }, [tokenId, smartWalletAddress])


console.log(nftList)
return (
    <>
    <h1>Token 11 {tokenId}</h1>
    <div>
        {nftList && nftList.length > 0 
        ? (
            nftList.map((nft) => {
                return (
                    <div key={nft.tokenId}>
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
