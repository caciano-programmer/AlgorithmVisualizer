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
    select: { color: 'white', optionsBackground: '#616161', optionsHighlight: '#757575', heading: '#3d3d3d' },
    input: { color: 'white', hover: 'rgba(255, 255, 255, .04)', disabled: 'rgba(255, 255, 255, .35)' },
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
    select: { color: '#083a8c', optionsBackground: '#e0e0e0', optionsHighlight: '#bdbdbd', heading: '#000544' },
    input: { color: '#083a8c', hover: 'rgba(8, 58, 140, .04)', disabled: 'rgba(8, 58, 140, .35)' },
  },
};

export const MyTheme = React.createContext(themes.dark);
