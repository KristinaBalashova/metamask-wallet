import { TextField } from '@mui/material';
import React, { useState } from 'react';

export default function InputAddress() {
  const [address, setAddress] = useState('');
  const [inputError, setInputError] = useState(false);

  const handleInputChange = (e) => {
    setAddress(e.target.value);
    if (e.target.validity.valid) {
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  return (
    <TextField
      required
      label="Wallet address"
      value={address}
      onChange={handleInputChange}
      error={inputError}
      helperText={inputError && 'Wrong address format, please check your address'}
      inputProps={{
        pattern: '^0x[0-9,a-f,A-F]{40}$',
      }}
      id="outlined-basic"
      variant="outlined"
      sx={{ mt: 2 }}
      size="small"
    />
  );
}
