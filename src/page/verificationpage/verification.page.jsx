import { IconButton, Typography } from '@material-ui/core'
import React from 'react'
import '../frontpage/frontpage.style.scss'
import './verification.style.scss'
import InputTextField from '../../components/textfield/textfield.component'
import Header from '../../components/header/header.component'
import {Grid} from '@material-ui/core'
import { SendOutlined } from '@material-ui/icons'
import axios from 'axios'
import { connect } from 'react-redux'
import {setCurrentUser} from '../../redux/user/user.action'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { withRouter } from 'react-router-dom'
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}




class VerificationPage extends React.Component{
    state={
        value: "",
        short:false,
        wrong:false,
        snackbar:false
    }
    handleSnackbarClose = ()=>{
        const {setCurrentUser, history} = this.props
        setCurrentUser(null)
        this.setState({
            snackbar:false
        })
        history.push("/")
        return
    }
    handleChange = (event)=>{
        const {name, value} = event.target
        this.setState({
            [name]:value
        })
    };
    verifyOTP = (val)=>{
        if(val.length < 6){
                this.setState({
                    short:true
                })
                return false
        }
        this.setState({
            short:false
        })
        return true
    }
    handleSubmit = ()=>{
        if(!this.verifyOTP(this.state.value)){
            return
        }
        const {currentUser} = this.props
        const data= { 
            otp:this.state.value,
            user_id: currentUser.user_id
        }
        axios.post('https://friendsfeed.herokuapp.com/api/users/verifyOtp', data).then(response=>{
            if(response.status === 404){
                this.setState({
                    wrong:true
                })
                return
            }
            else{
                this.setState({
                    wrong:false,
                    snackbar:true
                })   
            }
        });//end axios
        
    }
    
    render(){
        return(
            <div className="verification-main">
                <Header active={null} />
                <div className="for-email-verify">
                    <Typography >Verify your email to continue</Typography>
                    <Typography>OPT has been sent to your email</Typography>
                    {
                        this.state.short?(<Typography align="center" color="error">At least 6 character</Typography>):(null)
                    }
                    {
                        this.state.wrong?(<Typography color="error" >Invalid OTP</Typography>):(null)
                    }
                    <div>
                        <Grid container direction="row" alignItems="center">
                            <Grid item>
                                <InputTextField value={this.state.value} name="value" onChange={this.handleChange} type="text" variant="outlined" label="Input OTP" />
                            </Grid>
                            <Grid item>
                                <IconButton onClick={this.handleSubmit}>
                                    <SendOutlined />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </div>
                </div>        
                <Snackbar open={this.state.snackbar} autoHideDuration={2000} onClose={this.handleSnackbarClose}>
                    <Alert onClose={this.handleSnackbarClose} severity="success">
                        Email Verified !
                    </Alert>
                </Snackbar>        
            </div>
        )
    }
};
const mapStateToProps = state =>({
    currentUser : state.user.currentUser
});
const mapDispatchToProps = dispatch =>({
    setCurrentUser : user => dispatch(setCurrentUser(user))
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VerificationPage))