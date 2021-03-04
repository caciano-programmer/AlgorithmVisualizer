import React from 'react';

const darkMain = '#1976d2';
const lightMain = '#083a8c';

export const themes = {
  dark: {
    type: 'dark',
    get isDark() {
      return this.type === 'dark';
    },
    background: '#212121',
    brand: darkMain,
    brandShadow: `0 0 1px ${darkMain}`,
    select: { color: 'white', optionsBackground: '#616161', optionsHighlight: '#757575', heading: '#282828' },
    input: { color: 'white', hover: 'rgba(255, 255, 255, .04)', disabled: 'rgba(255, 255, 255, .35)' },
    inputMobile: { color: darkMain, hover: 'rgba(255, 255, 255, .04)', disabled: 'rgba(255, 255, 255, .35)' },
    get settingsHover() {
      return this.input.hover;
    },
    sidebar: { background: 'rgba(33, 33, 33, .95)', color: darkMain },
    control: darkMain,
    code: { keywords: darkMain, comments: '#3d3d3d', separators: '#5e5e5e', functions: '#9bd5ff', others: 'white' },
  },

  light: {
    type: 'light',
    get isDark() {
      return this.type === 'dark';
    },
    background: '#eeeeee',
    brand: lightMain,
    brandShadow: `0 0 1px ${lightMain}`,
    select: { color: lightMain, optionsBackground: '#e0e0e0', optionsHighlight: '#bdbdbd', heading: '#000544' },
    input: { color: lightMain, hover: 'rgba(8, 58, 140, .04)', disabled: 'rgba(8, 58, 140, .35)' },
    get inputMobile() {
      return this.input;
    },
    get settingsHover() {
      return this.input.hover;
    },
    sidebar: { background: 'rgba(224, 224, 224, .85)', color: lightMain },
    control: lightMain,
    code: { keywords: lightMain, comments: '#cccccc', separators: '#6330bc', functions: '#8191f0', others: '#282828' },
  },
};

export const MyTheme = React.createContext(themes.dark);
