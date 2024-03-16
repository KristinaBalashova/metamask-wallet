import { useState, useEffect } from 'react';
import ConnectionBox from './ConnectionBox';
import WalletCard from './WalletCard';
import Box from '@mui/material/Box';

export default function MainSection() {
  return (
    <Box component="section">
      <ConnectionBox />
      <WalletCard />
    </Box>
  );
}
