/* eslint-disable react/no-danger */

import React, { useContext } from 'react';
import ReactDOMServer from 'react-dom/server';
import { makeStyles } from '@material-ui/core';
import Highlighter from 'react-highlight-words';
import { code, specialCharacters } from './util';
import { MyTheme, themes } from '../../theme/theme';

const rawCode = code();
const { all, keywords, functions, comments } = specialCharacters();
const lightHighlight = highlight(themes.light);
const darkHighlight = highlight(themes.dark);

const lightJsx = ReactDOMServer.renderToString(
  <Highlighter textToHighlight={rawCode} searchWords={all} caseSensitive autoEscape highlightTag={lightHighlight} />,
);
const darkJsx = ReactDOMServer.renderToString(
  <Highlighter textToHighlight={rawCode} searchWords={all} caseSensitive autoEscape highlightTag={darkHighlight} />,
);

const useStyles = theme =>
  makeStyles({
    code: {
      textAlign: 'start',
      fontSize: '2.5vw',
      '@media only screen and (min-width: 768px)': {
        fontSize: '1.25vw',
      },
      color: theme.code.others,
    },
  });

export const CodeText = React.memo(() => {
  const theme = useContext(MyTheme);
  const classes = useStyles(theme)();

  return (
    <pre>
      <code>
        <div
          className={classes.code}
          dangerouslySetInnerHTML={theme.isDark ? { __html: darkJsx } : { __html: lightJsx }}
        />
      </code>
    </pre>
  );
});

function highlight(theme) {
  return ({ children }) => {
    let color = theme.code.separators;
    if (functions.includes(children)) color = theme.code.functions;
    else if (keywords.includes(children)) color = theme.code.keywords;
    else if (comments.includes(children)) color = theme.code.comments;
    return <span style={{ color }}>{children}</span>;
  };
}
