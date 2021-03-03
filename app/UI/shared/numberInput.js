import React, { useRef, useState } from 'react';
import { TextField, InputAdornment, Divider, IconButton, ClickAwayListener, makeStyles } from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';
import { isValidNumbers } from './util';

const useStyles = theme =>
  makeStyles({
    primary: { color: theme.input.color },
    nativeInput: { '&::placeholder': { color: theme.input.color } },
    underline: {
      borderBottom: `solid 1px ${theme.input.color}`,
      '&::after': { borderBottom: `solid 1px ${theme.input.color}` },
      '&&&::before': { borderBottom: 'none' },
      '&.Mui-error&::after': { borderBottom: `solid 1px ${theme.input.color}` },
    },
    formHelperText: { '&.Mui-error': { color: theme.input.color } },
    divider: { backgroundColor: theme.input.color },
    icon: { '&:hover': { backgroundColor: theme.input.hover } },
  });

export const NumberInput = ({ setNewData, clearCustom, isCustom, theme }) => {
  const clearObj = { valid: true, validNums: [] };
  const [numState, setNumState] = useState(clearObj);
  const inputRef = useRef(null);
  const classes = useStyles(theme)();

  const add = () => {
    inputRef.current.value = '';
    if (numState.validNums.length > 0) {
      setNumState(clearObj);
      setNewData(numState.validNums);
    }
  };

  const clear = () => {
    inputRef.current.value = '';
    setNumState(clearObj);
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
        onChange={event => setNumState({ ...isValidNumbers(event.target.value) })}
        InputLabelProps={{
          style: { color: theme.input.color },
        }}
        FormHelperTextProps={{ classes: { error: classes.formHelperText } }}
        InputProps={{
          classes: { input: classes.primary, underline: classes.underline },
          inputProps: { maxLength: 20, className: classes.nativeInput },
          endAdornment: (
            <>
              <InputAdornment>
                <IconButton disabled={numState.validNums.length < 1} onClick={add} classes={{ root: classes.icon }}>
                  <Add
                    style={{
                      fontSize: '1.1em',
                      fill: numState.validNums.length > 0 ? theme.input.color : theme.input.disabled,
                    }}
                  />
                </IconButton>
              </InputAdornment>
              <Divider orientation="vertical" flexItem classes={{ root: classes.divider }} />
              <InputAdornment>
                <IconButton disabled={!isCustom} onClick={clear}>
                  <Close style={{ fontSize: '1.1em', fill: isCustom ? theme.input.color : theme.input.disabled }} />
                </IconButton>
              </InputAdornment>
            </>
          ),
        }}
      />
    </ClickAwayListener>
  );
};
