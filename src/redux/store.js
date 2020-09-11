import {createStore, applyMiddleware} from 'redux'

import logger from 'redux-logger'
import rootReducer from './root.reducer'


const middleware = [logger]

const saveToLocalStorage = (state)=>{
    try{
        const serializeState = JSON.stringify(state)
        localStorage.setItem('friendsfeed-state', serializeState)
    }catch(e){
        console.log(e)
    }
}
const loadFromLocalStorage = ()=>{
    try{
        const serializeState = localStorage.getItem('friendsfeed-state')
        if(serializeState == null)return undefined
        return JSON.parse(serializeState)
    }catch(e){
        console.log(e)
        return undefined
    }
}
const persistState = loadFromLocalStorage()
const store = createStore(rootReducer,persistState, applyMiddleware(...middleware))
store.subscribe(()=>saveToLocalStorage(store.getState()))
export default store;