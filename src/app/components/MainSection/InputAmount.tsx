import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { FC } from 'react';

interface IProps {
    setTransactionAmount: Function;
}
  
export const InputAmount: FC<IProps> = (props: IProps) => {

const { setTransactionAmount } = props;
  const [amount, setAmount] = useState('');
  const [inputError, setInputError] = useState(false);

  const handleInputChange = (e) => {
    setAmount(e.target.value);
    if (e.target.validity.valid) {
      setInputError(false);
      setTransactionAmount(e.target.value);

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
        pattern: '^\d+$',
      }}
      id="outlined-basic"
      variant="outlined"
      sx={{ mt: 2 }}
      size="small"
    />
  );
}
