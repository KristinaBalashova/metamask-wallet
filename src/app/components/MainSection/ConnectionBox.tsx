import detectEthereumProvider from "@metamask/detect-provider";
import { formatBalance, formatChainAsNum } from "../../../utils"; /* New */
import { MetaMaskInpageProvider } from "@metamask/providers";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";

declare global {
  interface Window {
    ethereum?:MetaMaskInpageProvider
  }
}


export default function ConnectionBox() {

  const [hasProvider, setHasProvider] = useState<boolean | null>(null);

  const initialState = {
      accounts: [],
      balance: "",
      chainId: "",
  }; 
  const [wallet, setWallet] = useState(initialState);

  useEffect(() => {
      const refreshAccounts = (accounts: any) => {
          if (accounts.length > 0) {
              updateWallet(accounts);
          } else {
              // if length 0, user is disconnected
              setWallet(initialState);
          }
      };

      const refreshChain = (chainId: any) => {               /* New */
          setWallet((wallet) => ({ ...wallet, chainId }));   /* New */
      };                                                     /* New */

      const getProvider = async () => {
          const provider = await detectEthereumProvider({ silent: true });
          setHasProvider(Boolean(provider));

          if (provider) {
              const accounts = await window.ethereum.request({
                  method: "eth_accounts",
              });
              refreshAccounts(accounts);
              window.ethereum.on("accountsChanged", refreshAccounts);
              window.ethereum.on("chainChanged", refreshChain); /* New */
          }
      };

      getProvider();

      return () => {
          window.ethereum?.removeListener("accountsChanged", refreshAccounts);
          window.ethereum?.removeListener(
              "chainChanged",
              refreshChain
          ); /* New */
      };
  }, []);

  const updateWallet = async (accounts: any) => {
      const balance = formatBalance(
          await window.ethereum!.request({              /* New */
              method: "eth_getBalance",                 /* New */
              params: [accounts[0], "latest"],          /* New */
          })
      );                                                /* New */
      const chainId = await window.ethereum!.request({  /* New */
          method: "eth_chainId",                        /* New */
      });                                               /* New */
      setWallet({ accounts, balance, chainId });        /* Updated */
  };

  const handleConnect = async () => {
      let accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
      });
      updateWallet(accounts);
  };

        return (
            <Box component="div" sx={{ p: 2 }}>
              {window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (
                <Button variant="text" onClick={handleConnect}>Connnect MetaMask</Button>
            )}

            {wallet.accounts.length > 0 && (
                <>                                                    {/* New */}
                    <div>Wallet Accounts: {wallet.accounts[0]}</div>
                    <div>Wallet Balance: {wallet.balance}</div>       {/* New */}
                    <div>Hex ChainId: {wallet.chainId}</div>          {/* New */}
                    <div>
                        Numeric ChainId: {formatChainAsNum(wallet.chainId)}
                    </div>                                            {/* New */}
                </>
            )}

            </Box>    
        )
    
}