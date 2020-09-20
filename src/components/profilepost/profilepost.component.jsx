import React from 'react'
import FrontTabs from '../../components/tabs/tabs.component'
import PostCard from '../../components/card/card.component'
import {connect} from 'react-redux'
import axios from 'axios'
import { setCurrentUser } from '../../redux/user/user.action'
import moment from 'moment'

const LoadingPost = ()=>{
    return(
        <div>
            <PostCard loading={true} />
            <PostCard loading={true} style={{marginTop:"40px"}}/>
        </div>
    )
}

class ProfilePost extends React.Component{
    state = {
        items:[
            {
                text:"Uploads",
                value:(<LoadingPost />),
                likes:[]
            },
            {
                text:"Tags",
                value:(<LoadingPost />),
                likes:[]
            }
        ]
    };
    UploadsValue = ({result})=>{
        console.log(result)
        const posts = result
        return(
            <div>
                {
                  posts.map((item, index)=>(
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
            </div>
        )
    }
    async componentDidMount(){
        const {currentUser,setCurrentUser} = this.props

        axios.get('https://friendsfeed.herokuapp.com/api/users/myPosts',{
            headers:{
                'authorization':`${currentUser.token_type} ${currentUser.access_token}`
            }
        }).then(res=>{
            this.setState({
                items:[
                    {
                        text:"Uploads",
                        value:(<this.UploadsValue result={res.data.message} />),
                        likes:[]
                    },
                    {
                        text:"Tags",
                        value:(<LoadingPost />),
                        likes:[]
                    }
                ]
            })
        }).catch(err=>{
            if(err.response.status === 401){
                setCurrentUser(null)
            }
        })
    };// end componentDidMount
    render(){
            console.log(this.state.items)
        return (<div>
            <FrontTabs items={this.state.items} width="100%" />
                <loading_post />
        </div>

        )
    }
}

const mapStateToProps = (state)=>({
    currentUser:state.user.currentUser
});

const mapDispatchToProps = (dispatch)=>({
    setCurrentUser: user=> dispatch(setCurrentUser(user))
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePost);