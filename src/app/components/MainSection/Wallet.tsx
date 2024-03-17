import { Box, Typography } from '@mui/material';
import React from 'react';
import { FC } from 'react';

interface IProps {
  walletAddress: String;
}

export const Wallet: FC<IProps> = (props: IProps) => {
  const { walletAddress } = props;

  return (
    <Box>
      <strong>Your Wallet:</strong>
      <Typography
        variant="subtitle1"
        noWrap
        sx={{ color: '#EC5800', backgroundColor: '#ffedcc', borderRadius: 1, pl: 1, 
        fontSize: {
            md: 16,
            sm: 14,
            xs: 12
          },}}
      >
        {walletAddress}
      </Typography>
    </Box>
  );
};
