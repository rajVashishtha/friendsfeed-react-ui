import React from 'react'
import FrontTabs from '../../components/tabs/tabs.component'
import PostCard from '../../components/card/card.component'
import {connect} from 'react-redux'

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
    }
    async componentDidMount(){
        const response = await fetch('http://diready.co/api/userpost?user_id=1');
        const result = await response.json()
        const UploadsValue = ({result})=>{
            console.log(result)
            const posts = result.message
            const postLikes = result.like
            return(
                <div>
                    {
                      posts.map((item, index)=>(
                        <PostCard style={index > 0 ? ({
                            marginTop:"40px"
                            
                        }):({})} key={`personal-${index}`}
                         loading={false}
                         liked={Boolean(postLikes[index].status === "True" ? 1 : 0)} 
                        postId={item.post_id}
                        post={item.post} userId={item.user_id} media={item.post_image}
                        likes={item.likes_count} comments={item.comments_count}
                        />
                        ))              
                    }             
                </div>
            )
        }
        this.setState({
            items:[
                {
                    text:"Uploads",
                    value:(<UploadsValue result={result} />),
                    likes:result.like
                },
                {
                    text:"Tags",
                    value:(<LoadingPost />),
                    likes:[]
                }
            ]
        })
    }
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
})
export default connect(mapStateToProps)(ProfilePost);