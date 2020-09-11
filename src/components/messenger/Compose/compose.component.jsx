import React from 'react';
import './Compose.css';
import { TextField } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'

const CssTextField = withStyles({
  root: {
    '& .MuiInput-underline:after': {
      borderBottomColor: '#71E35F',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#71E35F',
      },
    },
  },
})(TextField);

export default function Compose(props) {
    return (
      <div className="compose">
        
        <CssTextField id="compose_message" placeholder="Enter your message.." className="compose-input" multiline={true} rows={1} autoFocus={true} rowsMax={5} />

        {
          props.rightItems
        }
      </div>
    );
}