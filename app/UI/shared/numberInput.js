import React, { useState } from 'react';
import { TextField, InputAdornment, Divider } from '@material-ui/core';
import { Add, SettingsBackupRestore as Rewind } from '@material-ui/icons';

export const NumberInput = () => {
  const [isError, toggleError] = useState(false);
  return (
    <TextField
      error={isError}
      helperText={isError ? 'Enter numbers from 1-100. (e.g. 22, 45, 6)' : ''}
      label="Custom Data:"
      placeholder="Enter numbers from 1-100"
      size="small"
      onChange={event => toggleError(!isValidNumbers(event.target.value).valid)}
      InputProps={{
        inputProps: { maxLength: 20 },
        endAdornment: (
          <>
            <InputAdornment>
              <Add />
            </InputAdornment>
            <Divider orientation="vertical" flexItem />
            <InputAdornment>
              <Rewind />
            </InputAdornment>
          </>
        ),
      }}
    />
  );
};

function isValidNumbers(input) {
  let valid = true;
  const stripped = input.replaceAll(',', ' ').trim();
  if (stripped.length === 0) return { valid, validNums: [] };
  const validNums = stripped
    .split(/\s+/)
    .filter(el => {
      const validEl = /^[1-9][0-9]*$/g.test(el) && +el <= 100;
      if (!validEl) valid = false;
      return validEl;
    })
    .map(el => +el);
  return { valid, validNums: valid ? validNums : [] };
}
