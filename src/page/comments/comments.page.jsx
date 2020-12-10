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
import {SendOutlined} from '@material-ui/icons'

class CommentsPage extends React.Component{
    state={
        userId:1,
        postId:1,
        liked:false,
        comment:"",
        rows:2,
        allComments:[],
        submitting:false,
        nextPageURL:"",
        comments_count:0,
        recievedData:null
    }
    componentDidMount(){
        const {currentUser} = this.props;
        this.textarea.focus();
        autosize(this.textarea);
        if(this.props.location.customData){
            this.setState({
                allComments:[],
                comments_count:this.props.location.customData.comments,
                likes_count :this.props.location.customData.likes,
                postId:this.props.location.customData.postId,
                liked:this.props.location.customData.liked,
                postImages:this.props.location.customData.post_images,
                userId:this.props.location.customData.userId,
                post:this.props.location.customData.post
            });
            axios.get(`https://friendsfeed.herokuapp.com/api/users/post/comments?post_id=${this.props.location.customData.postId}`,{
                headers:{
                    'Authorization':`${currentUser.token_type} ${currentUser.access_token}`
                }
            })
            .then(res=>{
                console.log(res.data.likes_count)
                this.setState({
                    nextPageURL:res.data.links.next_page_url,
                    allComments:res.data.message,
                    comments_count:res.data.comments_count
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
        const {customData} = this.props.location;
        console.log(this.state.comment);
        this.setState({
            submitting:true
        });
        axios.post("https://friendsfeed.herokuapp.com/api/users/post/comments",{
            post_id:customData.postId,
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
        const {customData} = this.props.location;
        if(!customData){this.props.history.push("/home");
        return(<div ref={c => (this.textarea = c)}></div>)}
        else
        return(
            <div>
                <Header active="home"/>
                <div style={{marginTop:"100px"}}>
                    <PostCard
                    loading={false} user={customData.user} 
                    post_images={customData.post_images}
                    liked={Boolean(customData.liked)} 
                    postId={customData.postId}
                    post={customData.post} userId={customData.userId}
                    likes={customData.likes} comments={this.state.comments_count}
                    createdAt = {moment(customData.created_at)}
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
                                this.state.allComments.map(item=>(item !=="no_comments"?(
                                <CommentCard commentId={item.comment_id} userId={item.user_id} 
                                    name={item.name} username={item.username} profilePicture={item.profile_picture}
                                    comment={item.comment} postId={customData.postId} createdAt={moment(item.created_at).fromNow()}
                                    onCommentDelete={this.deleteComment}
                                />
                                ):<h2 className="text-muted" align="center">No comments</h2>))
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


export default connect(mapStateToProps,mapDispatchToProps)(withRouter(CommentsPage));