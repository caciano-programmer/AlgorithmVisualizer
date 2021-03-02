import React from 'react';
import { Divider, List, ListItem, ListItemText } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { SORT_ALGORITHMS } from '../../sort/sortAlgorithms';

export const SecondaryList = ({ toggle, setAlgorithm }) => (
  <List>
    <ListItem button onClick={() => toggle(false)}>
      <ArrowBack fontSize="large" />
    </ListItem>
    <Divider />
    {Object.values(SORT_ALGORITHMS).map(el => (
      <ListItem key={el.name} button onClick={() => setAlgorithm(el)}>
        <ListItemText primary={el.name} />
      </ListItem>
    ))}
  </List>
);
