import { NFT as NFTTypes } from '@thirdweb-dev/sdk'
import styles from "../styles/Home.module.css"
import Link from 'next/link'
import NFTComponent from './NFTComponent'
import { NFTDROP_ADDRESS } from '../const/constants'


type Props = {
    isLoading: boolean;
    nfts: NFTTypes[] | undefined;
    emptyText?: string;
}

export default function NFTGrid({ isLoading, nfts, emptyText }: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                {nfts && nfts.length > 0 
                ? (
                    nfts.map((nft) => ( 
                        <Link
                            key={nft.metadata.id}
                            href={`/token/${NFTDROP_ADDRESS}/${nft.metadata.id}`}
                            className={styles.card}
                        >
                            <NFTComponent 
                                nft={nft} 
                            />
                        </Link>
                    ))
                ) 
                : (<p>{emptyText}</p>)}
            </div>
        </div>
    )

}