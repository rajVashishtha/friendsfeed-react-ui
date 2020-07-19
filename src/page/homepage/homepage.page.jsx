import React from 'react'
import './homepage.style.scss'
import Header from '../../components/header/header.component'
import Fab from '@material-ui/core/Fab';
import {EditOutlined} from '@material-ui/icons'
import PostCard from '../../components/card/card.component'
import MDBPostModal from '../../components/MDBModal/mdbmodal.component'
import TextareaEmojiPicker from '../../components/TextareaEmojiPicker/textarea-emoji-picker.component'


class HomePage extends React.Component{
    state={
        posts:[
            
        ],
        postLikes:[],
        loading:true,
        postModal:false
    }
    togglePostModal = ()=>{
        document.body.className = ""
        this.setState({
            postModal:!this.state.postModal
        })
    }

    
   

    async componentDidMount(){

        const response = await fetch('http://diready.co/api/userpost?user_id=1');
        const result = await response.json()
        this.setState({
            posts:result.message,
            postLikes:result.like,
            loading:false
        })  
    }

    render(){
        return(
            <div>
                <Header active="home" />
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
                                            
                                        }):({})} key={index} loading={this.state.loading} liked={Boolean(this.state.postLikes[index].status === "True" ? 1 : 0)} 
                                        postId={item.post_id}
                                        post={item.post} userId={item.user_id} media={item.post_image}
                                        likes={item.likes_count} comments={item.comments_count}
                                        />
                                    ))
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
                <MDBPostModal body={(<TextareaEmojiPicker />)} open={this.state.postModal} title="Create Post" close={this.togglePostModal} />
            </div>
        )
    }
};

export default HomePage


