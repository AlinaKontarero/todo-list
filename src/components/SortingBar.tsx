import * as React from 'react'
import { makeid } from '../utlis/makeid';
import {Select, MenuItem, IconButton, createStyles, makeStyles, Theme } from '@material-ui/core';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

interface Props {
  disabled: boolean
  handleSort: () => void
  handleDirection: () => void
  direction: string 
  sortingProperty: string
  handleSortingProperty: (property: string) => void
}

const SortingBar = (props: Props) => { 
  const classes = useStyles();
  return (
    <div className='columns is-variable is-2 is-vcentered'>
      <div className='column'>Sort by:</div>
      <div className='column is-pulled-left is-3'>
        <Select
          className={classes.root}
          value={props.sortingProperty}
          onChange={(e) => props.handleSortingProperty(e.target.value as string)}
          MenuProps={{ disableScrollLock: true}}
          disabled={props.disabled}
          color='secondary'
        >
          <MenuItem value={'name'} key={makeid()}>name</MenuItem>
          <MenuItem value={'priority'} key={makeid()}>priority</MenuItem>
        </Select>
      </div>
      <div className='column is-pulled-right is-1'>
        <IconButton 
          disabled={props.disabled}
          onClick={props.handleDirection} 
          color='inherit'
          >
          {props.direction === 'DESC' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon /> }
        </IconButton>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
  }),
);

export default SortingBar