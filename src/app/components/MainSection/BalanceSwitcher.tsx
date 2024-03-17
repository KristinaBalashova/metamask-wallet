import { Box, Button, ButtonGroup, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { useMetaMask } from "../../../hooks/useMetaMask";


const chainId = {
  eth: '0x1',
  bnb: '0x38',
  test: '0xaa36a7'
}

export const BalanceSwitcher = () => {

  const { wallet} =  useMetaMask();

  const switchChain = async (newChainId: String) => {
    
    await window.ethereum?.request({
      method: 'wallet_switchEthereumChain',
      params: [
        {
          chainId: newChainId,
        },
      ],
    });
  };

  
  return (
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
  );
};

