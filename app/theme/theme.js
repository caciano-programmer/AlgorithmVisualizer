import React from 'react';

export const themes = {
  dark: {
    type: 'dark',
    get isDark() {
      return this.type === 'dark';
    },
    background: '#212121',
    brand: '#1976d2',
    get brandShadow() {
      return `0 0 1px ${this.brand}`;
    },
    select: 'white',
  },
  light: {
    type: 'light',
    get isDark() {
      return this.type === 'dark';
    },
    background: '#eeeeee',
    brand: '#083a8c',
    get brandShadow() {
      return `0 0 1px ${this.brand}`;
    },
    select: '#083a8c',
  },
};

export const MyTheme = React.createContext(themes.dark);
