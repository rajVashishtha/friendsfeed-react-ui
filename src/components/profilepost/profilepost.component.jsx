import React from 'react'
import FrontTabs from '../../components/tabs/tabs.component'
import PostCard from '../../components/card/card.component'
import {connect} from 'react-redux'
import axios from 'axios'
import { setCurrentUser } from '../../redux/user/user.action'
import moment from 'moment'
import BottomScrollListener from 'react-bottom-scroll-listener';
import Loader from 'react-loader-spinner'

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
        ],
        selfPostAPI:`https://friendsfeed.herokuapp.com/api/users/myPosts`,
        initailPosts:[],
        selfPostApiLoader:false
    };
    
    UploadsValue = ({result, loader})=>{
        const posts = result
        return(
            <div style={{marginBottom:"30px"}}>
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
                <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:"30px"}}>
                    <Loader
                        type="Oval"
                        color="#71E35F"
                        height={80}
                        width={80}
                        visible={loader} 
                    />
                </div> 
                </div>
        )
    };
    callNextSelfPosts = async ()=>{
        if(this.state.selfPostAPI === null){
            return
        }
        this.setState({
            selfPostApiLoader:true
        })
        const {currentUser,setCurrentUser} = this.props
        axios.get(this.state.selfPostAPI,{
            headers:{
                'authorization':`${currentUser.token_type} ${currentUser.access_token}`
            }
        }).then(res=>{
            var temp = [ ...this.state.initailPosts, ...res.data.message]
            this.setState({
                initailPosts:temp,
                selfPostAPI:res.data.links.next_page_url,
            },()=>{
                this.setState({
                    items:[
                        {
                            text:"Uploads",
                            value:(<BottomScrollListener onBottom={this.callNextSelfPosts}>
                                {
                                    scrollRef=>(
                                        <this.UploadsValue ref={scrollRef} result={this.state.initailPosts} loader={this.state.selfPostApiLoader} />
                                    )
                                }
                            </BottomScrollListener>),
                            likes:[]
                        },
                        {
                            text:"Tags",
                            value:(<LoadingPost />),
                            likes:[]
                        }
                    ]
                },()=>{this.setState({
                    selfPostApiLoader:false
                })})
            });//set state end
            
        }).catch(err=>{
            if(err.response.status === 401){
                setCurrentUser(null)
                return
            }
        })
    };// end callNextSelfPost
    
   
    async componentDidMount(){
        const {currentUser,setCurrentUser} = this.props

        axios.get(this.state.selfPostAPI,{
            headers:{
                'authorization':`${currentUser.token_type} ${currentUser.access_token}`
            }
        }).then(res=>{
            this.setState({
                items:[
                    {
                        text:"Uploads",
                        value:(<BottomScrollListener onBottom={this.callNextSelfPosts}>
                            {
                                scrollRef=>(
                                    <this.UploadsValue ref={scrollRef} result={res.data.message} loader={this.state.selfPostApiLoader} />
                                )
                            }
                        </BottomScrollListener>),
                        likes:[]
                    },
                    {
                        text:"Tags",
                        value:(<LoadingPost />),
                        likes:[]
                    }
                ],
                selfPostAPI:res.data.links.next_page_url,
                initailPosts:res.data.message
            });// setState end
            
        }).catch(err=>{
            if(err.response.status === 401){
                setCurrentUser(null)
            }
        });// end api call


    };// end componentDidMount


    componentWillUnmount(){
    };// end componentWillUnmount


    render(){
        return (<div>
                    <FrontTabs items={this.state.items} width="100%" />
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