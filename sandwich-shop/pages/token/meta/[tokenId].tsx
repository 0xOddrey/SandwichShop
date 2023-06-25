import { ConnectWallet, Web3Button, useAddress, useOwnedNFTs, useContract } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

 
export default function Page() {

  const {
    contract 
  } = useContract('0x05D55A89De2680b194db09be1e6A7C30ee144193');


  return (
      <>
        <h1>This is the token</h1>
        <p>Token:  {contract?.chainId} </p>
      </>
    )
}