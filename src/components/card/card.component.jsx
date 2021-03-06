import React from "react";
import { withStyles } from "@material-ui/core/styles";
//eslint-disable-next-line
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import Skeleton from '@material-ui/lab/Skeleton';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import Tooltip from "@material-ui/core/Tooltip";
import CustomizedMenus from '../menu/menu.component'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import Badge from '@material-ui/core/Badge';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import Carousel from 'react-material-ui-carousel'
import {connect} from 'react-redux'
import axios from "axios";
import {withRouter} from 'react-router-dom';
import LightBox from "../lightbox/lightbox.component";

// const { openLightbox } = useLightbox();


const useStyles = theme => ({
  root: {
    maxWidth: 500,
    marginLeft: "auto",
    marginRight: "auto"
  },
  media: {
    height: 0,
    paddingTop:"56.25%"
     // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "90%",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  forIcon:{
    color :"#71e35f"
  }
});
const StyledCardActions = withStyles(theme =>({
  root:{
    marginTop:0,
    paddingTop:0,
    paddingBottom:0,
    marginBottom:0,
    borderTop:"1px solid #e1e1e1"
  }
}))(CardActions)
const StyledBadge = withStyles(theme =>({
  badge:{
      right:-18,
      top:18,
      fontSize:18
  }
}))(Badge)


class PostCard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items: [
        
      ],
      expand: false,
      loading: true,
      liked:true,
      needExpand:false,
      likesCount:0,
      commentsCount:0
    };//end state
  }
  expandCollapse = () => {
    this.setState({
      expand: !this.state.expand
    })
  }
  toggleLike = () =>{
    const {postId, currentUser,user} = this.props;
    this.setState({
      liked:!this.state.liked,
    })
    axios.post(`https://friendsfeed.herokuapp.com/api/users/like`,{post_id:postId, post_user_id:user.id},{
      headers:{
        'authorization':`${currentUser.token_type} ${currentUser.access_token}`
      }
    }).then(res=>{
      this.setState({
        likesCount:res.data.message[0].likes_count,
        commentsCount:res.data.message[0].comments_count
      });
    }).catch(err=>{
        if(err.response && err.response.status === 401){
          console.log("logOut");
        }else{
          setTimeout(()=>{
            this.setState({
              liked:!this.state.liked
            });
          },500)
        }
    });
  }
  cutPostData = (post) => {
    const count = post.length
    if(count > 250){
        this.setState({
            needExpand: true,
            cuttedPost : post.slice(0,250)+'...',
            fullPost : post
        })
      }
      else{
        this.setState({
          cuttedPost:post
        })
      }  
  };
  componentDidMount(){
    const { post = "default", currentUser, userId,likes, comments} = this.props
    this.setState({
      liked : this.props.liked,
      likesCount:likes,
      commentsCount:comments,
      items: currentUser.user[0].id === userId?([{
        text: "Report",
        icon: (<FlagOutlinedIcon />),
        onClick: null
      },
      {
        text: "Share",
        icon: (<ShareOutlinedIcon />),
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
      },
      {
        text: "Share",
        icon: (<ShareOutlinedIcon />),
        onClick: null
      }])
    })
    this.cutPostData(post)    
  }
  componentDidUpdate(prevProps){
    if((prevProps.liked !== this.props.liked) || (prevProps.likes!== this.props.likes)){
      this.setState({
        liked:this.props.liked,
        likesCount:this.props.likes
      })
    }
  }
  redirectToComments = event =>{
    const { style, classes, loading,user,post, postId, post_images=[], userId, history,location } = this.props;
    history.push({
      pathname:"/post",
      search:`?id=${postId}`,
      from:location,
      customData:{
        style,classes, loading,user, postId,
        liked:this.state.liked,
         likes:this.state.likesCount, 
         comments:this.state.commentsCount, 
         post_images, userId,post
      }
    });
  }
  render() {
    const { style, classes, loading,user, postId, comments, post_images=[] } = this.props;
    const real_post_images = post_images.filter(item=>item!==null)
    return (
      <Card className={classes.root} style={style} elevation={1} variant="outlined">
        <CardHeader
          avatar={
            loading ? (<Skeleton animation="wave" variant="circle" width={40} height={40} />) :
              (<Avatar aria-label={user.name}/>)}
          action={
            loading ? (null) : (
              <CustomizedMenus buttonIcon={(<MoreVertIcon />)} items={this.state.items} iconStyle={{
                paddingRight: "100px !important"
              }} />
            )
          }
          title={
            loading ? (
              <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
            ) : (
                user.name
              )
          }
          subheader={
            loading ? (
              <Skeleton animation="wave" height={10} width="40%" />
            ) : (
                  user.username
              )
          }
        />
        {
          loading ? (
            <Skeleton animation="wave" variant="rect" className={classes.media} />
          ) : (
              real_post_images.length === 0 ? (null):(
              <div onClick={()=>{console.log("clicking")}}>
              <Carousel autoPlay={false}
               animation="slide" navButtonsAlwaysInvisible={real_post_images.length === 1}
               indicators={real_post_images.length > 1}
               >
              {
                real_post_images.map((item,index)=>
                  <CardMedia
                  key={`post-media-${postId}-${index}`}
                  className={classes.media}
                  image={item}
                  title={"media"}
                  />
                )
              }
            </Carousel>
            </div>
            )
              
            )
        }

        <CardContent>
          {
            loading ? (
              <React.Fragment>
                <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                <Skeleton animation="wave" height={10} width="80%" />
              </React.Fragment>
            ) : (
                <div>
                   <Collapse in={!this.state.expand} timeout="auto" unmountOnExit>
                    <Typography variant="body2" color="textPrimary" component="p">
                      {this.state.cuttedPost}
                    </Typography>
                  </Collapse>
                      {
                        this.state.needExpand ? (
                          <IconButton
                    aria-expanded={this.state.expand}
                    className={classes.expand}
                    onClick={this.expandCollapse}
                    aria-label="show more"
                  >
                    <Tooltip title={
                      this.state.expand ? "Show less" : "Show more"
                    } placement="top">
                      {
                        this.state.expand ? (<ExpandLessIcon />) : (<ExpandMoreIcon />)
                      }

                    </Tooltip>
                  </IconButton>
                        ):(null)
                      }
                  
                  <Collapse in={this.state.expand} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>{this.state.fullPost}</Typography>
                     
                    </CardContent>
                  </Collapse>

                </div>
              )
          }
          

        </CardContent>
        
        {
          loading ? (null) : (
            <StyledCardActions disableSpacing={true}>
              <IconButton aria-label="liked" onClick={this.toggleLike}>
                {
                  (this.state.liked) ? (<StyledBadge
                  badgeContent={this.state.likesCount}
                  showZero={false}
                  max={999}
                  >
                    <FavoriteIcon fontSize="large" className={classes.forIcon} />
                    
                  </StyledBadge>) :(
                  <StyledBadge
                  badgeContent={this.state.likesCount}
                  showZero={false}
                  max={999}
                  >
                    <FavoriteBorderOutlinedIcon fontSize="large" className={classes.forIcon} />
                  </StyledBadge>)
                }
              </IconButton>
              <IconButton aria-label="share" style={{
                marginLeft:24
              }} onClick={this.redirectToComments}>
                <StyledBadge
                  badgeContent={comments}
                  max={999}
                  >
                  <CommentOutlinedIcon fontSize="large" className={classes.forIcon} />
                </StyledBadge>
              </IconButton>
            </StyledCardActions>
          )
        }
      <LightBox />
      </Card>
    )

  }
};

const mapStateToProps = state=>({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(withRouter(withStyles(useStyles)(PostCard)))
