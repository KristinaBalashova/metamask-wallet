import Box from '@mui/material/Box';
import React from 'react';

export default function BoxBasic() {
  return (
    <Box component="section" sx={{ p: 2 }}>
      <a href="https://github.com/KristinaBalashova/metamask-wallet/tree/main">
        <img src="/github.svg" alt="github-logo" width="50" height="50" />
      </a>
    </Box>
  );
}
