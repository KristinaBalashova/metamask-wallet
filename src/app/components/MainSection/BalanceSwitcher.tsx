import { Box, Button, ButtonGroup, Typography } from '@mui/material';
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
  balance: String;
}

export const BalanceSwitcher: FC<IProps> = (props: IProps) => {
  const { balance } = props;

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

  return (
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
        {balance}
      </Typography>
    </Box>
  );
};


const onj = {
    eth: '0x1',
    bnb: '0x38',
    test: ''
}