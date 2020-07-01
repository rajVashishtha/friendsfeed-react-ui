import React from 'react'
import InputTextField from '../textfield/textfield.component'
import Grid from '@material-ui/core/Grid'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {withStyles} from '@material-ui/styles'
import MaterialButton from '../button/button.component'
import SwitchLabel from '../switch/switch.component'
import { Typography } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import {VisibilityOutlined, VisibilityOffOutlined} from '@material-ui/icons'
import {connect} from 'react-redux';
import {setCurrentUser}  from '../../redux/user/user.action';
import {withRouter} from 'react-router-dom';
import 'fontsource-roboto'
// import $ from 'jquery'

const useStyles = theme =>({
    forIcon :{
        color:"#71E35F",
        fontSize:"30px"
    }
});
class SignIn extends React.Component{
    state={
        rememberMe:false,
        email:"",
        password:"",
        wrongPassword:false,
        wrongEmail:false,
        forgotPassword:false
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
      validateForm = (val) =>{
        const {email, password} = val
        if(email === "" || password === ""){
            this.setState({
                invalidForm : true
            })
            return false
        }
        return true
      };
      validateResult = (result) =>{
        const message = result.message;
        console.log(result)
        console.log(message)
        if(message === "Email doesn't exist" || message.email){
            this.setState({
                wrongEmail : true
            });
            return false
        }
        if(message === "Password Wrong"){
            this.setState({
                wrongPassword:true
            });
            return false
        }
        return true
      }
      handleSubmit = async (event) =>{
          event.preventDefault();
          const {setCurrentUser} = this.props;
          const {email, password} = this.state;
          if(!this.validateForm({email, password})){
            return
          }
            const data = JSON.stringify({email, password})
            console.log(data)
            // $.ajax({
            //     url:'https://diready.co/api/login',
            //     type:'POST',
            //     data: data,
            //     datatype: 'application/json',
            //     cache:false,
            //     success:function(data){
            //         console.log(data)
            //     },
            //     error:function(xhr, status, err){
            //         console.log(status, err, xhr)
            //     }
            // })

          const requestOptions = {
            method: 'POST',
            mode:'cors',
            headers: { 
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'X-Custom-Header',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
        };//requestOptions
        console.log(requestOptions.body)
        const response = await fetch('https://diready.co/api/login', requestOptions)
        const result = await response.json()
            if(!this.validateResult(result)){
                return false
            }
        setCurrentUser(result.message[0])
        this.setState({
            email:"",
            password:"",
            rememberMe:false,
            wrongEmail:false,
            wrongPassword:false,
            invalidForm:false,
            showPassword:false
        })
    };
    handleClickShowPassword = () =>{
        this.setState({
            showPassword: !this.state.showPassword
        })
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
                            PLEASE LOGIN 
                         </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <InputTextField value={this.state.email}
                        onChange={this.handleChange}
                        required
                        width="340px" type="text" variant="standard" label="Email" name="email" icon={(<MailOutlineIcon className={classes.forIcon} />)} />
                    </Grid>
                    {
                        this.state.wrongEmail === true ? 
                        (<Typography variant="caption" color="error" gutterBottom>Invalid Email</Typography>)
                         : (null)
                    }

                    <Grid item xs={12}>
                        <InputTextField
                        required
                        onChange={this.handleChange}
                        value={this.state.password}
                        type={this.state.showPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment:(
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={this.handleClickShowPassword}
                                  // onMouseDown={handleMouseDownPassword}
                                >
                                  {this.state.showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                                </IconButton>
                              </InputAdornment>
                                  )
                          }}
                        width="280px"  name="password" variant="standard" label="Password" icon={(<LockOutlinedIcon className={classes.forIcon}/>)} />
                    </Grid>
                    {
                        this.state.wrongPassword === true ? 
                        (<Typography variant="caption" color="error" gutterBottom>Wrong Password</Typography>)
                         : (null)
                    }
                    {
                        this.state.invalidForm === true ? 
                        (<Typography variant="caption" color="error" gutterBottom>Invalid Details</Typography>)
                         : (null)
                    }
                    <Grid item style={{
                        marginTop:"20px"
                    }}>
                        <SwitchLabel label="Remember me" name="remember_me" checked={this.state.rememberMe} onChange={this.changeChecked}  />
                    </Grid>
                    <Grid item style={{
                        marginTop:"20px"
                    }}>
                        <MaterialButton onClick={this.handleSubmit} text="Login" variant="contained" padding="7rem"/>
                    </Grid>
                    
                </Grid>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch =>({
    setCurrentUser : user => dispatch(setCurrentUser(user))
  })

export default connect(null, mapDispatchToProps)(withStyles(useStyles)(withRouter(SignIn)))