import React from 'react'
import InputTextField from '../textfield/textfield.component'
import Grid from '@material-ui/core/Grid'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import {withStyles} from '@material-ui/styles'
import MaterialButton from '../button/button.component'
import SwitchLabel from '../switch/switch.component'
import { Typography } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import {VisibilityOutlined, VisibilityOffOutlined} from '@material-ui/icons'
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import 'fontsource-roboto'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import BasicDatePicker from '../date picker/date-picker.component';
// import $ from 'jquery'


const useStyles = theme =>({
    forIcon :{
        color:"#71E35F",
        fontSize:"30px"
    }
});
class SignUp extends React.Component{
    state={
        rememberMe:false,
        name:"",
        email:"",
        password:"",
        repeatPassword:"",
        mismatchPassword:false,
        showPassword:false,
        invalidForm:false
    }
    changeChecked = () =>{
        this.setState({
            rememberMe: !this.state.rememberMe
        })
    };
    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
          });
      };
      validateForm = () =>{
        const {name, email, password, repeatPassword} = this.state
        if(name === "" || email === "" || password === ""){
            this.setState({
                invalidForm : true,
            })
            return false
        }
        if(password !== repeatPassword){
            this.setState({
                invalidForm:false,
                mismatchPassword:true
            })
            return false
        }
        return true
      };// end validate form


      handleClickShowPassword = () =>{
          this.setState({
              showPassword:!this.state.showPassword
          })
      }; // end show password

    handleSubmit = ()=>{
        if(!this.validateForm()){
            return
        }

    }

    render(){
        const {classes, formWidth} = this.props;
        return(
            <div>
                <form noValidate autoComplete="off">
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    style={{
                        width:`${formWidth}`
                    }}
                    
                >
                    <Grid item>
                        <Typography variant="h6" gutterBottom>
                            Enter Your Details To Sign Up
                         </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <InputTextField value={this.state.name}
                        onChange={this.handleChange}
                        required
                        width="340px" type="text" variant="standard" label="Full Name" name="name" icon={(<PersonOutlineOutlinedIcon className={classes.forIcon} />)} />
                    </Grid>
                    <Grid item xs={12}>
                        <InputTextField value={this.state.email}
                        onChange={this.handleChange}
                        required
                        width="340px" type="email" variant="standard" label="Email" name="email" icon={(<MailOutlineIcon className={classes.forIcon} />)} />
                    </Grid>
                    <Grid item xs={12}>
                        <InputTextField
                        required
                        onChange={this.handleChange}
                        type={this.state.showPassword?"text":"password"}
                        InputProps={{
                            endAdornment:(
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={this.handleClickShowPassword}
                                >
                                  {this.state.showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                                </IconButton>
                              </InputAdornment>
                                  )
                          }}
                        value={this.state.password} width="280px" name="password" variant="standard" label="Create Password" icon={(<LockOutlinedIcon className={classes.forIcon}/>)} />
                    </Grid>
                    <Grid item xs={12}>
                        <InputTextField
                        required
                        onChange={this.handleChange}
                        type={this.state.showPassword?"text":"password"}
                        InputProps={{
                            endAdornment:(
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={this.handleClickShowPassword}
                                >
                                  {this.state.showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                                </IconButton>
                              </InputAdornment>
                                  )
                          }}
                          
                        value={this.state.repeatPassword} width="280px"  name="repeatPassword" variant="standard" label="Repeat Password"
                         icon={(<LockOutlinedIcon fontSize="large" className={classes.forIcon}/>)} />
                    </Grid>
                    {
                        this.state.mismatchPassword?(<Typography color="error" variant="caption" align="center">Mismatch Password</Typography>):(null)
                    }
                    <Grid item>
                        <Grid container spacing={1} alignItems="flex-end" >
                            <Grid item style={{
                                paddingBottom:"10px"
                            }}>
                                <CalendarTodayOutlinedIcon fontSize="small" className={classes.forIcon} />
                    
                            </Grid>
                            <Grid item style={{
                                marginLeft:"8px"
                            }}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <BasicDatePicker />
                            </MuiPickersUtilsProvider>
                            </Grid>
                        </Grid>
                        
                    </Grid>
                    {
                        this.state.invalidForm?(<Typography color="error" variant="caption" align="center">Invalid Form Details</Typography>):(null)
                    }
                    <Grid item style={{
                        marginTop:"20px"
                    }}>
                        <SwitchLabel label="Remember me" name="remember_me" checked={this.state.rememberMe} onChange={this.changeChecked}  />
                    </Grid>
                    <Grid item style={{
                        marginTop:"20px"
                    }}>
                        <MaterialButton onClick={this.handleSubmit} text="Sign Up" variant="contained" padding="7rem"/>
                    </Grid>
                </Grid>
                </form>
            </div>
        )
    }
};// end class component

export default withStyles(useStyles)(SignUp)