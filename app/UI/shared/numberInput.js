import React, { useRef, useState } from 'react';
import {
  TextField,
  InputAdornment,
  Divider,
  IconButton,
  ClickAwayListener,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';
import { isValidNumbers } from './util';

const useStyles = (theme, mobile = false) => {
  const color = mobile ? theme.inputMobile.color : theme.input.color;
  return makeStyles({
    primary: { color },
    nativeInput: { '&::placeholder': { color, fontSize: '.75em' } },
    underline: {
      borderBottom: `solid 1px ${color}`,
      '&::after': { borderBottom: `solid 1px ${color}` },
      '&&&::before': { borderBottom: 'none' },
      '&.Mui-error&::after': { borderBottom: `solid 1px ${color}` },
    },
    formHelperText: { '&.Mui-error': { color } },
    divider: { backgroundColor: color },
    icon: { '&:hover': { backgroundColor: theme.input.hover } },
  });
};

export const NumberInput = ({ setNewData, clearCustom, isCustom, theme, css }) => {
  const clearObj = { valid: true, validNums: [] };
  const [numState, setNumState] = useState(clearObj);
  const inputRef = useRef(null);
  const mobile = useMediaQuery('only screen and (max-width: 1049px)');
  const classes = useStyles(theme, mobile)();
  const color = mobile ? theme.inputMobile.color : theme.input.color;

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
        style={css}
        InputLabelProps={{
          style: { color },
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
                      fill: numState.validNums.length > 0 ? color : theme.input.disabled,
                    }}
                  />
                </IconButton>
              </InputAdornment>
              <Divider orientation="vertical" flexItem classes={{ root: classes.divider }} />
              <InputAdornment>
                <IconButton disabled={!isCustom} onClick={clear}>
                  <Close style={{ fontSize: '1.1em', fill: isCustom ? color : theme.input.disabled }} />
                </IconButton>
              </InputAdornment>
            </>
          ),
        }}
      />
    </ClickAwayListener>
  );
};
