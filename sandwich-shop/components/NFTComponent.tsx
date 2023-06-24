import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk"


type Props = {
    nft: NFT
}

export default function NFTComponent({ nft }: Props) {

    return (
        <>
        <ThirdwebNftMedia
        metadata={nft.metadata}
        />
        <h1>{nft.metadata.name}</h1>
        <p>{nft.metadata.description}</p>
        </>
    )

}