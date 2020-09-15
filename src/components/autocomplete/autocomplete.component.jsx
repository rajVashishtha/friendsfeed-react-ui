import React, { forwardRef, useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from 'axios'
import {withStyles} from '@material-ui/styles'

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



export default function VirtualizedAutocomplete() {
  const [nextUrl, setNextUrl] = useState(null)
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
    const AuthStr = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiZjBkNzBjZjc4MjI1ZWY3Y2Y5YWU3YmRjZWRjZTlmZTk1NjYxZTg4NWMzNGFmYjUwYmUyYjUxYmQ2ZDAxODc2NGUwM2JmOTk5NTIyZDk4OWYiLCJpYXQiOjE1OTk1NDI5MDMsIm5iZiI6MTU5OTU0MjkwMywiZXhwIjoxNjMxMDc4OTAzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.BqPMalfgoaksDm-4SEShwstyHcBMhnowHSVFQbW5ZbLnZ4NooJOK7OsGwIQ0PD3lQdg5LW8WQLYJTb0PvIEdqFsm4__1E0y3M0u0n4JAQ5zJgACrIL9qa_MZXoQ6ZQjqf5eEhN2d3X9t3GNuOxDI3_haSWMExtjI1mjR2PrgI56bDvHdECVvOnCys5ttapiHlWFhhVP0cdNokK0vNKJEcL9iCYFI0ZGeUnMngX1zZIFybYfJN9ty3_RiT1oTV63nCCj_A8J5Ho9Aj2FLaoR9G-4drqs754ZQxX4zIDXabEglQE2zwShDwBDcDJJLz0-7ztqGvVRjsE8WtjJJ6mvcNDpUBdUJkBa3qmwrUoc-HDmqBagTrPDTgPt12JdChCTI5c7ITJjJ1U3_OUT-P0AXkWzA4iVK72E4bE46ypVBBr-dpkTiVdGk5mPs5R269b6aIEz5nytyjrzl_vM3c01s7ink2SLUEwL9myQgZN0k7AaNIkvLqBkoUkmXyn-ieOPLcnZ-chk2G3WXznip78lhevISuud9T1nVG5eyor3qw0PlrLLiQkkQn1bPRpHqXN8KvpmHnOZ0yqVIhEno5Cxu-6mpf_sTwLR73rH-_8K-6AjTI_Cgng_ZGKzi9yYpmWq2ATuLDeOHT01J_nhS2FsZuljuHNAaWl4C6z_DHfNAyn4`
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
    console.log("end fetch")
    if(nextUrl!==null){
      const AuthStr = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiZjBkNzBjZjc4MjI1ZWY3Y2Y5YWU3YmRjZWRjZTlmZTk1NjYxZTg4NWMzNGFmYjUwYmUyYjUxYmQ2ZDAxODc2NGUwM2JmOTk5NTIyZDk4OWYiLCJpYXQiOjE1OTk1NDI5MDMsIm5iZiI6MTU5OTU0MjkwMywiZXhwIjoxNjMxMDc4OTAzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.BqPMalfgoaksDm-4SEShwstyHcBMhnowHSVFQbW5ZbLnZ4NooJOK7OsGwIQ0PD3lQdg5LW8WQLYJTb0PvIEdqFsm4__1E0y3M0u0n4JAQ5zJgACrIL9qa_MZXoQ6ZQjqf5eEhN2d3X9t3GNuOxDI3_haSWMExtjI1mjR2PrgI56bDvHdECVvOnCys5ttapiHlWFhhVP0cdNokK0vNKJEcL9iCYFI0ZGeUnMngX1zZIFybYfJN9ty3_RiT1oTV63nCCj_A8J5Ho9Aj2FLaoR9G-4drqs754ZQxX4zIDXabEglQE2zwShDwBDcDJJLz0-7ztqGvVRjsE8WtjJJ6mvcNDpUBdUJkBa3qmwrUoc-HDmqBagTrPDTgPt12JdChCTI5c7ITJjJ1U3_OUT-P0AXkWzA4iVK72E4bE46ypVBBr-dpkTiVdGk5mPs5R269b6aIEz5nytyjrzl_vM3c01s7ink2SLUEwL9myQgZN0k7AaNIkvLqBkoUkmXyn-ieOPLcnZ-chk2G3WXznip78lhevISuud9T1nVG5eyor3qw0PlrLLiQkkQn1bPRpHqXN8KvpmHnOZ0yqVIhEno5Cxu-6mpf_sTwLR73rH-_8K-6AjTI_Cgng_ZGKzi9yYpmWq2ATuLDeOHT01J_nhS2FsZuljuHNAaWl4C6z_DHfNAyn4`
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
        />
      )}
    />
  );
}
