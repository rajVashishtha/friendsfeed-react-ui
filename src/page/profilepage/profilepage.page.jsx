// import React from 'react'
// import './profilepage.style.scss'
// import ProfileInfo from '../../components/profileinfo/profileinfo.component'
// import ProfilePost from '../../components/profilepost/profilepost.component'
// import Header from '../../components/header/header.component'
// import { withRouter } from 'react-router-dom';
// import {connect} from 'react-redux';
// import axios from 'axios'

// class ProfilePage extends React.Component{
//     state={
//         userId:null,
//         userName:"",
//         name:"",
//         followers:0,
//         followings:0,
//         follows:0,
//         postCount:0,
//         bio:"",
//     };
//     setDataToState = (val)=>{
//         console.log("setting uerId to ->"+val.id);
//         this.setState({
//             userId:val.id,
//             name:val.name,
//             userName:val.username,
//             followers:val.followers,
//             followings:val.following,
//             follows:val.follow,
//             bio:val.bio,
//             postCount:val.postcount
//         });
//     }
//     wheneverMount = (prevProps, prevUpdate)=>{
//         const {location, currentUser} = this.props;
        
//         if(!location.state || (location.state.userId === currentUser.user[0].id)){
//             this.setDataToState(currentUser.user[0]);
//         }
//         else{
//             axios.get(`https://friendsfeed.herokuapp.com/api/users/userProfile?user_id=${location.state.userId}`,{
//                 headers:{
//                     'authorization':`${currentUser.token_type} ${currentUser.access_token}`
//                 }
//             }).then(res=>{
//                 const data = res.data.message[0];
//                 this.setDataToState(data);
//             }).catch(err=>{
//                 if(err.response && err.response.status === 401){
//                     console.log("logout");
//                 }else{
//                     console.log(err);
//                 }
//             });
//         }
//     }
//     componentDidMount(){
//         this.wheneverMount();
//     };// end componentDidMount
//     componentDidUpdate(prevProps, prevState){
//         const {location} = this.props;
//         // console.log(location, prevProps.location);
//         if(location.state){
//             if(location.state.userId !== prevProps.location.state.userId || !prevProps.location.state){
//                 this.wheneverMount(prevProps);
//             }
//         }
//         else{
//             if(prevProps.location.state)this.wheneverMount();
//         }
//     }
//     render(){
//         return (
//             <div>
//                 <Header active="profile" />
//                 <ProfileInfo Name={this.state.name} userName={this.state.userName} followers={this.state.followers}
//                     followings={this.state.followings} postsCount={0} Bio={this.state.bio}
//                 />
//                 <div style={{
//                     marginLeft:"auto",
//                     marginRight:"auto",
//                     width:"45%",
//                     marginTop:"50px"
//                 }}>
//                 <ProfilePost userId={this.state.userId} />
//                 </div>

//             </div>
//         )
//     }
// }
// const mapStateToProps = (state)=> ({
//     currentUser: state.user.currentUser
// });
// export default connect(mapStateToProps)(withRouter(ProfilePage));

import React from 'react';
import {Tabs,Tab} from '@material-ui/core';
import './profilepage.style.scss';
import SwipeableViews from 'react-swipeable-views';
import Header from '../../components/header/header.component'
import {withStyles} from '@material-ui/styles';
import UserPosts from '../../components/userposts/userposts.component';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

const StyledTabs = withStyles({
    indicator: {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "transparent",
      "& > span": {
        width: "100%",
        backgroundColor: "#71E35F"
      }
    },
})(props => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles(theme =>({
    root: {
      textTransform: "none",
      color: "black",
      fontWeight: '20px',
      fontSize: '0.9375rem',
      marginRight: '5px',
      width:"1200px",
      "&$selected": {
        color: "#71E35F"
      },
      "&:focus": {
        color: "#71E35F"
      },
      "&.selected": {
        color: "#71E35F"
      },
      "&:selected": {
        color: "#71E35F"
      }
    },
    selected: {
        backgroundColor:"#E1FFDB"
    }
}))(props => <Tab {...props} />);

class ProfilePage extends React.Component{
    state={
        index:0,
        user:null
    }
    handleChangeTabIndex = (event, ind)=>{
        this.setState({index:ind});
    }
    handleSwipeIndexChange = (index)=>{
        this.setState({index:index});
    }
    setUser = (userId)=>{
        this.setState({user:userId, posts:[], loading:true});
    }
    componentDidMount(){
        const {location, currentUser} = this.props;
        if(!location.state){
            this.setUser(currentUser.user[0].id);
        }
        else{
            this.setUser(location.state.userId);
        }
    };// end componentDidMount

    componentDidUpdate(prevProps, prevState){
        const {location, currentUser} = this.props;
        if(!prevProps.location.state && !location.state){return;}
        if(prevProps.location.state && !location.state){
            this.setUser(currentUser.user[0].id);
        }
        else{
            if(location.state.userId !== prevProps.location.state.userId){
                this.setUser(location.state.userId);
            }
        }
    };// end cmponentDidMount

    render(){
        return(
            <div>
                <Header active="profile"/>
                <div className="div_for_profile_posts">
                    <StyledTabs value={this.state.index} onChange={this.handleChangeTabIndex} fullWidth centered>
                        <StyledTab label="Posts" />
                        <StyledTab label="Tags" />
                    </StyledTabs>
                    <SwipeableViews index={this.state.index} onChangeIndex={this.handleSwipeIndexChange} containerStyle={
                        {
                        WebkitOverflowScrolling: 'touch'}}>
                        <div style={{paddingTop:"20px"}}>
                            <UserPosts user={this.state.user}/>
                        </div>
                        <div style={{paddingTop:"20px"}}>
                            <UserPosts user={this.state.user}/>
                        </div>
                    </SwipeableViews>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state)=> ({
    currentUser: state.user.currentUser
});
export default connect(mapStateToProps)(withRouter(ProfilePage));