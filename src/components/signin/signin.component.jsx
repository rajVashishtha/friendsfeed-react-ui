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
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
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
        forgotPassword:false,
        loading:false
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
          if(result.status === 404){
            this.setState({
                wrongEmail : true,
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
          this.setState({
            loading:true
        })
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
        const response = await fetch('https://friendsfeed.herokuapp.com/api/users/login', requestOptions)
        const result = await response.json()
        console.log("this->",result)
        this.setState({
            loading:false
        })
        if(!this.validateResult(result)){
            setCurrentUser(null)
            return
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
        this.props.history.push("/home")
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
                        (<Typography variant="caption" color="error" gutterBottom>Invalid Credentials</Typography>)
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
                        
                    {
                        this.state.loading?(<Loader
                            type="Rings"
                            color="#71E35F"
                            height={80}
                            width={80}
                            visible={true} 
                        />):(<MaterialButton onClick={this.handleSubmit} text="Login" variant="contained" padding="7rem"/>)
                    }
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