import React from 'react'
import './profileinfo.style.scss'
import { Avatar, Typography, IconButton } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

class ProfileInfo extends React.Component{

    render(){

        return(
            <div className="profileinfo_div">
                <Avatar src="https://picsum.photos/200/300" className="profileinfo_div_avatar"/>
                <div className="profileinfo_div_bio">
                    <div>
                        <Typography variant="h5" component="span" style={{
                            fontWeight:200,
                            fontSize:"30px",
                            marginLeft:"20px"
                        }}>
                            UserName
                        </Typography>
                        <IconButton style={{
                            paddingBottom:"10px",
                            marginLeft:"60px",
                        }}>
                            <PersonIcon />
                        </IconButton>
                    </div>
                    <div className="profileinfo_div_bio_spandiv">
                        <span >
                            <b>3</b> Following
                        </span>
                        <span >
                            <b>4</b> Followers
                        </span>
                        <span >
                            <b>0</b> Posts
                        </span>
                    </div>
                    <div className="profileinfo_div_bio_aboutbio">
                        <Typography variant="button" style={{
                            marginBottom:"5px"
                        }}>
                            Raj Vashihst
                        </Typography>
                        <Typography variant="body1" component="pre">
                            Er. Raj vashishtha<br />
                            Birthday<span role="img" aria-label="emoji">🎂🎉🎁</span> bash on feb five ✋<br />
                            Coding is life<br/>
                            PUBG LOVER✌️
                        </Typography>

                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileInfo