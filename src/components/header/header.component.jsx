import React from 'react';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import clsx from 'clsx';
import FreeSolo from '../autocomplete/autocomplete.component'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

import CustomizedMenus from '../menu/menu.component'

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles(theme =>({
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
        width:"70%"
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
}));
const StyledBadge = withStyles((theme) => ({
    badge: {
      padding: '0 4px',
      backgroundColor:"#71e35f"
    },
  }))(Badge);
const Alert = ()=>{
    alert("hello")
}
const menuItems = [
    {
        text:"Logout",
        icon:(<ExitToAppOutlinedIcon fontSize="medium" />),
        onClick:null
    },
    {
        text:"Setting",
        icon:(<SettingsIcon fontSize="medium" />),
        onClick:null
    },
    {
        text:"Privacy",
        icon:(<LockOutlinedIcon fontSize="medium" />),
        onClick:null
    },
    {
        text:"About us",
        icon:(<PermIdentityIcon fontSize="medium" />),
        onClick:Alert
    }

]

const Header = ({active})=>{
    const classes = useStyles()
    return(
        <div className={classes.grow}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.forToolbar}>
                    <IconButton className={active === "home" ? clsx(classes.menuButton,classes.activeMenuButton) : classes.menuButton}
                      size="medium" >
                        <HomeOutlinedIcon  className={active === "home" ? clsx(classes.forIcon ,classes.active) : classes.forIcon} />
                    </IconButton>
                    <IconButton className={active === "trending" ? clsx(classes.menuButton,classes.activeMenuButton) : classes.menuButton}  size="medium">
                        <TrendingUpOutlinedIcon className={active === "trending" ? clsx(classes.forIcon ,classes.active) : classes.forIcon}/>
                    </IconButton>
                    <IconButton className={active === "notifications" ? clsx(classes.menuButton,classes.activeMenuButton) : classes.menuButton}  size="medium">
                        <StyledBadge badgeContent={10} color="secondary">
                            <NotificationsNoneOutlinedIcon className={active === "notifications" ? clsx(classes.forIcon ,classes.active) : classes.forIcon}/>
                        </StyledBadge>
                    </IconButton>
                    <IconButton className={active === "message" ? clsx(classes.menuButton,classes.activeMenuButton) : classes.menuButton}  size="medium">
                        <StyledBadge badgeContent={10} color="secondary">
                            <MailOutlineOutlinedIcon className={active === "message" ? clsx(classes.forIcon ,classes.active) : classes.forIcon} />
                        </StyledBadge>
                    </IconButton>
                    {/* <div className={classes.search}>
                        <div className="">
                            <IconButton className={classes.searchIcon}>
                                <SearchIcon />
                            </IconButton>
                        </div>
                            <InputBase
                            placeholder="Search on friendsfeed..."
                            style={{
                                width:"300px"
                            }}
                            classes={{
                                root: classes.inputRoot,    
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            />
                    </div> */}

                    <FreeSolo />
                    <div className={classes.menuButton}>
                        <div style={{
                            display:"flex",
                            flexDirection:"row",
                            justifyContent:"space-around",
                            alignItems:"center",
                            
                        }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatarGreen} />
                        <Typography variant="subtitle1" style={{
                            color:"#888888",
                            marginLeft:"10px",
                            fontWeight:"bolder"
                        }}>
                            Name
                        </Typography>
                        </div>
                    </div>
                    <CustomizedMenus items={menuItems} buttonIcon={(<ArrowDropDownIcon fontSize="large" />)} />

                </Toolbar>
            </AppBar>
        </div>
    )
};

export default Header