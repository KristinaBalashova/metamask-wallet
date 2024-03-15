"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window{
    ethereum?:MetaMaskInpageProvider
  }
}

export default function Home() {

  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
    const initialState = { accounts: [] };              /* New */
    const [wallet, setWallet] = useState(initialState); /* New */

    useEffect(() => {
        const getProvider = async () => {
            const provider = await detectEthereumProvider({ silent: true });
            setHasProvider(Boolean(provider));
        };

        getProvider();
    }, []);

    const updateWallet = async (accounts: any) => {     /* New */
        setWallet({ accounts });                        /* New */
    };                                                  /* New */

    const handleConnect = async () => {                 /* New */
        let accounts = await window.ethereum.request({  /* New */
            method: "eth_requestAccounts",              /* New */
        });                                             /* New */
        updateWallet(accounts);                         /* New */
    };                                                  /* New */


  return (
    <main className={styles.main}>
      <div>
                Injected Provider {hasProvider ? "DOES" : "DOES NOT"} Exist
      </div>
      {hasProvider && (                           /* Updated */
                <button onClick={handleConnect}>Connect MetaMask</button>
            )}

            {wallet.accounts.length > 0 && (            /* New */
                <div>Wallet Accounts: {wallet.accounts[0]}</div>
            )}

    </main>
  );
}
