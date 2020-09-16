import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {createMuiTheme} from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {withStyles, ThemeProvider} from '@material-ui/styles'

const CssKeyboardDatePicker = withStyles({
    root: {
        '& .MuiStandardInput-root':{
            '& fieldset':{
                width:"340px"
            }
        },
      '& label.Mui-focused': {
        color: "#71E35F",
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: "#71E35F",
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: "#71E35F",
        },
        '&:hover fieldset': {
          borderColor: "#71E35F",
        },
        '&.Mui-focused fieldset': {
          borderColor: "#71E35F",
        },
      },
    },
  })(KeyboardDatePicker);

  const materialTheme = createMuiTheme({
    overrides: {
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: "#71E35F",
        },
      },
      MuiPickersCalendarHeader: {
        switchHeader: {
          // backgroundColor: lightBlue.A200,
          // color: "white",
        },
      },
      MuiPickersDay: {
        day: {
          color: "#71E35F",
        },
        yearSelected:{
            color: "#71E35F"
        },
        daySelected: {
          backgroundColor: "#71E35F",
          "&:hover":{
            backgroundColor: "#71E35F"
          }
        },
        dayDisabled: {
          color: "#888888",
        },
        current: {
          color: "#71E35F",
        },
      },
      MuiPickersModal: {
        dialogAction: {
          color: "#71E35F",
        },
      },
    },
  });


export default function BasicDatePicker({selectedDate, handleDateChange}) {
  // The first commit of Material-UI
 

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <ThemeProvider theme={materialTheme}>
            <CssKeyboardDatePicker
            variant="inline"
            disableFuture
            format="MM/dd/yyyy"
            margin="normal"
            id="date-of-birth"
            label="Date of Birth"
            value={selectedDate}
            onChange={handleDateChange}
            inputProps={{
                style:{
                    width:"285px"
                }
            }}
            KeyboardButtonProps={{
                'aria-label': 'change date',
            }}
            />
        </ThemeProvider>
       
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
