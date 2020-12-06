import { Typography,Grid,Avatar } from '@material-ui/core';
import React from 'react';
import {Card} from 'react-bootstrap';
import CustomizedMenus from '../menu/menu.component';
import {MoreVertOutlined} from '@material-ui/icons';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import { connect } from 'react-redux';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';

class CommentCard extends React.Component{
    state={
        items:[]
    }
    componentDidMount(){
        const {currentUser,commentUserId} = this.props;
        this.setState({
            items: currentUser.user[0].id === commentUserId?([{
                text: "Report",
                icon: (<FlagOutlinedIcon />),
                onClick: null
              },
              {
                text: "Edit",
                icon: (<EditTwoToneIcon />),
                onClick: null
              }]):([{
                text: "Report",
                icon: (<FlagOutlinedIcon />),
                onClick: null
              }]),
            
        })
    }
    render(){
    return(
        <Card style={{
            marginTop:"30px"
        }}>
            <Card.Header>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={2}>
                        <Avatar src="" alt="user" />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>Name</Typography>
                        <small className="text-muted" style={{display:"block"}}>@Username</small>
                    </Grid>
                    <Grid item xs={7} direction="row-reverse">
                        <CustomizedMenus buttonIcon={(<MoreVertOutlined />)} items={this.state.items} divStyle={{
                            float:"right"
                        }} />
                    </Grid>
                </Grid>
                
            </Card.Header>
            <Card.Body>
                <Card.Text>
                   Card comment comes here.
                </Card.Text>
                <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Body>
        </Card>
    )}
}

const mapStateToProps = state=>({
    currentUser: state.user.currentUser
})
  

export default connect(mapStateToProps)(CommentCard);