import React from 'react';
import Select from 'react-select';
import { SORT_ALGORITHMS } from '../../sort/sortAlgorithms';

const customStyles = theme => {
  const selectColor = styles => ({ ...styles, color: theme.select });
  return {
    control: styles => ({
      ...styles,
      boxShadow: 'none',
      '&:hover': { borderColor: theme.select },
      backgroundColor: 'inherit',
      borderLeft: 'none',
      borderRight: 'none',
      borderTop: 'none',
      borderRadius: '0',
      borderBottom: `solid 1px ${theme.select}`,
    }),
    dropdownIndicator: selectColor,
    indicatorSeparator: selectColor,
    singleValue: selectColor,
    container: styles => ({ ...styles, width: '100%' }),
  };
};

const options = [
  ...Object.values(SORT_ALGORITHMS).map(el => ({ value: el, label: el.name })),
  { value: 'Algorithm Code', label: 'Algorithm Code' },
];

const handleSelect = (obj, toggleCode, setAlgorithm) => {
  if (obj.label === 'Algorithm Code') toggleCode(true);
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
