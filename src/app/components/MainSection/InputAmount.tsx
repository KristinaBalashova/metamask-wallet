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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    setTransactionAmount(e.target.value);
    //if (e.target.validity.valid) {
    //  setInputError(false);
    //
    //} else {
    //   setInputError(true);
    //}
    //need to fix validation, for some reason regexp let me down
  };

  return (
    <TextField
      required
      label="amount"
      value={amount}
      onChange={handleInputChange}
      id="outlined-basic"
      variant="outlined"
      sx={{ mt: 2 }}
      size="small"
    />
  );
};
