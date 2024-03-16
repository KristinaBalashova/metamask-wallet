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
  return (
    <Box
      component="div"
      className={styles.root}
    >
      <Button variant="text" >
          Connnect MetaMask
        </Button>
      <Typography variant="h6" component="h2">
        Wallet address
      </Typography>
      <TextField id="standard-basic" label="Address" variant="standard" className={styles.input} />
      <Button variant="outlined" className={styles.button}>
        Send Data
      </Button>
    </Box>
  );
}

//onClick={handleConnect}