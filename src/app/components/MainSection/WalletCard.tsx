import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import styles from './WalletCard.module.css';

const chainId = {
  eth: '1',
  bnb: '56',
};

export default function WalletCard() {
  return (
    <Box
      component="div"
      sx={{
        width: 800,
        p: 3,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid grey',
      }}
    >
      <Typography variant="h6" component="h2">
        Wallet address
      </Typography>
      <TextField id="standard-basic" label="Standard" variant="standard" className={styles.input} />
      <Button variant="outlined" className={styles.button}>
        Send Data
      </Button>
    </Box>
  );
}
