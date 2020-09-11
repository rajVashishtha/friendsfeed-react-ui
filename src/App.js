import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import FrontPage from './page/frontpage/frontpage.page'
import HomePage from './page/homepage/homepage.page'
import ProfilePage from './page/profilepage/profilepage.page';
import MessagePage from './page/messagepage/messagepage.page';
// import AccountCircle from '@material-ui/icons/AccountCircle'
// import MailOutlineIcon from '@material-ui/icons/MailOutline';
// import InputTextField from './components/textfield/textfield.component'

class App extends React.Component{


  render(){

    return(
      <Switch>
        <Route exact path="/" component={FrontPage}></Route>
        <Route exact path="/Home" component={HomePage}></Route>
        <Route exact path="/profile" component={ProfilePage}></Route>
        <Route exact path="/message" component={MessagePage}></Route>
      </Switch>
    )
  }
}

export default App;
