import React, { useRef, useState } from 'react';
import { TextField, InputAdornment, Divider, IconButton, ClickAwayListener } from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';

export const NumberInput = ({ validator, setNewData, clearCustom }) => {
  const clearObj = { valid: true, validNums: [] };
  const [numState, setNumState] = useState(clearObj);
  const inputRef = useRef(null);

  const add = () => {
    inputRef.current.value = '';
    if (numState.validNums.length > 0) setNewData(numState.validNums);
  };

  const clear = () => {
    inputRef.current.value = '';
    clearCustom();
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        inputRef.current.value = '';
        setNumState({ valid: true, validNums: [] });
      }}
    >
      <TextField
        error={!numState.valid}
        helperText={!numState.valid ? 'Enter numbers from 1-100. (e.g. 22, 45, 6)' : ''}
        label="Custom Data:"
        placeholder="Enter numbers from 1-100"
        size="small"
        inputRef={inputRef}
        onChange={event => setNumState({ ...validator(event.target.value) })}
        InputProps={{
          inputProps: { maxLength: 20 },
          endAdornment: (
            <>
              <InputAdornment>
                <IconButton disabled={numState.validNums.length < 1} onClick={add}>
                  <Add />
                </IconButton>
              </InputAdornment>
              <Divider orientation="vertical" flexItem />
              <InputAdornment>
                <IconButton disabled={numState.validNums.length < 1} onClick={clear}>
                  <Close />
                </IconButton>
              </InputAdornment>
            </>
          ),
        }}
      />
    </ClickAwayListener>
  );
};
