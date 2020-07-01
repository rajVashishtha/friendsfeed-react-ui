import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {withStyles} from '@material-ui/styles'
import {green} from '@material-ui/core/colors'

const GreenSwitch = withStyles({
    switchBase: {
      color: green[300],
      '&$checked': {
        color: green[500],
      },
      '&$checked + $track': {
        backgroundColor: green[500],
      },
    },
    checked: {},
    track: {},
  })(Switch)

export default function SwitchLabels({name, checked, onChange, label}) {
  return (
      <FormControlLabel
        control={<GreenSwitch checked={checked} onChange={onChange} name={name} />}
        label={label}
      />
      
  );
}
