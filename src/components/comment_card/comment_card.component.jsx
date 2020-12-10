import { Typography,Grid,Avatar } from '@material-ui/core';
import React from 'react';
import {Card} from 'react-bootstrap';
import CustomizedMenus from '../menu/menu.component';
import {MoreVertOutlined} from '@material-ui/icons';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import { connect } from 'react-redux';
import {DeleteForeverOutlined} from '@material-ui/icons';


class CommentCard extends React.Component{
    state={
        items:[],
        commentingUserId:1,
        onDelete:null,
        commentId:1
    }
    componentDidMount(){
        const {currentUser,userId, onCommentDelete, commentId} = this.props;
        this.setState({
            commentingUserId:userId,
            onDelete:onCommentDelete,
            commentId:commentId
        },()=>{
            this.setState({
                items: currentUser.user[0].id === this.state.commentingUserId?([{
                    text: "Report",
                    icon: (<FlagOutlinedIcon />),
                    onClick: null
                  },
                  {
                    text: "Delete",
                    icon: (<DeleteForeverOutlined />),
                    onClick: ()=>{
                        this.state.onDelete(this.state.commentId,this.state.commentingUserId );
                    }
                  }]):([{
                    text: "Report",
                    icon: (<FlagOutlinedIcon />),
                    onClick: null
                  }]),
            })
        });
        
    }
    render(){
        const {name,username,createdAt,comment, profilePicture} = this.props;
    return(
        <Card style={{
            marginTop:"30px"
        }}>
            <Card.Header>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={2}>
                        <Avatar src={profilePicture} alt="user" />
                    </Grid>
                    <Grid item xs={8}>
                        <Typography>{name}</Typography>
                        <small className="text-muted" style={{display:"block"}}>@{username}</small>
                    </Grid>
                    <Grid item xs={2} direction="row-reverse">
                        <CustomizedMenus buttonIcon={(<MoreVertOutlined />)} items={this.state.items} divStyle={{
                            float:"right"
                        }} />
                    </Grid>
                </Grid>
                
            </Card.Header>
            <Card.Body>
                <Card.Text>
                   {comment}
                </Card.Text>
                <small className="text-muted">{createdAt}</small>
            </Card.Body>
        </Card>
    )}
}

const mapStateToProps = state=>({
    currentUser: state.user.currentUser
})
  

export default connect(mapStateToProps)(CommentCard);