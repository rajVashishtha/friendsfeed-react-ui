import { Typography, InputAdornment,IconButton } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'
import MaterialButton from '../../components/button/button.component'
import Header from '../../components/header/header.component'
import InputTextField from '../../components/textfield/textfield.component'
import {VisibilityOutlined, VisibilityOffOutlined} from '@material-ui/icons'
import './forgotpassword.style.scss'
import axios from 'axios'
import {setCurrentUser }from '../../redux/user/user.action'
import { withRouter } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {Snackbar} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class ForgotPasswordPage extends React.Component{
    state={
        input:true,
        emailSetter:"",
        email:"",
        otp:"",
        password:"",
        confirm:"",
        showPassword:false,
        invalid:false,
        invalidEmail:false,
        invalidOTP:false,
        loader:false,
        snackbar:false
    }
    componentDidMount(){
        const {currentUser} = this.props
        console.log(currentUser)
        if(currentUser !== null){
            this.setState({
                input:false,
                email:currentUser.user[0].email,
            })
            axios.post('https://friendsfeed.herokuapp.com/api/users/resetPasswordRequest',{email:currentUser.user[0].email}).then(response=>{
                    this.setState({
                        email:currentUser.user[0].email,
                    })
            },error=>{
                this.setState({
                    invalidEmail:true
                })
            });//end axios call
        }
    };
    emailSubmit = (e)=>{
        e.preventDefault();
        this.setState({
            loader:true
        })
        axios.post('https://friendsfeed.herokuapp.com/api/users/resetPasswordRequest',{email:this.state.emailSetter}).then(response=>{
                this.setState({
                    email:this.state.emailSetter,
                    emailSetter:"",
                    loader:false
                })
            },error=>{
                this.setState({
                    invalidEmail:true,
                    loader:false
                })
                
            });//end axios call
        
    };
    handleClickShowPassword = ()=>{
        this.setState({
            showPassword:!this.state.showPassword
        })
    };
    handleEmailSetter = (e)=>{
        this.setState({
            emailSetter:e.target.value
        })
    };
    handleChange = (e)=>{
        const {name,value} = e.target
        this.setState({
            [name]:value
        })
    };
    validateSubmit = ()=>{
        const {password, confirm} = this.state;
        if(password !== confirm || password.length < 6){
            this.setState({
                invalid:true
            })
            return false
        }
        this.setState({
            invalid:false
        })
        return true
    };
    handleSnackbarClose = ()=>{
        const {setCurrentUser,history} = this.props
        setCurrentUser(null)
        history.push("/")
    }
    handleSubmit = (e)=>{
        e.preventDefault()
        if(!this.validateSubmit()){
            return
        }
        this.setState({
            loader:true
        })
        const {email, otp, password} = this.state;
        const data = {email:email,otp:otp,password:password};
        axios.post('https://friendsfeed.herokuapp.com/api/users/resetPassword',data).then(response=>{
            this.setState({
                snackbar:true,
                loader:false
            })
        }).catch(error=>{
            this.setState({
                invalid:false,
                invalidOTP:true,
                loader:false
            })
        })
    }
    render(){
        const {currentUser} = this.props
        return(
            <div>
                {
                    currentUser?(<Header active="profile"/>):(<div className="login_user">
                    <Typography variant="h4" style={{color:"white",letterSpacing:"5px"}}>friendsfeed</Typography>
                </div>)
                }
                <div className="forgot_password_form" style={currentUser?({marginTop:"100px",left:"35vw",position:"fixed"}):(null)}>
                {
                    this.state.email === ""?(
                        <div>
                            <Typography align="center">Enter email to send OTP</Typography>
                            {
                                this.state.invalidEmail?(<Typography color="error" align="center">Invalid email</Typography>):(null)
                            }
                            <form className="for_email" onSubmit={this.emailSubmit}>
                                <InputTextField type="email" value={this.state.emailSetter} onChange={this.handleEmailSetter}
                                 variant="standard" label="Email" required/>
                                {
                                    this.state.loader?(<Loader
                                        type="Rings"
                                        color="#71E35F"
                                        height={80}
                                        width={80}
                                        visible={true} 
                                    />):(<MaterialButton variant="outlined" text="Send" type="submit"/>)
                                }
                                
                            </form>
                        </div>
                    ):(
                        <div>
                            <Typography align="center">OTP has been send to {this.state.email}</Typography>
                            <form className="after_email" onSubmit={this.handleSubmit}>
                                <InputTextField type="text" variant="standard" label="OTP" name="otp" onChange={this.handleChange} value={this.state.otp} width="235px" required/>
                                <InputTextField onChange={this.handleChange}  type={this.state.showPassword?"text":"password"}
                                value={this.state.password} name="password"
                                variant="standard" label="New Password"
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
                                required/>
                                <InputTextField onChange={this.handleChange} 
                                value={this.state.confirm}
                                type={this.state.showPassword?"text":"password"} name="confirm" variant="standard" label="Confirm Password"
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
                                required/>
                            {
                                this.state.invalid?(<Typography align="center" color="error">Mismatch password or short password </Typography>):(null)
                            }
                            {
                                this.state.invalidOTP?(<Typography align="center" color="error">Invalid OTP</Typography>):(null)
                            }

                            {
                                this.state.loader?(<Loader
                                    type="Rings"
                                    color="#71E35F"
                                    height={80}
                                    width={80}
                                    visible={true} 
                                />):(<MaterialButton variant="outlined" text="Send" type="submit"/>)
                            }
                                
                                
                            </form>
                        </div>
                    )
                }
                </div>
                <Snackbar open={this.state.snackbar} autoHideDuration={3000} onClose={this.handleSnackbarClose}>
                    <Alert onClose={this.handleSnackbarClose} severity="success">
                        OTP Verified! Redirecting to login page...
                    </Alert>
                </Snackbar>  
            </div>
        )
    }
};
const mapStateToProps = (state)=>({
    currentUser: state.user.currentUser
  })
const mapDispatchToProps = dispatch =>({
setCurrentUser : user => dispatch(setCurrentUser(user))
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ForgotPasswordPage))