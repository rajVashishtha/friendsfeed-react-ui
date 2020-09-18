import React from 'react';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import '../../constants/bootstrap.css'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import './textarea-emoji-picker.style.scss'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

class TextareaEmojiPicker extends React.Component{
    state={
        text :"",
        displayEmojiPicker:false
    }
    handleChange = (event)=>{
        this.setState({
            text:event.target.value
        })
    };
    onEmojiClick = (event, emojiObject)=>{
        this.setState({
            text:this.state.text + emojiObject.emoji
        })
    };
    toggleEmojiPicker = ()=>{
        this.setState({
            displayEmojiPicker:!this.state.displayEmojiPicker
        })
    };
    clearTextarea = ()=>{
        this.setState({
            text:""
        })
    }
    render(){
        return (
            <div className="form-group whole_textarea">
                <textarea value={this.state.text} className="form-control"
                    placeholder="What's in your mind?"
                    onChange={this.handleChange}
                    id="exampleFormControlTextarea3"
                    rows="4"></textarea>
                    <div className="forEmojiOpening">
                    <InsertEmoticonIcon onClick={this.toggleEmojiPicker} style={{cursor:"pointer",color:"#888888",marginLeft:"5px"}} />
                    {
                        this.state.text === "" ? (null):(<HighlightOffIcon style={{cursor:"pointer",color:"#888888",marginLeft:"5px"}} onClick={this.clearTextarea} />)
                    }
                    {
                        this.state.displayEmojiPicker ? (
                            <div className="dropdown-content">
                                <span>
                                    <Picker onEmojiClick={this.onEmojiClick} disableAutoFocus={true} skinTone={SKIN_TONE_MEDIUM_DARK}
                                    groupNames={{smileys_people:"PEOPLE"}}/>
                                </span>
                            </div>
                        ):(null)
                    }
                    </div>
            </div>
        );
    }
};
export default TextareaEmojiPicker

// const EmojiData = ({chosenEmoji}) => (
//   <div>
//     <strong>Unified:</strong> {chosenEmoji.unified}<br/>
//     <strong>Names:</strong> {chosenEmoji.names.join(', ')}<br/>
//     <strong>Symbol:</strong> {chosenEmoji.emoji}<br/>
//     <strong>ActiveSkinTone:</strong> {chosenEmoji.activeSkinTone}
//   </div>
// );


