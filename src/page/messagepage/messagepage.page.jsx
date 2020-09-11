import React from 'react'
import Messenger from '../../components/messenger/Messenger/index'
import Header from '../../components/header/header.component'

class MessagePage extends React.Component{
    render(){
        return(<div>
            <Header active="message" />
            <div style={{
                position:"fixed",
                top:"65px",
                right:"0px",
                width:"100%"
            }}>
                <div>
                    <Messenger />
                </div>
            </div>
            
        </div>)
    }
}

export default MessagePage