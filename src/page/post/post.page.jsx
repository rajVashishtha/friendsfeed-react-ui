import React from 'react';
import Header from '../../components/header/header.component';
import PostCard from '../../components/card/card.component';
import { FormGroup ,Form, InputGroup} from 'react-bootstrap';
import autosize from 'autosize'
import CommentCard from '../../components/comment_card/comment_card.component';
import moment from 'moment';
import {withRouter} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import axios from 'axios';
import { connect } from 'react-redux';
import {setCurrentUser} from '../../redux/user/user.action';
import { IconButton } from '@material-ui/core';
import {SendOutlined} from '@material-ui/icons';
import queryString from 'query-string';

class PostPage extends React.Component{
    state={
        userId:1,
        postId:1,
        liked:1,
        comment:"",
        rows:2,
        allComments:[],
        submitting:false,
        nextPageURL:"",
        comments_count:0,
        likes_count:0,
        recievedData:null,
        postUser:null,
        loading:true
    }
    componentDidMount(){
        const {currentUser,location} = this.props;
        this.textarea.focus();
        autosize(this.textarea);
        const query = queryString.parse(location.search)
        if(query  && query.id){
            this.setState({
                allComments:[],
            });
            axios.get(`https://friendsfeed.herokuapp.com/api/users/post/${query.id}`,{
                headers:{
                    'Authorization':`${currentUser.token_type} ${currentUser.access_token}`
                }
            }).then(res=>{
                const data = res.data.message[0];
                const post_images = [];
                for(let i = 1;i<=5;i++){
                    post_images.push(data[`post_image${i}`])
                }
                this.setState({
                    comments_count:data.comments_count,
                    likes_count:data.likes_count,
                    post_images:post_images,
                    liked:data.liked,
                    userId:data.user_id,
                    postUser:data.user,
                    postId:data.id,
                    loading:false,
                    post:data.post
                });
            }).catch(err=>{
                if(err.response.status === 401){
                    console.log("logout")
                }
                this.setState({loading:false})
                console.log(err)
            })

            axios.get(`https://friendsfeed.herokuapp.com/api/users/post/comments?post_id=${query.id}`,{
                headers:{
                    'Authorization':`${currentUser.token_type} ${currentUser.access_token}`
                }
            })
            .then(res=>{
                this.setState({
                    nextPageURL:res.data.links.next_page_url,
                    allComments:res.data.message,
                    comments_count:res.data.comments_count,
                    likes_count:res.data.likes_count
                })
            }).catch(err=>{
                if(err.response.status === 401){
                    setCurrentUser(null)
                }
                else{
                    this.setState({
                        allComments:["no_comments"]
                    })
                }
            })
        }
    }
    handleCommentTextarea = event =>{
        const {name, value} = event.target;
        this.setState({[name]:value})
    }
    handleKeyPress = e =>{
        if(e.nativeEvent.keyCode === 13){
            if(e.nativeEvent.shiftKey){
                this.handleSubmitComment();
            }
        }
    }

    handleSubmitComment = event =>{
        if(this.state.comment.trim() === ""){
            return
        }
        const {currentUser}  = this.props;
        this.setState({
            submitting:true
        });
        axios.post("https://friendsfeed.herokuapp.com/api/users/post/comments",{
            post_id:this.state.postId,
            comment:this.state.comment,
            post_user_id:this.state.userId
        },{
            headers:{
                'Authorization':`${currentUser.token_type} ${currentUser.access_token}`
            }
        })
        .then(res=>{
            this.setState({allComments:[]},()=>{
                this.setState({
                    submitting:false,
                    allComments:res.data.message,
                    nextPageURL:res.data.links.next_page_url,
                    comment:"",
                    comments_count:res.data.comments_count
                })
            })
        }).catch(err=>{
            console.log(err)
            if(err.response.status === 401){
                setCurrentUser(null)
            }
            else{
                this.setState({
                    allComments:["no_comments"]
                })
            }
        })
    }

    deleteComment = (commentId, commentingId) => {
        const {setCurrentUser, currentUser} = this.props;
        axios.delete(`https://friendsfeed.herokuapp.com/api/users/post/comments?comment_id=${commentId}&post_id=${this.state.postId}&post_user_id=${commentingId}`,{
            headers:{
                'Authorization':`${currentUser.token_type} ${currentUser.access_token}`
            }
        })
        .then(res=>{
            this.setState({allComments:["no_comments"]},()=>{this.setState({
                nextPageURL:res.data.links.next_page_url,
                allComments:res.data.message,
                comments_count:res.data.comments_count
            })});
            
        }).catch(err=>{
            console.log("error", err)
            this.setState({
                allComments:["no_comments"]
            })
            if(err.response.status === 401){
                setCurrentUser(null)
            }
        })
    }


    render(){
        const {location} = this.props;
        console.log("likes ->",this.state.likes_count);
        autosize(this.textarea);
        const query = queryString.parse(location.search)
        if(!query || !query.id){this.props.history.push("/home");
        return(<div ref={c => (this.textarea = c)}></div>)}
        else
        return(
            <div>
                <Header active="home"/>
                <div style={{marginTop:"100px"}}>
                    <PostCard
                    loading={this.state.loading} user={this.state.postUser} 
                    post_images={this.state.post_images}
                    liked={Boolean(this.state.liked)} 
                    postId={this.state.postId}
                    post={this.state.post} userId={this.state.userId}
                    likes={this.state.likes_count} comments={this.state.comments_count}
                    createdAt = {moment(this.state.created_at)} 
                    />
                    <div>
                        <div style={{width:500, marginLeft:"auto",marginRight:"auto",marginTop:"20px"}}>
                            <FormGroup >
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        name="comment"
                                        as="textarea"
                                        id={`comment_${this.state.user_id}_${this.state.post_id}`}
                                        placeholder="Write your comment"
                                        aria-describedby="commentBlock"
                                        rows={this.state.rows}
                                        value={this.state.comment}
                                        onChange={this.handleCommentTextarea}
                                        onKeyPress={this.handleKeyPress}
                                        style={{maxHeight:"150px",minHeight:"30px"}}
                                        ref={c => (this.textarea = c)}
                                    />
                                    <InputGroup.Prepend>
                                    {
                                        this.state.submitting?(
                                            <Loader
                                                type="Rings"
                                                color="#71E35F"
                                                height={60}
                                                width={60}
                                                visible={true} 
                                            />
                                        ):(
                                        <IconButton onClick={this.handleSubmitComment}>
                                            <SendOutlined />
                                        </IconButton>
                                        )
                                    }
                                    </InputGroup.Prepend>
                                </InputGroup>
                            </FormGroup>
                        </div>
                        <div style={{width:500, marginLeft:"auto",marginRight:"auto",marginTop:"20px"}}>
                        {
                            this.state.allComments.length?(
                                this.state.allComments.map((item,index)=>(item !=="no_comments"?(
                                <CommentCard key={`${index}`} commentId={item.comment_id} userId={item.user_id} 
                                    name={item.name} username={item.username} profilePicture={item.profile_picture}
                                    comment={item.comment} postId={this.state.postId} createdAt={moment(item.created_at).fromNow()}
                                    onCommentDelete={this.deleteComment}
                                />
                                ):<h2 className="text-muted" key={`${index}`} align="center">No comments</h2>))
                            ):(
                                <div style={{textAlign:"center"}}>
                                    <Loader
                                        type="Oval"
                                        color="#71E35F"
                                        height={80}
                                        width={80}
                                        visible={true} 
                                    />
                                </div>
                            )
                        }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps= (state)=>({
    currentUser:state.user.currentUser
});

const mapDispatchToProps = dispatch =>({
    setCurrentUser : user => dispatch(setCurrentUser(user))
})


export default connect(mapStateToProps,mapDispatchToProps)(withRouter(PostPage));