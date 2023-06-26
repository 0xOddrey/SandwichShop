import { activeChain, NFTDROP_ADDRESS } from "../../../const/constants";
import { Signer } from "ethers";
import { useAddress, useWallet } from "@thirdweb-dev/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { NFT } from "@thirdweb-dev/sdk";
import { useEffect, useState } from "react";
import newSmartWallet from '../../../components/SmartWallet/SmartWallets'
import SmartWalletConnected from "../../../components/SmartWallet/SmartWalletConnected";

type Props = {
    nft: NFT
}

export default function Token({ nft }: Props) {
    const [smartWalletAddress, setSmartWalletAddress] = useState<string | null>(
        null
      );
    const [signer, setSigner] = useState<Signer>()

    const address = useAddress()
    const wallet = useWallet()

    useEffect(() => {
        const createSmartWallet = async (nft: NFT) => {
            if (nft && smartWalletAddress == null && address && wallet) {
                const smartWallet = newSmartWallet(nft)
                console.log('line 28', smartWallet)
                await smartWallet.connect(
                   {personalWallet: wallet}
                )
                setSigner(await smartWallet.getSigner())
                setSmartWalletAddress(await smartWallet.getAddress())    
                return smartWallet
            } else {
                console.log(smartWalletAddress)
            }
        }
        createSmartWallet(nft)
    }, [nft, smartWalletAddress, address, wallet])
    return (
        <>
        <div className="flex flex-col items-center justify-center">
            {nft && (
                <>
                <h1>{nft.metadata.name}</h1>
                <p>{nft.metadata.id}</p>
                </>
            )}
             {smartWalletAddress 
                ? (
                    <SmartWalletConnected 
                    signer={signer}/>
                    )
                : (
                    <p>Loading...</p>
                )}
        </div>
        </>
    )
}


export const getStaticProps: GetStaticProps = async (context) => {

    const tokenId = context.params?.tokenId as string;
    const sdk = new ThirdwebSDK(activeChain)
    const contract = await sdk.getContract(NFTDROP_ADDRESS)
    const nft = await contract.erc721.get(tokenId)
    return {
        props: {
            nft
        },
        revalidate: 1

    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const sdk = new ThirdwebSDK(activeChain)
    const contract = await sdk.getContract(NFTDROP_ADDRESS)
    const nfts = await contract.erc721.getAll()
    const paths = nfts.map((nft) => ({
        params: {
            contract: NFTDROP_ADDRESS,
            tokenId: nft.metadata.id
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}