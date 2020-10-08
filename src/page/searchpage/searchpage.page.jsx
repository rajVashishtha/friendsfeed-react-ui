import React from 'react';
import './searchpage.styles.scss';
import Header from '../../components/header/header.component';
// import {Paper, Avatar, Typography, IconButton, Tooltip} from '@material-ui/core';
// import CallMadeOutlinedIcon from '@material-ui/icons/CallMadeOutlined';
import {withRouter } from 'react-router-dom';
import SearchItem from '../../components/searchitem/searchitem.component';
import axios from 'axios';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import BottomScrollListener from 'react-bottom-scroll-listener';
import { Typography } from '@material-ui/core';

class SearchPage extends React.Component{
    state={
        searchText :"",
        results:[],
        loader:true,
        searchAPI:"",
        noResult:false
    }
    componentDidMount(){
        const {location, history, currentUser} = this.props;
        console.log(location.state)
        if(location.state){
            console.log("searching");
            this.setState({
                searchText:location.state.searchText,
                searchAPI:`https://friendsfeed.herokuapp.com/api/users/search?item=${location.state.searchText}`
            });
            const AuthStr = `${currentUser.token_type} ${currentUser.access_token}`
            axios.get(`https://friendsfeed.herokuapp.com/api/users/search?item=${location.state.searchText}`, { 'headers': { 'Authorization': AuthStr } }).then(res=>{
                const results = res.data.message;
                this.setState({
                    results : results,
                    searchAPI:res.data.links.next_page_url
                },()=>{
                    if(this.state.searchAPI === null){
                        this.setState({
                            loader:false,
                        });
                    }
                })
            }).catch(err=>{
                console.log(err)
                if(err.response && err.response.status === 401){
                    console.log("logout")
                }else{
                    this.setState({noResult:true,loader:false});
                }
            });
        }else{
            history.push("/home");
        }
    };
    componentDidUpdate(prev){
        const {location, history, currentUser} = this.props;
        const prevLocation = prev.location;
        console.log(location.state.searchText, prevLocation.state.searchText);
        if(location.state.searchText !==  prevLocation.state.searchText){
            this.setState({
                searchText:location.state.searchText,
                noResult:false,
                loader:true,
                results:[]
            })

            const AuthStr = `${currentUser.token_type} ${currentUser.access_token}`;
            axios.get(`https://friendsfeed.herokuapp.com/api/users/search?item=${location.state.searchText}`, { 'headers': { 'Authorization': AuthStr } }).then(res=>{
                const results = res.data.message;
                this.setState({
                    results : results,
                    searchAPI:res.data.links.next_page_url
                },()=>{
                    if(this.state.searchAPI === null){
                        this.setState({
                            loader:false,
                        });
                    }
                })
            }).catch(err=>{
                console.log(err)
                if(err.response && err.response.status === 401){
                    console.log("logout")
                }else{
                    this.setState({noResult:true, loader:false});
                }
            });
        }

    };//component did update;

    fetchMoreResults = ()=>{
        if(this.state.searchAPI !== null){
            const { currentUser} = this.props;
            const AuthStr = `${currentUser.token_type} ${currentUser.access_token}`;
            axios.get(this.state.searchAPI, { 'headers': { 'Authorization': AuthStr } }).then(res=>{
                const results = res.data.message;
                this.setState({
                    results : results,
                    searchAPI:res.data.links.next_page_url
                },()=>{
                    if(this.state.searchAPI === null){
                        this.setState({
                            loader:false,
                        });
                    }
                })
            }).catch(err=>{
                console.log(err)
                if(err.response && err.response.status === 401){
                    console.log("logout");
                }else{
                    this.setState({loader:false});
                }
            });
        }
        return;
    }
    render(){
        return(
            <div>
                <Header active="profile" />
                <div style={{paddingTop:"50px"}}>
                <h4 style={{textAlign:"center",lineHeight:"0px"}}>Showing results for {this.state.searchText}</h4>
                <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:"30px"}}>
                    <Loader
                        type="Oval"
                        color="#71E35F"
                        height={80}
                        width={80}
                        visible={this.state.loader} 
                    />
                </div>
                {
                    this.state.noResult?(<Typography variant="h2" align="center">No search result found</Typography>):(null)
                }
                <BottomScrollListener onBottom={()=>{console.log("working")}}>
                    <div>
                    {
                        this.state.results.map(item=>(
                            <SearchItem name={item.name} userName={item.username} followers={item.followers}
                            followings={item.following} profilePic={item.profileImage}
                            />
                        ))
                    }
                    </div>
                </BottomScrollListener>
                </div>
            </div>
        )
    }
};
const mapStateToProps = state =>({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(withRouter(SearchPage));