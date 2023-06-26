/* eslint-disable @next/next/no-img-element */
import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk"
import Image from 'next/image'


type Props = {
    nft: NFT
}

export default function NFTComponent({ nft }: Props) {

    console.log(nft.metadata.image)
    return (
        <>
        <img src={`${nft.metadata.image}`} alt="nft" />
        <h1 className="text-white">{nft.metadata.name}</h1>
        </>
    )

}