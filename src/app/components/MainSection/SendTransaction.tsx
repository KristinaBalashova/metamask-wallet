import { Button } from '@mui/material';
import React from 'react';
import { FC } from 'react';
import { MetaMaskInpageProvider } from '@metamask/providers';
import detectEthereumProvider from '@metamask/detect-provider';

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

interface IProps {
  from: String;
  to: String;
  amount: String;
}

export const SendTransaction: FC<IProps> = (props: IProps) => {
  const { from, to, amount } = props;

  const sendTransaction = async () => {
    await window.ethereum?.request({
      method: 'eth_sendTransaction',
      params: [
        {
          to: to,
          from: from,
          amount: amount,
        },
      ],
    });
  };

  return (
    <Button variant="outlined" onClick={() => sendTransaction()} sx={{ mt: 2 }}>
      Send
    </Button>
  );
};
