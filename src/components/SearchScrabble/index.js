import React, {useEffect, useState} from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Input, List, ListItem, ListItemText, Typography, useMediaQuery } from '@material-ui/core'
import Image from 'material-ui-image';
import header from '../../static/header.png';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  image: {
    width: 'inherit',
    marginBottom: 20,
  },
  list: {
    width: '80%',
  },
  inline: {
    display: 'inline',
    textOverflow: 'ellipsis'
  },
}));

function SearchScrabble () {
  const classes = useStyles();
  const [searchWord, setSearchWord] = useState('');
  const [matchingWords, setMatchingWords] = useState([]);
  const isDesktop = useMediaQuery('(min-width:800px)');

  useEffect(() => {
      fetch(`http://localhost:3000/getMatchingWords?word=${searchWord}`)
        .then(res => res.json())
        .then(matchingWords => {
          setMatchingWords(matchingWords);
        })
        .catch(() => []);
  }, [searchWord]);

  return (
    <div className={classes.root}>
    { isDesktop && (
      <Image 
      src={header}
      aspectRatio={(50/9)}
      className={classes.image}/>
    )}
      <Input 
        autoFocus= {true}
        className={classes.input}
        color="primary" 
        placeholder="Search here"
        onChange={(e) => setSearchWord(e.target.value)} />
        {matchingWords && (
          <List className={classes.list}> 
           { matchingWords.slice(0, 10).map((word, index) => (
              <ListItem alignItems="flex-start" key={word.word}>
                <ListItemText
                 primary={word.word} 
                 secondary={
                   index < 5 && (
                    <>
                      <Typography 
                        component="span"
                        className={classes.inline}
                      >
                        {word.description}
                      </Typography>
                    </>
                   )
                 }
                 />
              </ListItem>
          ))}
          </List>
        )}
    </div>
  )
}

export default SearchScrabble