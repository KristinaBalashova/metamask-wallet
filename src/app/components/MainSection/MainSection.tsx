import { useState, useEffect } from 'react';
import WalletCard from './WalletCard';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export default function MainSection() {
  return (
    <Box component="section">
      <WalletCard />
    </Box>
  );
}
