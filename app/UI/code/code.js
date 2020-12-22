import { Dialog, DialogContent, DialogContentText } from '@material-ui/core';
import React from 'react';

const Code = ({ toggleCode, code }) => (
  <Dialog open={code} keepMounted onClose={toggleCode}>
    <DialogContent>
      <DialogContentText>Foo Bar</DialogContentText>
    </DialogContent>
  </Dialog>
);
export default Code;
