import { ThirdwebSDKProvider, useAddress, Web3Button, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { Signer } from "ethers";
import { activeChain, EDITIONDROP_ADDRESS } from "../../const/constants";


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
            <p>Smart Wallet Address {address}</p>
            <h1>Claim Tokens</h1>
            {ownedNFTsisLoading 
            ? (<p>Loading...</p>) 
            : (
                <div>
                    {ownedNFTS && ownedNFTS.length > 0 
                    ? (
                        ownedNFTS.map((nft) => {
                            return (
                                <div key={nft.metadata.id}>
                                    <p>{nft.metadata.name}</p>
                                    <p>QTY: {nft.quantityOwned}</p>
                                </div>
                            )
                        })
                    )
                    : (<p>No NFTs</p>)}
                </div>
            )}
            <Web3Button
            contractAddress={EDITIONDROP_ADDRESS}
            action={(contract) => contract.erc1155.claim(0, 1)}
            >Add Tomatoes</Web3Button>
            <br />
             <Web3Button
            contractAddress={EDITIONDROP_ADDRESS}
            action={(contract) => contract.erc1155.claim(1, 1)}
            >Add Cheese</Web3Button>
            <br />
             <Web3Button
            contractAddress={EDITIONDROP_ADDRESS}
            action={(contract) => contract.erc1155.claim(2, 1)}
            >Add Ham</Web3Button>
            <br />
            <Web3Button
            contractAddress={EDITIONDROP_ADDRESS}
            action={(contract) => contract.erc1155.claim(3, 1)}
            >Add Lettuce</Web3Button>
            <br />
             <Web3Button
            contractAddress={EDITIONDROP_ADDRESS}
            action={(contract) => contract.erc1155.claim(4, 1)}
            >Add Bacon</Web3Button>
            <br />
            <Web3Button
            contractAddress={EDITIONDROP_ADDRESS}
            action={(contract) => contract.erc1155.claim(5, 1)}
            >Add Patty</Web3Button>
        </div>
    )
}

export default SmartWalletConnected