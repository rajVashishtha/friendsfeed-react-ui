import React from 'react'
import './homepage.style.scss'
import Header from '../../components/header/header.component'
import Fab from '@material-ui/core/Fab';
import { EditOutlined} from '@material-ui/icons'
import PostCard from '../../components/card/card.component'
import MDBPostModal from '../../components/MDBModal/mdbmodal.component'
import TextareaEmojiPicker from '../../components/TextareaEmojiPicker/textarea-emoji-picker.component'
import {setCurrentUser} from '../../redux/user/user.action'
import {connect} from 'react-redux'
import axios from 'axios';
import { Typography } from '@material-ui/core';
import postActions from '../../redux/post images/post.action'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import moment from 'moment';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} style={{backgroundColor:"#71ef5e"}} />;
}

class HomePage extends React.Component{
    state={
        posts:[
            
        ],
        postLikes:[],
        loading:true,
        postModal:false,
        noPosts:false,
        nothingToPost:false,
        limitExceed:false,
        snackbar:false
    }
    togglePostModal = ()=>{
        document.body.className = ""
        if(this.state.postModal){
            const {setPostImages, setPostText} = this.props
            setPostImages([])
            setPostText("")
        }
        this.setState({
            postModal:!this.state.postModal
        })
    };// toogle post modal

    
    postSubmit = async ()=>{
        const {postText, postImages,currentUser,setCurrentUser, setPostImages, setPostText} = this.props
        console.log(postText, postImages)
        if(postText.trim() === ""){
            this.setState({
                nothingToPost:true,
                limitExceed:false
            })
            return
        }
        if(postImages.length > 5){
            this.setState({
                limitExceed:true,
                nothingToPost:false
            })
            return
        }
        this.setState({
            limitExceed:false,
            nothingToPost:false
        })
        var formData = new FormData()
        formData.append('status',postText)
        for(var i = 0;i<postImages.length;i++){
            formData.append(`image${i+1}`,postImages[i])
        }
        axios.post(`https://friendsfeed.herokuapp.com/api/users/post`,formData,{
            headers:{
                'Authorization':`${currentUser.token_type} ${currentUser.access_token}`,
                'Content-Type':'multipart/form-data'
            },
        }).then(res=>{
            this.togglePostModal()
            setPostImages([])
            setPostText("")
            this.setState({
                snackbar:true
            })
        }).catch(err=>{
            if(err.response.status === 401){
                setCurrentUser(null)
            }
        })

    };// end submission post
    handleSnackbarClose = ()=>{
        this.setState({
            snackbar:false
        })
    };// end snackbar close

    
    async componentDidMount(){
        const {currentUser,setCurrentUser } = this.props
        axios.get(`https://friendsfeed.herokuapp.com/api/users/get`,{headers:{
            'Authorization':`${currentUser.token_type} ${currentUser.access_token}`
        }}).then(res=>{
            this.setState({
                posts:res.data.message,
                loading:false
            })
        }).catch(error=>{
            if(error.response && error.response.status === 401){
                    setCurrentUser(null)
            }
            else{
                this.setState({noPosts:true,loading:false})
            }
        })
    };// end Componentdidmount

   

    render(){
        return(
            <div>
                <Header active="home" />
                <Snackbar open={this.state.snackbar} autoHideDuration={2000} onClose={this.handleSnackbarClose}>
                    <Alert onClose={this.handleSnackbarClose} severity="success">
                        Successfully Posted.
                    </Alert>
                </Snackbar>        
                <div className="forCards">
                    {
                        this.state.loading ? (
                            <div>
                                <PostCard loading={this.state.loading} />
                                <PostCard loading={this.state.loading} style={{
                                            marginTop:"40px"
                                        }}/>
                            </div>
                        ):(
                            <div>
                                {
                                    this.state.posts.map((item, index)=>(
                                        <PostCard style={index > 0 ? ({
                                            marginTop:"40px"
                                            
                                        }):({})} key={`self-post-${index}`}
                                        loading={false} user={item.user[0]} 
                                        post_images={[item.post_image1, item.post_image2, item.post_image3, item.post_image4, item.post_image5]}
                                        liked={Boolean(item.liked)} 
                                        postId={item.id}
                                        post={item.post} userId={item.user_id}
                                        likes={item.likes_count} comments={item.comments_count}
                                        createdAt = {moment(item.created_at)}
                                        />
                                    ))
                                }
                                {
                                    this.state.noPosts?(<Typography align="center" variant="h2">No posts to show</Typography>):(null)
                                }
                                
                            </div>
                        )
                    }
                </div>
                <div className="floating-icon">
                <Fab aria-label="post" className="fab" size="large" onClick={this.togglePostModal}>
                    <EditOutlined style={{
                        color:"#71E35F",
                        fontSize:"30px"
                    }} />
                </Fab>
                </div>
                <MDBPostModal nothingToPost={this.state.nothingToPost} submit={this.postSubmit}
                 body={(<TextareaEmojiPicker />)} open={this.state.postModal} title="Create Post"
                limitExceed={this.state.limitExceed} close={this.togglePostModal} />
            </div>
        )
    }
};

const mapStateToProps= (state)=>({
    currentUser:state.user.currentUser,
    postText : state.postImages.postText,
    postImages : state.postImages.postImages,
})

const mapDispatchToProps = dispatch =>({
    setCurrentUser : user => dispatch(setCurrentUser(user)),
    setPostImages : images =>dispatch(postActions.setPostImages(images)),
    setPostText : text => dispatch(postActions.setPostText(text))
})


export default connect(mapStateToProps, mapDispatchToProps)(HomePage)


