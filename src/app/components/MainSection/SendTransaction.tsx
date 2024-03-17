"use client";
import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { FC } from 'react';
import { useMetaMask } from '../../../hooks/useMetaMask';
import { convertToWei } from '../../../utils/index';

interface IProps {
  to: String;
  amount: string;
}

export const SendTransaction: FC<IProps> = (props: IProps) => {
  const { wallet } = useMetaMask();
  const { to, amount } = props;

  const [error, setError] = useState('');

  const sendTransaction = async () => {
    const amountInWei = convertToWei(amount);
    console.log('send', amountInWei);
    await window.ethereum
      ?.request({
        method: 'eth_sendTransaction',
        params: [
          {
            to: to,
            from: wallet.accounts[0],
            value: amountInWei.toString(16),
          },
        ],
      })
      .catch((error: any) => {
        setError(error.message);
      });
  };

  return (
    <Box>
      <Button variant="outlined" onClick={() => sendTransaction()} sx={{ mt: 2, width: '100%' }}>
        Send
      </Button>
      <Typography variant="subtitle2" color="#e50000">
        {error}
      </Typography>
    </Box>
  );
};
