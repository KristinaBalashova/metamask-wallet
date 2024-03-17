import detectEthereumProvider from '@metamask/detect-provider';
import { formatBalance, formatChainAsNum } from '../../../utils';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Button, ButtonGroup, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import { InputAmount }  from './InputAmount';
import { InputAddress}  from './InputAddress';
import { SendTransaction } from './SendTransaction';
import { BalanceSwitcher } from './BalanceSwitcher';
import { Wallet } from './Wallet';
//import { toASCII } from 'punycode';

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}


const chainId = {
  eth: '0x1',
  bnb: '0x38',
  test: '0xaa36a7'
}

export default function WalletCard() {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const initialState = { accounts: [], balance: '', chainId: '' };
  const [wallet, setWallet] = useState(initialState);

  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

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

  const switchChain = async (newChainId: String) => {
    console.log('Switching to newChain');
    await window.ethereum?.request({
      method: 'wallet_switchEthereumChain',
      params: [
        {
          chainId: newChainId,
        },
      ],
    });
    updateWallet(wallet.accounts[0]);
  };


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        p: 3,
        border: '1px solid #ebedf0',
        boxShadow: '0 1.5px 3px 0 #00000026',
        width: '100%',
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
        <Box onClick={() => setError(false)}>
          <Typography variant="subtitle2" component="h2" color="#FF0000">
            <strong>Error:</strong> {errorMessage}
          </Typography>
        </Box>
      )}

      {wallet.accounts.length > 0 && <Wallet walletAddress={wallet.accounts[0]} />}

      <Box sx={{ my: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="subtitle1" color="#000000" sx={{fontSize: 12}} >
           Avaliable balance
          </Typography>
          <Typography variant="h6" color="#000000" sx={{fontSize: 16, fontWeight: 600}}>
            {wallet.balance[0]}
          </Typography>
        </Box>
        <ButtonGroup
          aria-label="Loading button group"
          disabled={false}
          orientation="horizontal"
          variant="text"
        >
          <Button onClick={() => switchChain(chainId.eth)}>
            ETH
            <img src="/eth-logo.svg" alt="github-logo" width="20" height="20" />
          </Button>
          <Button onClick={() => switchChain(chainId.bnb)}>
            BNB
            <img src="/bnb-logo.svg" alt="github-logo" width="20" height="20" />
          </Button>
          <Tooltip title="Sepolia" placement="bottom-end">
            <Button onClick={() => switchChain(chainId.test)}>TEST</Button>
          </Tooltip>
          
        </ButtonGroup>
        
      </Box>
      <InputAmount setTransactionAmount={setAmount}/>
      <InputAddress setTransactionAddress={setAddress}/>
      <SendTransaction from={wallet.accounts[0]} to={address} amount={amount} />
    </Box>
  );
}

//<BalanceSwitcher balance={wallet.balance[0]} />
