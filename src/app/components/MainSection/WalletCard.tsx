import detectEthereumProvider from '@metamask/detect-provider';
import { formatBalance, formatChainAsNum } from '../../../utils';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import Box from '@mui/material/Box';
import InputAmount from './InputAmount';
import InputAddress from './InputAddress';
import { SendTransaction } from './SendTransaction';
import { toASCII } from 'punycode';

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

export default function WalletCard() {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const initialState = { accounts: [], balance: '', chainId: '' };
  const [wallet, setWallet] = useState(initialState);

  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [address, setAddress] = useState('');

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

  const switchChain = async () => {
    //Request current chain ID
    const chainId = await window.ethereum!.request({
      method: 'eth_chainId',
    });
    console.log('Current ChainID: ', chainId);

    switch (chainId) {
      case '0x1':
        //Requesting switch to BNB since current chain is ETH
        console.log('Switching to BNB');
        await window.ethereum?.request({
          method: 'wallet_switchEthereumChain',
          params: [
            {
              chainId: '0x38',
            },
          ],
        });
        break;
      case '0x38':
        //Requesting switch to ETH since current chain is BNB
        console.log('Switching to ETH');
        await window.ethereum?.request({
          method: 'wallet_switchEthereumChain',
          params: [
            {
              chainId: '0x1',
            },
          ],
        });
        break;
      default:
        console.log(
          'fall to default, probably we are attached to another chain currently (not ETH, not BNB)',
        );
    }
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
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        p: 3,
        width: 500,
        border: '1px solid #ebedf0',
        boxShadow: '0 1.5px 3px 0 #00000026',
        '&:hover': {
          border: '1px solid #0376c9',
        },
      }}
    >
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
        <Typography variant="h6" color="#000000">
          <strong>Your Wallet:</strong>
          <Typography
            variant="subtitle1"
            sx={{ color: '#EC5800', backgroundColor: '#ffedcc', borderRadius: 1, pl: 1 }}
          >
            {wallet.accounts[0]}
          </Typography>
        </Typography>
      )}

      <Box sx={{ my: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <ButtonGroup
          aria-label="Loading button group"
          disabled={false}
          orientation="horizontal"
          variant="text"
        >
          <Button onClick={() => switchChain()}>
            ETH
            <img src="/eth-logo.svg" alt="github-logo" width="20" height="20" />
          </Button>
          <Button onClick={() => switchChain()}>
            BNB
            <img src="/bnb-logo.svg" alt="github-logo" width="20" height="20" />
          </Button>
          <Button onClick={() => switchChain()}>Test</Button>
        </ButtonGroup>
        <Typography variant="h6" color="#000000">
          {wallet.balance}
        </Typography>
      </Box>
      <InputAmount />
      <InputAddress />
      <SendTransaction from={wallet.accounts[0]} to={address} amount={2} />
    </Box>
  );
}
