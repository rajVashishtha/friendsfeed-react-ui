import React from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom'
import FrontPage from './page/frontpage/frontpage.page'
import HomePage from './page/homepage/homepage.page'
import ProfilePage from './page/profilepage/profilepage.page';
import MessagePage from './page/messagepage/messagepage.page';
import {PrivateRoute} from './components/privateRoute/privateRoute.component'
import { connect } from 'react-redux';
import VerificationPage from './page/verificationpage/verification.page';
import ForgotPasswordPage from './page/forgotpasswordpage/forgotpassword.page';
import SearchPage from './page/searchpage/searchpage.page';
import PostPage from './page/post/post.page';
import SimpleReactLightbox from "simple-react-lightbox";



class App extends React.Component{


  render(){
    const { currentUser} = this.props
    return(
      <SimpleReactLightbox>
        <Switch>
          <Route exact path="/" render={props=>
            currentUser===null ? (<FrontPage {...props} />):(currentUser.active === 0?(<Redirect to={{
              pathname:"/verify"
            }} />):(<Redirect to={{
              pathname:"/Home"
            }} />))
          }></Route>
          <PrivateRoute exact auth={currentUser && (currentUser.active === 1)} path="/Home" component={HomePage}></PrivateRoute>
          <PrivateRoute exact auth={currentUser && (currentUser.active === 1)} path="/profile" component={ProfilePage}></PrivateRoute>
          <PrivateRoute exact auth={currentUser && (currentUser.active === 1)} path="/message" component={MessagePage}></PrivateRoute>
          <PrivateRoute exact auth={currentUser && (currentUser.active === 1)} path="/search" component={SearchPage}></PrivateRoute>
          <PrivateRoute exact auth={currentUser && (currentUser.active === 1)} path="/post" component={PostPage}></PrivateRoute>
          <Route exact path="/verify" component={VerificationPage}></Route>
          <Route exact path="/recover-password" component={ForgotPasswordPage}></Route>
        </Switch>
      </SimpleReactLightbox>
    )
  }
}

const mapStateToProps = (state)=>({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(App)
