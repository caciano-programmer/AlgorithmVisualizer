import React from 'react';

export const themes = {
  dark: {
    background: '#121212',
    brand: '#64b5f6',
    brandShadow: '1px 1px 1px #64b5f6',
  },
  light: {
    background: '#eeeeee',
    brand: '#083a8c',
    brandShadow: '1px 1px 1px #083a8c',
  },
};

export const MyTheme = React.createContext(themes.dark);
