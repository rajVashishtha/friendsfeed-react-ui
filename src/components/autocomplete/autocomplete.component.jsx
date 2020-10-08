import React, { forwardRef, useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from 'axios';
import {withStyles} from '@material-ui/styles';
import {useHistory} from 'react-router';
import { connect } from "react-redux";

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: "#71E35F",
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: "#71E35F",
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: "#71E35F",
      },
      '&:hover fieldset': {
        borderColor: "#71E35F",
      },
      '&.Mui-focused fieldset': {
        borderColor: "#71E35F",
      },
    },
  },
})(TextField)

const ListboxComponent = React.forwardRef(function ListboxComponentInner(
  { setIsScrollBottom, ...rest },
  ref
) {
  return (
    <ul
    style={{
      height:200,
      overflowY:"scroll"
    }}
      ref={ref}
      {...rest}
      onScroll={({ target }) =>
        setIsScrollBottom(
          target.scrollHeight - target.scrollTop === target.clientHeight
        )
      }
    />
  );
});



function VirtualizedAutocomplete(props) {
  const [nextUrl, setNextUrl] = useState(null)
  const history = useHistory();
  const {currentUser} = props;
  const fetchSearch = (e)=>{
    const text = e.target.value.trim()
    if(text === ""){
      setOptions([{name:"Enter To Search..."}])
      return
    }
    const noResultFound = [
      {
        status:404,
        name:"No Data Found"
      }
    ]
    const AuthStr = `${currentUser.token_type} ${currentUser.access_token}`
    if(text !== ""){
      axios.get(`https://friendsfeed.herokuapp.com/api/users/search?item=${text}`, { 'headers': { 'Authorization': AuthStr } }).then(response=>{
      if(response.data.status === 200){
        setOptions(response.data.message)
        setNextUrl(response.data.links.next_page_url)
      }
      else{
        setOptions(noResultFound)
        setNextUrl(response.data.link)
      }
    })
    }
  };//fetch end

  const nextFetchSearch = ()=>{
    console.log("end fetch");
    const {currentUser} = props;
    if(nextUrl!==null){
      const AuthStr = `${currentUser.token_type} ${currentUser.access_token}`;
      axios.get(`${nextUrl}`, { 'headers': { 'Authorization': AuthStr } }).then(response=>{
      if(response.data.status === 200){
        setNextUrl(response.data.links.next_page_url)
        return response.data.message
      }
      else{
        setNextUrl(null)
        return []
      }
    })
    }
    else{
      return []
    }
  }// end nextFetchSearch
  const [isScrollBottom, setIsScrollBottom] = useState(false);
  const [options, setOptions] = useState([]);

  const handleEnter = (event)=>{
    const text = event.target.value.trim();
    if(text === "")return ;
    if(event.key === "Enter"){
      history.push({
        pathname:"/search",
        state:{
            searchText:text
        }
      });//end history.push()
    }
  }
  

  useEffect(() => {
    if (isScrollBottom) {
      setOptions(prevOptions => prevOptions.concat(nextFetchSearch()));
    }
  }, [isScrollBottom]);

  return (
    <Autocomplete
      // When useing ListboxComponent={ListboxComponent} it works fine
      // but you can't pass setIsScrollBottom
      // ListboxComponent={ListboxComponent}
      // This gives a forward ref warning,
      // List items no longer highlight
      ListboxComponent={listboxProps => (
        <ListboxComponent
          {...listboxProps}
          setIsScrollBottom={setIsScrollBottom}
        />
      )}
      style={{ width: 300 }}
      options={options.map(item=>item.name)}
      renderInput={params => (
        <CssTextField
          {...params}
          label="Search friendsfeed..."
          margin="none"
          variant="standard"
          InputProps={{ ...params.InputProps, type: 'search' }}
          onChange={fetchSearch}
          onKeyPress={handleEnter}// end keyPress;
        />
      )}
    />
  );
};

const mapStateToProps = (state)=>({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(VirtualizedAutocomplete);
