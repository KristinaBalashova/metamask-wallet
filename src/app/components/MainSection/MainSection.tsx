import { useState, useEffect } from 'react';
import WalletCard from './WalletCard';
import Box from '@mui/material/Box';
import styles from './MainSection.module.css';

export default function MainSection() {
  return (
    <Box component="section" className={styles.root}>
      <WalletCard />
    </Box>
  );
}
