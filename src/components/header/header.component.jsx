import React from 'react';
import { fade, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import clsx from 'clsx';
import VirtualizedAutocomplete from '../autocomplete/autocomplete.component'
import CustomizedMenus from '../menu/menu.component'
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {setCurrentUser} from '../../redux/user/user.action'

import {Link, withRouter} from 'react-router-dom'
import { connect } from 'react-redux';

const useStyles = theme=>({
    active:{
        color:"#71E35F"
    },
    appBar:{
        backgroundColor:"white",
        display:"flex",
        justifyContent:"center",
        justifyItems:"center",
        alignItems:"center"
    },
    forToolbar:{
        display:"flex",
        justifyContent:"space-around",
        width:"80%",
        ["@media (max-width:1000px)"]:{
            width:"100%"
        }
    },
    forIcon:{
        fontSize:"35px",
        fontWeight:"100"
    },
    grow: {
        flexGrow: 1,  
      },
      activeMenuButton:{
        borderBottom:"1px solid #71E35F"
      },
      menuButton: {
        marginRight: theme.spacing(2),
        fontWeight:"100"
      },
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "#E8E8EC",
        '&:hover': {
          backgroundColor: fade("#71E35F"),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      avatarGreen:{
          color:"#fff",
          backgroundColor:"#71E35F",
          cursor:"pointer"
      },
      inputRoot: {
        color: 'primary',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '10rem',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
});
const StyledBadge = withStyles((theme) => ({
    badge: {
      padding: '0 4px',
      backgroundColor:"#71e35f"
    },
  }))(Badge);
const Alert = ()=>{
    alert("hello")
}



class Header extends React.Component{
    signOut = ()=>{
        const {setCurrentUser, history} = this.props
        setCurrentUser(null)
        history.push("/")
    }
    state={
            menuItems:[
                {
                    text:"Logout",
                    icon:(<ExitToAppOutlinedIcon  />),
                    onClick:this.signOut
                },
                {
                    text:"Setting",
                    icon:(<SettingsIcon  />),
                    onClick:null
                },
                {
                    text:"Privacy",
                    icon:(<LockOutlinedIcon  />),
                    onClick:null
                },
                {
                    text:"About us",
                    icon:(<PermIdentityIcon />),
                    onClick:Alert
                }
            
            ],
    }
    render(){
        const {classes, active, currentUser} = this.props
        return(
            <div className={classes.grow}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.forToolbar}>
                    <Link to="/home" style={{textDecoration:"none"}}>
                        <IconButton className={active === "home" ? clsx(classes.menuButton,classes.activeMenuButton) : classes.menuButton}
                        size="medium" >
                            <HomeOutlinedIcon  className={active === "home" ? clsx(classes.forIcon ,classes.active) : classes.forIcon} />
                        </IconButton>
                    </Link>
                    <IconButton className={active === "trending" ? clsx(classes.menuButton,classes.activeMenuButton) : classes.menuButton}  size="medium">
                        <TrendingUpOutlinedIcon className={active === "trending" ? clsx(classes.forIcon ,classes.active) : classes.forIcon}/>
                    </IconButton>
                    <IconButton className={active === "notifications" ? clsx(classes.menuButton,classes.activeMenuButton) : classes.menuButton}  size="medium">
                        <StyledBadge badgeContent={10} color="secondary">
                            <NotificationsNoneOutlinedIcon className={active === "notifications" ? clsx(classes.forIcon ,classes.active) : classes.forIcon}/>
                        </StyledBadge>
                    </IconButton>
                    <Link to="/message" style={{textDecoration:"none"}}>
                    <IconButton className={active === "message" ? clsx(classes.menuButton,classes.activeMenuButton) : classes.menuButton}  size="medium">
                        <StyledBadge badgeContent={10} color="secondary">
                            <MailOutlineOutlinedIcon className={active === "message" ? clsx(classes.forIcon ,classes.active) : classes.forIcon} />
                        </StyledBadge>
                    </IconButton>
                    </Link>
                    {
                        active !== null ?(<VirtualizedAutocomplete />):(null)
                    }
                    {/* <FreeSolo /> */}
                    <div className={classes.menuButton}>
                        <div style={{
                            display:"flex",
                            flexDirection:"row",
                            justifyContent:"space-around",
                            alignItems:"center",
                            paddingBottom:"5px",
                            borderBottom: active === "profile" ? "2px solid #71E35F" :""
                        }}>
                        <Link to="/profile" style={{
                            textDecoration:"none"
                        }}>
                            <Avatar alt={active===null?(currentUser?(currentUser.email):("Raj")):("Remy Sharp")} src="/static/images/avatar/1.jpg" className={classes.avatarGreen} />
                        </Link>
                        <Typography variant="subtitle1" style={{
                            color:"#888888",
                            marginLeft:"10px",
                            fontWeight:"bolder"
                        }}>
                            {
                                active ===null?(currentUser?(currentUser.email):(null)):("Name")
                            }
                        </Typography>
                        </div>
                    </div>
                    <CustomizedMenus items={this.state.menuItems} buttonIcon={(<ArrowDropDownIcon fontSize="large" />)} />

                </Toolbar>
            </AppBar>
        </div>
        )
    }
}

const mapStateToProps= (state)=>({
    currentUser:state.user.currentUser
})

const mapDispatchToProps = dispatch =>({
    setCurrentUser : user => dispatch(setCurrentUser(user))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles, {withTheme:true})(Header)))