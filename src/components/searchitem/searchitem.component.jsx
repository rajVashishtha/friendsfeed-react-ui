import React from 'react';
import {Paper, Typography, Avatar, Tooltip,IconButton} from '@material-ui/core';
import CallMadeOutlinedIcon from '@material-ui/icons/CallMadeOutlined';
import { withRouter, Link } from 'react-router-dom';


class SearchItem extends React.Component{
    render(){
        const {name, followers, followings, userName, profilePic, userId} = this.props;
        return(
            <div className="search-item-div">
                <Paper elevation={2} className="for-paper" >
                    <div style={{display:"flex",flexDirection:"row"}}>
                        <Avatar src={profilePic} alt="R" style={{width:"60px",height:"60px"}}>

                        </Avatar>
                        <div style={{paddingLeft:"20px"}}>
                            <Typography variant="h5">{name}</Typography>
                            <Typography variant="h7">{userName}</Typography>
                        </div>
                    </div>
                    <div style={{display:"flex",flexDirection:"row"}}>
                        <div style={{paddingLeft:"30px"}}>
                            <Typography variant="h5" align="center">{followers}</Typography>
                            <Typography variant="h7">Followers </Typography>
                        </div>
                        <div style={{paddingLeft:"30px"}}>
                            <Typography variant="h5" align="center">{followings}</Typography>
                            <Typography variant="h7">Followings</Typography>
                        </div>
                        <div>
                            <Tooltip title="View Profile">
                                <Link to={{
                                    pathname: "/profile",
                                    state:{userId : userId}
                                }}>
                                    <IconButton>
                                        <CallMadeOutlinedIcon fontSize="large" />
                                    </IconButton>
                                </Link>
                            </Tooltip>
                        </div>
                    </div>
                    
                </Paper>
        </div>
        )
    }
};

export default withRouter(SearchItem);