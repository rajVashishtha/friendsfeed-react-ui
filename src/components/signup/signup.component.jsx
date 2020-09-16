import React from 'react'
import InputTextField from '../textfield/textfield.component'
import Grid from '@material-ui/core/Grid'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import {withStyles} from '@material-ui/styles'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import MaterialButton from '../button/button.component'
import SwitchLabel from '../switch/switch.component'
import { Typography, FormControl, FormHelperText, InputLabel, Select, MenuItem } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import {VisibilityOutlined, VisibilityOffOutlined, WcOutlined} from '@material-ui/icons'
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import 'fontsource-roboto'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import BasicDatePicker from '../date picker/date-picker.component';
// import $ from 'jquery'
import moment from 'moment'
import axios from 'axios'
import { connect } from 'react-redux';
import {setCurrentUser} from '../../redux/user/user.action'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"


const myStyles = theme =>({
    forIcon :{
        color:"#71E35F",
        fontSize:"30px"
    },
    formControl: {
        margin: 0,
        minWidth: 330,
    },
    inputLabel: {
        "&.Mui-focused": {
          color: "#71E35F"
        }
      },
      select: {
        color: "black",
        "&:after": {
          // changes the bottom textbox border when clicked/focused.  thought it would be the same with input label
          borderColor: "#71E35F"
        }
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
        invalidForm:false,
        selectedDate:new Date(),
        alreadyExist:false,
        shortPassword:false,
        invalidGender:false,
        gender:'',
        loading:false
    }
    changeChecked = () =>{
        this.setState({
            rememberMe: !this.state.rememberMe
        })
        return
    };
    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
          });
          return
      };
      validateForm = () =>{
        const {name, email, password, repeatPassword, gender} = this.state
        if(name === "" || email === "" || password === ""){
            this.setState({
                invalidForm : true,
            })
            return false
        }
        if(gender === ""){
            this.setState({
                invalidForm : false,
                invalidGender:true
            })
            return false
        }
        if(password.length < 6){
            this.setState({
                invalidGender:false,
                shortPassword:true,
                invalidForm : false
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
          return
      }; // end show password

    resetState = ()=>{
        this.setState({
            rememberMe:false,
            name:"",
            email:"",
            password:"",
            repeatPassword:"",
            mismatchPassword:false,
            showPassword:false,
            invalidForm:false,
            selectedDate:new Date(),
            alreadyExist:false,
            gender:'',
            invalidGender:false
        })
        return
    }

    handleSubmit = ()=>{
        if(!this.validateForm()){
            return
        }
        const {name, email, password, selectedDate, gender} = this.state
        const data = {
            name:name,
            email:email,
            password:password,
            gender:gender,
            dob: moment(selectedDate).format("YYYY-MM-DD")
        }
        axios.post('https://friendsfeed.herokuapp.com/api/users/register', data).then(response=>{
            console.log(response)
            const {setCurrentUser, history} = this.props
                
            this.resetState()
                var t = {...response.data.message[0], active :0}
                setCurrentUser(t)
                history.push("/verify")
                return
        },
        (error)=>{
            this.resetState()
                this.setState({
                    alreadyExist:true
                })
            return
        }
        )

        return

    };//end submit

    handleDateChange = (date)=>{
        this.setState({
            selectedDate:date
        })
        return
    };

    handleGenderChange= (event)=>{
        this.setState({
            gender:event.target.value
        })
        return
    };

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
                        this.state.shortPassword?(<Typography color="error" variant="caption" align="center">
                            Password must be atleast 8 characters</Typography>):(null)
                    }
                    {
                        this.state.mismatchPassword?(<Typography color="error" variant="caption" align="center">Mismatch Password</Typography>):(null)
                    }
                    <Grid item>
                    <Grid container spacing={0} alignItems="flex-end">
                        <Grid item style={{paddingBottom:"0px",paddingRight:"10px"}}>
                            <WcOutlined fontSize="small" className={classes.forIcon}/>
                        </Grid>
                        <Grid item style={{marginLeft:"5px"}}>
                        <FormControl fontSize="large" className={classes.formControl} error={this.state.invalidGender}>
                            <InputLabel id="demo-simple-select-error-label" className={classes.inputLabel}>Gender</InputLabel>
                            <Select
                                labelId="demo-simple-select-error-label"
                                id="demo-simple-select-error"
                                value={this.state.gender}
                                onChange={this.handleGenderChange}
                                // renderValue={(value) => `⚠️  - ${value}`}
                                className={classes.select}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={"M"}>Male</MenuItem>
                                    <MenuItem value={"F"}>Female</MenuItem>
                                    <MenuItem value={"O"}>Other</MenuItem>
                                </Select>
                            {
                                this.state.invalidGender?(<FormHelperText>Error</FormHelperText>):(null)
                            }
                        </FormControl>
                        </Grid>
                    </Grid>
                    </Grid>
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
                                <BasicDatePicker selectedDate={this.state.selectedDate} 
                                    handleDateChange={this.handleDateChange} />
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
                    {
                        this.state.loading?(<Loader
                            type="Rings"
                            color="#71E35F"
                            height={80}
                            width={80}
                            visible={true} 
                        />):(null)
                    }
                    </Grid>
                </Grid>
                </form>
            </div>
        )
    }
};// end class component

const mapDispatchToProps = dispatch =>({
    setCurrentUser : user => dispatch(setCurrentUser(user))
  })


export default connect(null,mapDispatchToProps)(withRouter(withStyles(myStyles, {withTheme:true})(SignUp)))