import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { List } from "react-virtualized";
import {withStyles} from '@material-ui/styles'
import axios from 'axios'

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

const ListboxComponent = React.forwardRef(function ListboxComponent(
  props,
  ref
) {
  const { children,nextUrl, ...other } = props;
  const itemCount = Array.isArray(children) ? children.length : 0;
  const itemSize = 36;
  console.log(nextUrl)
  return (
    <div ref={ref}>
      <div {...other}>
        <List
          height={100}
          autoHeight={children.length <= 4}
          width={300}
          rowHeight={itemSize}
          overscanCount={5}
          onRowsRendered={({startIndex, stopIndex})=>{
              if(stopIndex === children.length -1)
                console.log("last")
            }}
          rowCount={itemCount}
          rowRenderer={(props) => {
            return React.cloneElement(children[props.index], {
              style: props.style
            });
          }}
        />
      </div>
    </div>
  );
});


class VirtualizedAutocomplete extends React.Component{
    state={
        result:[],
        nextUrl:null
    }
    fetchSearch = (e)=>{
        const text = e.target.value.trim()
        if(text === ""){
          this.setState({
            result:[{name:"Enter to search..."}]
          })
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
            this.setState({
              result:response.data.message
            })
          }
          else{
            this.setState({
              result: noResultFound
            })
          }
          console.log(this.state.result)
        })
        }
      }
    render(){
        return (
            <div style={{ width: 300,
                marginTop:"-10px"
              }}>
                <Autocomplete
                id="virtualize-demo"
                style={{ width: 300 }}
                disableListWrap
                ListboxComponent={ListboxComponent}
                options={this.state.result.map((option) => option.name)}
                renderInput={(params) => (
                    <CssTextField
                        {...params}
                        label="Search friendsfeed"
                        margin="none"
                        variant="standard"
                        InputProps={{ ...params.InputProps, type: 'search' }}
                        onChange={this.fetchSearch}
                    />
                )}
                />
            </div>
        )
    }
}

export default VirtualizedAutocomplete
