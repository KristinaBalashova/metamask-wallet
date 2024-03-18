import { useMetaMask } from '../../../hooks/useMetaMask';
import { Box, Typography, radioClasses } from '@mui/material';
import React from 'react';

export const MetaMaskError = () => {
  const { error, errorMessage, clearError } = useMetaMask();

  return (
    <Box>
      {error && (
        <Typography component='div' color="#FFFFFF" onClick={clearError} sx={{ fontSize: 16, fontWeight: 500, backgroundColor: 'rgba(255, 0, 0, 0.8)', p: 1, m: 2, borderRadius: 1 }}>
          <strong>Error:</strong> {errorMessage}
        </Typography>
      )}
    </Box>
  );
};
