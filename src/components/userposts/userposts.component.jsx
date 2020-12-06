import React from 'react';
import PostCard from '../../components/card/card.component';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Typography } from '@material-ui/core';

class UserPosts extends React.Component{
    state={
        posts:[],
        user:null,
        nextPostsURL:null,
        noPostsToShow:false,
        noMorePosts:false,
        loading:true,
    }
    fetchPosts = ()=>{
        const {currentUser} = this.props;
        this.setState({posts:[]});
        axios.get(`https://friendsfeed.herokuapp.com/api/users/userPosts?user_id=${this.state.user}`,{
            headers:{
                'authorization':`${currentUser.token_type} ${currentUser.access_token}`
            }
        }).then(res=>{
            const data = res.data.message;
            this.setState({
                posts:data,
                nextPostsURL:res.data.links.next_page_url,
                loading:false
            });
        }).catch(err=>{
            if(err.response && err.response.status === 401){
                console.log("logout");
            }
            else{
                this.setState({
                    noPostsToShow:true,
                    loading:false
                });
            }
        })
    };// end fetchPosts

    componentDidMount(){
        const {user} = this.props;
        this.setState({user:user},()=>{
            if(user !== null){
                this.fetchPosts();
            }
        });
    };// end componentDidMount

    componentDidUpdate(prevProps, prevState){
        const {user} = this.props;
        if(prevProps.user !== user){
            this.setState({user:null, loading:true});
            this.setState({user:user},()=>{
                if(user !== null){
                    this.fetchPosts();
                }
            });
        }
    };// end componentDidUpdate

    componentWillUnmount(){
        this.setState({posts:[], loading:true, user:null});
    };// end componentWillUnmount
    render(){
        return(
            <div style={{ marginLeft:"auto", marginRight:"auto"}}>
            {
                this.state.noPostsToShow?(<Typography align="center" variant="h3">No posts to show</Typography>):(null)
            }
            {
                this.state.user === null || this.state.loading?(<PostCard loading={true} />):(null)
            }
            {
                this.state.posts.map((item,index)=>(<PostCard style={index > 0 ? ({
                    marginTop:"40px"
                    
                }):({})} key={`self-post-${index}`}
                loading={false} user={item.user} 
                post_images={[item.post_image1, item.post_image2, item.post_image3, item.post_image4, item.post_image5]}
                liked={Boolean(item.liked)} 
                postId={item.id}
                post={item.post} userId={item.user_id}
                likes={item.likes_count} comments={item.comments_count}
                createdAt = {moment(item.created_at)}
                />))
            }
            </div>
        )
    }
};


const mapStateToProps = (state)=> ({
    currentUser: state.user.currentUser
});
export default connect(mapStateToProps)(withRouter(UserPosts));