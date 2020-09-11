import React from 'react'
import './profilepage.style.scss'
import ProfileInfo from '../../components/profileinfo/profileinfo.component'
import ProfilePost from '../../components/profilepost/profilepost.component'
import Header from '../../components/header/header.component'

class ProfilePage extends React.Component{
    render(){
        return (
            <div>
                <Header active="profile" />
                <ProfileInfo />
                <div style={{
                    marginLeft:"auto",
                    marginRight:"auto",
                    width:"45%",
                    marginTop:"50px"
                }}>
                <ProfilePost />
                </div>

            </div>
        )
    }
}

export default ProfilePage