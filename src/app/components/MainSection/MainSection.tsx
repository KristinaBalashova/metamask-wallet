import { useState, useEffect } from 'react';
import WalletCard from './WalletCard';
import Box from '@mui/material/Box';

export default function MainSection() {
  return (
    <Box component="section">
      <WalletCard />
    </Box>
  );
}
