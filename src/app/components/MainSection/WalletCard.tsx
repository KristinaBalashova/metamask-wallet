import detectEthereumProvider from '@metamask/detect-provider';
import { formatBalance, formatChainAsNum } from '../../../utils'; /* New */
import { MetaMaskInpageProvider } from '@metamask/providers';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import styles from './WalletCard.module.css';

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

const chainId = {
  eth: '1',
  bnb: '56',
};

export default function WalletCard() {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const initialState = { accounts: [], balance: '', chainId: '' };
  const [wallet, setWallet] = useState(initialState);

  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const refreshAccounts = (accounts: any) => {
      if (accounts.length > 0) {
        updateWallet(accounts);
      } else {
        // if length 0, user is disconnected
        setWallet(initialState);
      }
    };

    const refreshChain = (chainId: any) => {
      setWallet((wallet) => ({ ...wallet, chainId }));
    };

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));

      if (provider) {
        const accounts = await window.ethereum?.request({
          method: 'eth_accounts',
        });
        refreshAccounts(accounts);
        window.ethereum?.on('accountsChanged', refreshAccounts);
        window.ethereum?.on('chainChanged', refreshChain);
      }
    };

    getProvider();

    return () => {
      window.ethereum?.removeListener('accountsChanged', refreshAccounts);
      window.ethereum?.removeListener('chainChanged', refreshChain);
    };
  }, []);

  const updateWallet = async (accounts: any) => {
    const balance = formatBalance(
      await window.ethereum!.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest'],
      }),
    );
    const chainId = await window.ethereum!.request({
      method: 'eth_chainId',
    });
    setWallet({ accounts, balance, chainId });
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    await window.ethereum
      ?.request({
        method: 'eth_requestAccounts',
      })
      .then((accounts: []) => {
        setError(false);
        updateWallet(accounts);
      })
      .catch((err: any) => {
        setError(true);
        setErrorMessage(err.message);
      });
    setIsConnecting(false);
  };

  const disableConnect = Boolean(wallet) && isConnecting;

  return (
    <Box component="div" className={styles.root}>
      {!hasProvider && (
        <Button
          variant="contained"
          disabled={disableConnect}
          onClick={handleConnect}
          sx={{ my: 2 }}
        >
          <a
            href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
            target="_blank"
          >
            Install MetaMask Extention
          </a>
        </Button>
      )}
      {window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (
        <Button variant="text" disabled={disableConnect} onClick={handleConnect} sx={{ my: 2 }}>
          Connnect MetaMask
        </Button>
      )}
      {error && (
        <div onClick={() => setError(false)}>
          <Typography variant="subtitle2" component="h2" color="#FF0000">
            <strong>Error:</strong> {errorMessage}
          </Typography>
        </div>
      )}

      {wallet.accounts.length > 0 && (
        <Typography variant="h6"  color="#000000" >
          <strong>Your Wallet:</strong>
          <Typography variant="subtitle1" sx={{ color: '#EC5800', backgroundColor: '#ffedcc', borderRadius: 1, pl: 1}}>
          {wallet.accounts[0]}
          </Typography>
        </Typography>
        
      )}

      <Box sx={{ my: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Typography variant="h6" component="h2" color="#F28C28">
          <img src="/eth-logo.svg" alt="github-logo" width="20" height="20" />
          {wallet.balance}
        </Typography>
        <Typography variant="h6" component="h2" color="#F28C28">
          <img src="/bnb-logo.svg" alt="github-logo" width="20" height="20" />
          {wallet.balance}
        </Typography>
      </Box>
      <TextField id="outlined-basic" label="Address" variant="outlined" sx={{ my: 2 }} />
      <Button variant="outlined">Send</Button>
    </Box>
  );
}

//onClick={handleConnect}
