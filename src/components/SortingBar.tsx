import * as React from 'react'
import { ITask } from '../types/types';
import Task from './Task';
import { makeid } from '../utlis/makeid';
import { InputLabel, Select, MenuItem, IconButton } from '@material-ui/core';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

interface Props {
  disabled: boolean
}

const SortingBar = (props: Props) => { 
  return (
    <div className='columns is-variable is-2'>
      <div className='column is-narrow'>Sort by: </div>
      <div className='column is-pulled-left'>
        <Select
          id="demo-simple-select"
          value={'age'}
          onChange={() => console.log('selecting')}
          MenuProps={{ disableScrollLock: true}}
          disabled={props.disabled}
          >
          <MenuItem value={'name'} key={makeid()}>name</MenuItem>
          <MenuItem value={'priority'} key={makeid()}>priority</MenuItem>
        </Select>
      </div>
      <div className='column is-pulled-right'>
        <IconButton 
          disabled={props.disabled}
          onClick={() => console.log('hello')} 
          color='inherit'
          >
          {props.disabled ? <ArrowDropUpIcon /> : <ArrowDropDownIcon /> }
        </IconButton>
      </div>
    </div>
  )
  }

export default SortingBar