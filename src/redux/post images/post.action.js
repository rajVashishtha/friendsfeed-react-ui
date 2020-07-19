const setPostImages = images =>({
    type:'SET_POST_IMAGES',
    payload : images
})
const setPostButton = value =>({
    type:'SET_POST_BUTTON',
    payload: value
})

const postActions = {
    setPostButton,
    setPostImages
}

export default postActions

