import { Box, Button, ButtonGroup, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useMetaMask } from "../../../hooks/useMetaMask";
import { formatBalance } from '../../../utils';

interface ButtonId {
  eth: String,
  bnb: String,
  test: String
}

const chainId = {
  eth: '0x1',
  bnb: '0x38',
  test: '0xaa36a7'
}

export const BalanceSwitcher = () => {

  const { wallet } = useMetaMask();

  const [newBalance, setNewBalance] = useState('');
  const [activeChain, setActiveChain] = useState<String | null>(null);
  const [chainErr, setChainErr] = useState(false);

  const checkChain = async() => {
    const currentChain = await window.ethereum.request({
      "method": "eth_chainId",
      "params": []
    })
    
    const chainList = Object.values(chainId);
    chainList.includes(currentChain) ? setActiveChain(currentChain) : setChainErr(true);
    !chainList.includes(currentChain) && setActiveChain(null);
  }

  checkChain();

  const switchChain = async (newChainId: String) => {
  
    await window.ethereum?.request({
      method: 'wallet_switchEthereumChain',
      params: [
        {
          chainId: newChainId,
        },
      ],
    })
    .then(() => {
      setActiveChain(newChainId);
    });

    checkChain();
    setChainErr(false);

    const balance = formatBalance(
      await window.ethereum.request({
        method: 'eth_getBalance',
        params: [wallet.accounts[0], 'latest'],
      }),
    );

    setNewBalance(formatBalance(balance));

  };


  
  console.log(activeChain);
  return (
    <Box sx={{ my: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="subtitle1" color="#000000" sx={{fontSize: 12}} >
           Avaliable balance
          </Typography>
          <Typography variant="h6" color="#000000" sx={{fontSize: 16, fontWeight: 600}}>
            {newBalance ? newBalance : wallet.balance[0]}
          </Typography>
          
          
        </Box>
        <div>
        <ButtonGroup
          aria-label="Loading button group"
          disabled={false}
          orientation="horizontal"
          variant="text"
        >
          <Button onClick={() => switchChain(chainId.eth)} variant={ activeChain === chainId.eth ? 'outlined' : 'text'}>
            ETH
            <img src="/eth-logo.svg" alt="github-logo" width="20" height="20" />
          </Button>
          <Button onClick={() => switchChain(chainId.bnb)} variant={ activeChain === chainId.bnb? 'outlined' : 'text'}>
            BNB
            <img src="/bnb-logo.svg" alt="github-logo" width="20" height="20" />
          </Button>
          <Tooltip title="Sepolia" placement="bottom-end">
            <Button onClick={() => switchChain(chainId.test)} 
            variant={ activeChain === chainId.test ? 'outlined' : 'text'}>
              TEST</Button>
          </Tooltip>
          
        </ButtonGroup>
          { chainErr &&
           <Typography variant="subtitle1" color='#e50000' sx={{fontSize: 12}} >
              Unknown Chain. Please choose chain
          </Typography>}
        </div>
        
        
      </Box>
  );
};

