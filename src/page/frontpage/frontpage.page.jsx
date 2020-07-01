import React from 'react'
import SignIn from '../../components/signin/signin.component'
import SignUp from '../../components/signup/signup.component'
import FrontTabs from '../../components/tabs/tabs.component'
import './frontpage.style.scss'


class FrontPage extends React.Component{
    state={
        items:[
            {
                text:"Log in",
                value:(<SignIn />)
            },
            {
                text:"Sign up",
                value:(<SignUp />)
            }
        ]
    }
    render(){
        return(
            <div className="frontpage-main">
                <div className="frontpage-liner">
                </div>
                <div className="frontpage-liner-2">
                </div>

                <div className="for-forms">
                    <FrontTabs items={this.state.items} width="450px" />
                </div>
            </div>
        )
    }
}

export default FrontPage;