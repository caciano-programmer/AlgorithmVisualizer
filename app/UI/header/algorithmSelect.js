import React from 'react';
import Select from 'react-select';
import { SORT_ALGORITHMS } from '../../sort/sortAlgorithms';

const customStyles = theme => {
  const selectColor = styles => ({ ...styles, color: theme.select.color });
  return {
    control: styles => ({
      ...styles,
      boxShadow: 'none',
      '&:hover': { borderColor: theme.select.color },
      backgroundColor: 'inherit',
      borderLeft: 'none',
      borderRight: 'none',
      borderTop: 'none',
      borderRadius: '0',
      borderBottom: `solid 1px ${theme.select.color}`,
    }),
    dropdownIndicator: selectColor,
    indicatorSeparator: styles => ({ ...styles, color: theme.select.color, marginBottom: 0 }),
    input: selectColor,
    singleValue: styles => ({
      ...styles,
      color: theme.select.color,
      fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1,
      letterSpacing: '.00938em',
    }),
    valueContainer: styles => ({ ...styles, marginBottom: '-.875vh' }),
    menu: styles => ({ ...styles, backgroundColor: theme.select.optionsBackground }),
    groupHeading: styles => ({ ...styles, color: theme.select.heading, fontWeight: 'bolder' }),
    option: (styles, state) => {
      const backgroundColor = state.isFocused ? theme.select.optionsHighlight : theme.select.optionsBackground;
      return { ...styles, color: theme.select.color, backgroundColor };
    },
    container: styles => ({ ...styles, width: '100%' }),
  };
};

const algorithms = Object.values(SORT_ALGORITHMS).map(el => ({ value: el, label: el.name }));
const options = [
  { label: 'Code:', options: [{ label: 'Algorithm Code', value: 'code' }] },
  { label: 'Algorithms:', options: algorithms },
];

const handleSelect = (obj, toggleCode, setAlgorithm) => {
  if (obj.value === 'code') toggleCode(true);
  else setAlgorithm(obj.value);
};

export const AlgorithmSelect = ({ theme, setAlgorithm, algorithm, toggleCode }) => {
  const styles = customStyles(theme);
  return (
    <Select
      options={options}
      value={{ value: algorithm.func, label: algorithm.name }}
      onChange={obj => handleSelect(obj, toggleCode, setAlgorithm)}
      styles={styles}
    />
  );
};
