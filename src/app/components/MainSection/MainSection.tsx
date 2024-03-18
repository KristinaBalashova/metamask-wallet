'use client';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { InputAmount } from './InputAmount';
import { InputAddress } from './InputAddress';
import { SendTransaction } from './SendTransaction';
import { BalanceSwitcher } from './BalanceSwitcher';
import { Wallet } from './Wallet';
import { useMetaMask } from '../../../hooks/useMetaMask';
import { MetaMaskContextProvider } from '../../../hooks/useMetaMask';

export default function MainSection() {
  const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  const disableConnect = Boolean(wallet) && isConnecting;

  return (
    <MetaMaskContextProvider>
      <Box
        component="section"
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 3,
            p: 3,
            border: '1px solid #ebedf0',
            boxShadow: '0 1.5px 3px 0 #00000026',
            width: {
              sm: 500,
              xs: '90%',
            },
            '&:hover': {
              border: '1px solid #0376c9',
            },
          }}
        >
          {!hasProvider && (
            <Button variant="contained" sx={{ my: 2 }}>
              <a href="https://metamask.io" target="_blank">
                {' '}
                Install MetaMask
              </a>
            </Button>
          )}
          {window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (
            <Button
              variant="text"
              disabled={disableConnect}
              onClick={connectMetaMask}
              sx={{ my: 2 }}
            >
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

          {hasProvider && <BalanceSwitcher />}
          <InputAmount setTransactionAmount={setAmount} />
          <InputAddress setTransactionAddress={setAddress} />
          <SendTransaction to={address} amount={amount} />
        </Box>
      </Box>
    </MetaMaskContextProvider>
  );
}
