const setPostImages = images =>({
    type:'SET_POST_IMAGES',
    payload : images
})
const setPostButton = value =>({
    type:'SET_POST_BUTTON',
    payload: value
})

const setPostText = text=>({
    type:'SET_POST_TEXT',
    payload:text
})
const postActions = {
    setPostButton,
    setPostImages,
    setPostText
}

export default postActions

