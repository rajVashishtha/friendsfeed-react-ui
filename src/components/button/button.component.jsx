import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  forContainedButton:{
    color:"white",
    backgroundColor:"#71E35F",
    "&:hover":{
        backgroundColor:"#71E35F"
    }
  },
  forOutlinedButton:{
      color:"#71E35F",
      borderColor:"#71E35F"
  }
}));

export default function MaterialButton(props) {
  const classes = useStyles();
  const {text, variant, children, padding,disable=false} = props

  return (
    <div className={classes.root}>
      <Button variant={variant} 
      disabled={disable}
      style={{
          paddingLeft:`${padding}`,
          paddingRight:`${padding}`
      }}
      className={variant === "contained" ? classes.forContainedButton : classes.forOutlinedButton}
      {...props}
      >
        {text}
        {children}
      </Button>
    </div>
  );
}
