import React from 'react'
import FrontTabs from '../../components/tabs/tabs.component'
import PostCard from '../../components/card/card.component'
import {connect} from 'react-redux'
import axios from 'axios'
import { setCurrentUser } from '../../redux/user/user.action'
import moment from 'moment'
import BottomScrollListener from 'react-bottom-scroll-listener';
import Loader from 'react-loader-spinner'
import { Typography } from '@material-ui/core'
import {withRouter} from 'react-router-dom'

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
        selfPostApiLoader:false,
        userId:null
    };
    
    UploadsValue = ({result, loader})=>{
        const posts = result
        return(
            <div>
            {
                posts.length === 0?(<Typography align="center" variant="h2">No posts to show</Typography>):(null)
            }
            {
                posts.map((item, index)=>(
                    <PostCard style={index > 0 ? ({
                        marginTop:"40px"
                        
                    }):({})} key={`self-post-${index}`}
                    loading={false} user={item.user} 
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
            if(err.response && err.response.status === 401){
                setCurrentUser(null)
                return
            }
            console.log("error -->",err)
        })
    };// end callNextSelfPost

    postAPICall = ()=>{
        const {currentUser,setCurrentUser} = this.props
        axios.get(this.state.selfPostAPI,{
            headers:{
                'authorization':`${currentUser.token_type} ${currentUser.access_token}`
            }
        }).then(res=>{
            console.log(res.data)
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
            if(err.response && err.response.status === 401){
                setCurrentUser(null)
            }
            if(err.response && err.response.status === 404){
                this.setState({
                    items:[
                        {
                            text:"Uploads",
                            value:(<BottomScrollListener onBottom={this.callNextSelfPosts}>
                                {
                                    scrollRef=>(
                                        <this.UploadsValue ref={scrollRef} result={[]} loader={this.state.selfPostApiLoader} />
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
                    selfPostAPI:null
                })
            }
        });
    };//end function
    
   
    async componentDidMount(){
        const {currentUser, userId} = this.props
        this.setState({
            userId:userId,
        },()=>{
            if(this.state.userId && this.state.userId !== currentUser.user[0].id){
                this.setState({
                    selfPostAPI:`https://friendsfeed.herokuapp.com/api/users/userPosts?user_id=${this.state.userId}`
                },()=>{
                    this.postAPICall();
                });
            }else{
                this.setState({
                    selfPostAPI:`https://friendsfeed.herokuapp.com/api/users/myPosts`
                },()=>{this.postAPICall()});
            }
        });
        
    };// end componentDidMount
    componentDidUpdate(prevProps, prevState){
        console.log(prevState, this.state);
        if(this.state.userId !== prevState.userId){
            const {currentUser} = this.props
            if(this.state.userId && this.state.userId !== currentUser.user[0].id){
                this.setState({
                    selfPostAPI:`https://friendsfeed.herokuapp.com/api/users/userPosts?user_id=${this.state.userId}`
                },()=>{
                    this.postAPICall();
                });
            }else{
                this.setState({
                    selfPostAPI:`https://friendsfeed.herokuapp.com/api/users/myPosts`
                },()=>{this.postAPICall()});
            }
        }
    }


    componentWillUnmount(){
    };// end componentWillUnmount


    render(){
        return (
            <div>
                <FrontTabs items={this.state.items} width="700px" />
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfilePost));