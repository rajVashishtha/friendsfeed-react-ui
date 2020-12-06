import React from 'react'
import './profileinfo.style.scss'
import { Avatar, Typography, IconButton } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

class ProfileInfo extends React.Component{

    render(){
        const {userName, Name, followers, followings, postsCount, Bio} = this.props;
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
                           {userName}
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
                            <b>{followings}</b> Following
                        </span>
                        <span >
                            <b>{followers}</b> Followers
                        </span>
                        <span >
                            <b>{postsCount}</b> Posts
                        </span>
                    </div>
                    <div className="profileinfo_div_bio_aboutbio">
                        <Typography variant="button" style={{
                            marginBottom:"5px"
                        }}>
                            {Name }
                        </Typography>
                        <Typography variant="body1" component="pre">
                            {Bio}
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