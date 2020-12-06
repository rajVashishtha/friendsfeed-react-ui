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
        user_id:1,
        post_id:1,
        comment:"",
        rows:2,
        allComments:[]
    }
    componentDidMount(){
        const {currentUser} = this.props;
        const {customData} = this.props.location;
        this.textarea.focus();
        autosize(this.textarea);
        if(customData){
            axios.get(`https://friendsfeed.herokuapp.com/api/users/post/comments?post_id=${customData.postId}`,{
                headers:{
                    'Authorization':`${currentUser.token_type} ${currentUser.access_token}`
                }
            })
            .then(res=>{

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
                console.log("shift + enter")
            }
        }
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
                    likes={customData.likes_count} comments={customData.comments_count}
                    createdAt = {moment(customData.created_at)}
                    />
                    <div>
                        <div style={{width:500, marginLeft:"auto",marginRight:"auto",marginTop:"20px"}}>
                            <FormGroup >
                                <InputGroup>
                                    <InputGroup.Append>
                                        <InputGroup.Text>
                                            <IconButton>
                                                <SendOutlined />
                                            </IconButton>
                                        </InputGroup.Text>
                                    </InputGroup.Append>
                                    <Form.Control
                                        type="text"
                                        name="comment"
                                        as="textarea"
                                        id={`comment_${this.state.user_id}_${this.state.post_id}`}
                                        placeholder="Write your comment"
                                        aria-describedby="commentBlock"
                                        rows={this.state.rows}
                                        value={this.state.textarea}
                                        onChange={this.handleCommentTextarea}
                                        onKeyPress={this.handleKeyPress}
                                        style={{maxHeight:"150px",minHeight:"30px"}}
                                        ref={c => (this.textarea = c)}
                                    />
                                </InputGroup>
                            </FormGroup>
                        </div>
                        <div style={{width:500, marginLeft:"auto",marginRight:"auto",marginTop:"20px"}}>
                        {
                            this.state.allComments.length?(
                                this.state.allComments.map(item=>(item !=="no_comments"?<CommentCard />:<h2 className="text-muted" align="center">No comments</h2>))
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