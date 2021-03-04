import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core';
import Highlighter from 'react-highlight-words';
import { code, specialCharacters } from './util';
import { MyTheme, themes } from '../../theme/theme';

const rawCode = code();
const { all, keywords, functions, comments } = specialCharacters();
const lightHighlight = highlight(themes.light);
const darkHighlight = highlight(themes.dark);

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

const Light = React.memo(() => (
  <Highlighter textToHighlight={rawCode} searchWords={all} caseSensitive autoEscape highlightTag={lightHighlight} />
));

const Dark = React.memo(() => (
  <Highlighter textToHighlight={rawCode} searchWords={all} caseSensitive autoEscape highlightTag={darkHighlight} />
));

export const CodeText = React.memo(() => {
  const theme = useContext(MyTheme);
  const classes = useStyles(theme)();

  return (
    <pre>
      <code>
        <div className={classes.code}>{theme.isDark ? <Dark /> : <Light />}</div>
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
