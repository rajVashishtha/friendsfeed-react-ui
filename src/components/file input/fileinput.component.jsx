import React from 'react'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/styles'
import './fileinput.style.scss'
import {Avatar} from '@material-ui/core'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { ThemeProvider, createMuiTheme, Tooltip } from '@material-ui/core'
import imageCompression from 'browser-image-compression'
import {connect} from 'react-redux'
import postActions from '../../redux/post images/post.action'
import $ from 'jquery'
const theme = createMuiTheme({
    zIndex: {
      tooltip: 3500,
    },
  });

const useStyles={
    forRemoveIcon:{
        marginLeft:"5px",
        color:"#888888",
        cursor:"pointer"
    }
}


class FileInput extends React.Component{
    state={
        file_name : "",
        imageArray:[]
    }
    componentDidMount(){
        const {text, postImages} = this.props
        this.setState({
            file_name:text,
            imageArray:postImages
        })
        console.log(this.state.imageArray)
    }

    readURI(e){
        if (e.target.files) {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true
            }
            const {setPostImages,setPostButton,postButton} = this.props
            // console.log(postButton)
            const files = Array.from(e.target.files);
            var compressed = files.map(file=>(imageCompression(file, options)))
            compressed.forEach(comp=>{
                comp.then(value=>{
                    var f =[value]
                    console.log(f)
                    Promise.all(f.map(file => {
                return (new Promise((resolve,reject) => {
                    const reader = new FileReader();
                    reader.addEventListener('load', (ev) => {
                        resolve(ev.target.result);
                    });
                    reader.addEventListener('error', reject);
                    reader.readAsDataURL(file);
                }));
                    }))
                    .then(images => {
                        var temp = this.state.imageArray
                        temp.push(images[0])
                        this.setState({ imageArray : temp })
                        setPostImages(temp)
            
                    }, error => {        
                        console.error(error);
                    });

                })
            })
     
            // Promise.all(files.map(file => {
            //     return (new Promise((resolve,reject) => {
            //         const reader = new FileReader();
            //         reader.addEventListener('load', (ev) => {
            //             resolve(ev.target.result);
            //         });
            //         reader.addEventListener('error', reject);
            //         reader.readAsDataURL(file);
            //     }));
            // }))
            // .then(images => {
            //     this.setState({ imageArray : images })
    
            // }, error => {        
            //     console.error(error);
            // });
            
        }
        
    }
    initiate = async event =>{
        return await new Promise((resolve,reject)=>{
            this.readURI(event)
            setTimeout(()=>{resolve(true)},5000)
            // resolve(true)
        })
    }
    fileChange = (event) =>{
        const {target} = event
        const {setPostButton} = this.props
        setPostButton(false)
        if(target.files.length === 1){
            this.setState({
                file_name:target.files[0].name
            })
        }
        else{
            this.setState({
                file_name:`${target.files.length} Pictures`
            })
        }
        this.initiate(event).then(res=>{
            console.log(res)
            if(res){
                setPostButton(true)
            }
        })
    };

    resetFiles = () =>{
        const {text, file_id} = this.props
        const {setPostImages} = this.props
        this.setState({
            file_name:text,
            imageArray:[]
        })
        var $el = $("#"+file_id); 
        $el.wrap('<form>').closest('form').get(0).reset(); 
        $el.unwrap();
        setPostImages([])
    };


    render(){
       const {classes,text, startIcon, file_id="file"} = this.props
       return(
        <div>
            
            <input type="file" id={file_id} accept="image/*" multiple style={{
                position:"absolute",
                zIndex:"-1",
                opacity:0
            }} onChange={this.fileChange} />
            <ThemeProvider theme={theme}>

                <AvatarGroup max={5} id="avatar_div">
                    {
                        this.state.imageArray.map((item, index)=>(<Avatar key={`ava-${index}`} alt={`img-${index+1}`} src={item} />))
                    }
                   
                </AvatarGroup>
                    <Button variant="outlined" startIcon={startIcon}>
                        <label htmlFor={file_id} style={{
                            cursor:"pointer",
                            marginBottom:"0 !important"
                        }}>{this.state.file_name}</label>
                    </Button>
                    {
                        this.state.file_name === text ?(null):(<Tooltip title="remove selected" arrow>
                        <HighlightOffIcon className={classes.forRemoveIcon} onClick={this.resetFiles} />
                    </Tooltip>)
                    }
            </ThemeProvider>
        </div>
    )

    }
}


const mapDispatchToProps = dispatch =>({
    setPostImages : postImages => dispatch(postActions.setPostImages(postImages)),
    setPostButton : postButton => dispatch(postActions.setPostButton(postButton))
})
const mapStateToProps = state =>({
    postImages: state.postImages.postImages,
    postButton : state.postImages.postButton
})

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(useStyles)(FileInput))


