import { ThirdwebSDKProvider, useAddress, Web3Button, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { Signer } from "ethers";
import { activeChain, EDITIONDROP_ADDRESS } from "../../const/constants";
import Image from 'next/image'
import Link from 'next/link'
interface ConnectedProps {
    signer: Signer | undefined
}

const SmartWalletConnected: React.FC<ConnectedProps> = ({ signer }) => {


    return (
        <>
            <ThirdwebSDKProvider signer={signer} activeChain={activeChain}>
                <ClaimTokens />
            </ThirdwebSDKProvider>
        </>
    )
}

const ClaimTokens = () => {
    const address = useAddress()
    const {
        contract
    } = useContract(EDITIONDROP_ADDRESS)
    const {
        data: ownedNFTS,
        isLoading: ownedNFTsisLoading
    } = useOwnedNFTs(contract, address)


    return (
        <div>
            <div className="mb-4  px-11 py-2">
            <Link className="bg-white text-black mb-4  px-11 py-2" href="/">Back to Home</Link>
            </div>
            
            <p>Smart Wallet Address {address}</p>
            <a href="https://testnets.opensea.io/collection/0xoddrey-s-burger-joint" target="_blank" >View Orders on OpenSea</a>
            {ownedNFTsisLoading 
            ? (<p>Loading...</p>) 
            : (
                <div className="bg-gray-700 mx-11 my-11 px-4 py-4">
                    {ownedNFTS && ownedNFTS.length > 0 
                    ? (
                        ownedNFTS.map((nft) => {
                            return (
                                <div key={nft.metadata.id}>
                                    <p>{nft.metadata.name} - QTY: {nft.quantityOwned}</p>
                                </div>
                            )
                        })
                    )
                    : (<p>No NFTs</p>)}
                </div>
            )}
            <div className="columns-2 py-4 px-4 border-white border-2">
            <Image src="/ingredients/11.png" alt="me" width="150" height="150" />
                <Web3Button
                contractAddress={EDITIONDROP_ADDRESS}
                action={(contract) => contract.erc1155.claim(0, 1)}
                >Add Tomatoes</Web3Button>
            </div>
            <div className="columns-2 py-4 px-4 border-white border-2">
                <Image src="/ingredients/12.png" alt="me" width="150" height="150" />
                <Web3Button
                contractAddress={EDITIONDROP_ADDRESS}
                action={(contract) => contract.erc1155.claim(1, 1)}
                >Add Cheese</Web3Button>
            </div>
            <div className="columns-2 py-4 px-4 border-white border-2">
                <Image src="/ingredients/13.png" alt="me" width="150" height="150" />
                <Web3Button
                contractAddress={EDITIONDROP_ADDRESS}
                action={(contract) => contract.erc1155.claim(2, 1)}
                >Add Ham</Web3Button>
            </div>
            <div className="columns-2 py-4 px-4 border-white border-2">
                <Image src="/ingredients/14.png" alt="me" width="150" height="150" />
                <Web3Button
                contractAddress={EDITIONDROP_ADDRESS}
                action={(contract) => contract.erc1155.claim(3, 1)}
                >Add Lettuce</Web3Button>
            </div>
            <div className="columns-2 py-4 px-4 border-white border-2">
                <Image src="/ingredients/15.png" alt="me" width="150" height="150" />
                <Web3Button
                contractAddress={EDITIONDROP_ADDRESS}
                action={(contract) => contract.erc1155.claim(4, 1)}
                >Add Bacon</Web3Button>
            </div>
            <div className="columns-2 py-4 px-4 border-white border-2">
                <Image src="/ingredients/16.png" alt="me" width="150" height="150" />
                <Web3Button
                contractAddress={EDITIONDROP_ADDRESS}
                action={(contract) => contract.erc1155.claim(5, 1)}
                >Add Patty</Web3Button>
            </div>
        </div>
    )
}

export default SmartWalletConnected