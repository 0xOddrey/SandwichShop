import { ethers } from "ethers";
import { SmartWallet } from "@thirdweb-dev/wallets";
import {
  TWAPI_KEY,
  factoryAddress,
  activeChain,
  NFTDROP_ADDRESS,
  IMPLEMENTATION_ADDRESS,
} from "../../const/constants";
import { SmartContract, NFT } from "@thirdweb-dev/sdk";
import { WalletOptions } from "@thirdweb-dev/wallets";
import type { SmartWalletConfig } from "@thirdweb-dev/wallets";
import type { BaseContract } from "ethers";

export default function newSmartWallet(token: NFT) {
    console.log("Starting new smart wallet")
  //Smart Wallet config object
  const config: WalletOptions<SmartWalletConfig> = {
    chain: activeChain, // the chain where your smart wallet will be or is deployed
    factoryAddress: factoryAddress, // your own deployed account factory address
    thirdwebApiKey: TWAPI_KEY, // obtained from the thirdweb dashboard
    gasless: true, // enable or disable gasless transactions
    factoryInfo: {
      createAccount: async (
        factory: SmartContract<BaseContract>,
        owner: string
      ) => {
        const account = factory.prepare("createAccount", [
          IMPLEMENTATION_ADDRESS,
          activeChain.chainId,
          NFTDROP_ADDRESS,
          token.metadata.id,
          0,
          ethers.utils.toUtf8Bytes("")
        ]);
        console.log("here", account);
        return account;
      }, // the factory method to call to create a new account
      getAccountAddress: async (
        factory: SmartContract<BaseContract>,
        owner: string
      ) => {
        return factory.call("account", [
          IMPLEMENTATION_ADDRESS,
          activeChain.chainId,
          NFTDROP_ADDRESS,
          token.metadata.id,
          0
        ]);
      }, // the factory method to call to get the account address
    },
  };
  return new SmartWallet(config);
}
