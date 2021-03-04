import React from 'react';
import { Divider, List, ListItem, ListItemText } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { SORT_ALGORITHMS } from '../../sort/sortAlgorithms';

export const SecondaryList = ({ toggle, setAlgorithm, theme }) => {
  const changeAlgorithm = algorithm => {
    setAlgorithm(algorithm);
    toggle(false);
  };

  return (
    <List>
      <ListItem button onClick={() => toggle(false)}>
        <ArrowBack fontSize="large" />
      </ListItem>
      <Divider style={{ backgroundColor: theme.sidebar.color, height: '.2vh' }} />
      {Object.values(SORT_ALGORITHMS).map(el => (
        <ListItem button key={el.name} onClick={() => changeAlgorithm(el)}>
          <ListItemText primary={el.name} />
        </ListItem>
      ))}
    </List>
  );
};
