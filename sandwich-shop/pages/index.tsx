import { ConnectWallet, Web3Button, useAddress, useOwnedNFTs, useContract } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { NFTDROP_ADDRESS } from "../const/constants";
import NFTGrid from "../components/NFTGrid";



const Home: NextPage = () => {
  const address = useAddress();

  const {
    contract 
  } = useContract(NFTDROP_ADDRESS);

  const {
    data,
    isLoading 
  } = useOwnedNFTs(contract, address)
  
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <ConnectWallet />
        {!address 
        ? (<p>Connect Wallet to get started</p>)
        : (
          <div>
          <NFTGrid 
            isLoading={isLoading}
            nfts={data}
            emptyText="No NFTs found"
          />
          
          <Web3Button
          contractAddress={NFTDROP_ADDRESS}
          action={(contract) => contract.erc721.claim(2)}
          > Start 2 Orders</Web3Button>
          </div>
        )}

      </main>
    </div>
  );
};

export default Home;
