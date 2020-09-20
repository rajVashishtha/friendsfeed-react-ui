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
        const {text,setPostButton} = this.props
        setPostButton(true)
        this.setState({
            file_name:text,
            imageArray:[]
        })
        console.log(this.state.imageArray)
    };

    getbase64 = (blob)=>{
        return new Promise((resolve, reject)=>{
            let reader = new FileReader(); 
                reader.readAsDataURL(blob); 
                reader.onloadend = function () { 
                    let base64String = reader.result; 
                    resolve(base64String)
                } 
        })
    }

    fileChange = (event) =>{
        const {setPostButton, setPostImages} = this.props
        const files = Array.from(event.target.files)
        console.log(files)
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
          }
          setPostButton(false)
        const compressed_files = files.map(async file=>await imageCompression(file, options))
        console.log(compressed_files)
        Promise.all(compressed_files).then(async modFiles=>{
            let uploadableFiles = [];
            let avatarSRC = [];
            for (var i = modFiles.length - 1; i >= 0; i--) {
                let filename = `temp${i}.jpeg`;
                let filetype = "jpeg";
                let filelastMod = files[i].lastModified;
                uploadableFiles.push(new File([modFiles[i]], filename, {type: filetype, lastModified: filelastMod}));
                let to_add_src = await this.getbase64(modFiles[i])
                avatarSRC.push(to_add_src)
                console.log(to_add_src)
            }
            console.log(uploadableFiles)
            console.log(avatarSRC)
            this.setState({
                file_name:`${avatarSRC.length} files selected`,
                imageArray:avatarSRC
            })
            setPostImages(uploadableFiles)
            setPostButton(true)
            
        });// end promise
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


