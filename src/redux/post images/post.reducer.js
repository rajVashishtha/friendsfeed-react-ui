const INITIAL_STATE = {
    postImages : [],
    postButton:true,
    postText:""
}

const postReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case 'SET_POST_IMAGES' : 
            return{
                ...state,
                postImages : action.payload
            }
        case 'SET_POST_BUTTON':
            return{
                ...state,
                postButton: action.payload
            }
        case 'SET_POST_TEXT':
            return {
                ...state,
                postText:action.payload
            }
        default:
            return state
    }
}

export default postReducer;