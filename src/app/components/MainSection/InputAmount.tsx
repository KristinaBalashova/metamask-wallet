import { TextField } from '@mui/material';
import React, { useState } from 'react';

export default function InputAmount() {
  const [amount, setAmount] = useState('');
  const [inputError, setInputError] = useState(false);

  const handleInputChange = (e) => {
    setAmount(e.target.value);
    if (e.target.validity.valid) {
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  return (
    <TextField
      required
      label="amount"
      value={amount}
      onChange={handleInputChange}
      error={inputError}
      helperText={inputError && 'Should contain only numbers'}
      inputProps={{
        pattern: '[0-9]',
      }}
      id="outlined-basic"
      variant="outlined"
      sx={{ mt: 2 }}
      size="small"
    />
  );
}
