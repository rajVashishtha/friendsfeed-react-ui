import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { IconButton } from "@material-ui/core";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    autoFocus={false}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
      "&:hover":{
        color :"#71E35F",
        "& .MuiListItemIcon-root":{
            color :"#71e35f"
        }
      },
    "&:focus": {
      backgroundColor: "#71E35F",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);
const StyledListItemIcon = withStyles(theme=>({
  root:{
    minWidth:"34px"
  }
}))(ListItemIcon)

export default function CustomizedMenus({items, buttonIcon, iconStyle}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        {/* <ArrowDropDownIcon /> */}
        {buttonIcon}
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {
            items.map((item, index)=>(
                <StyledMenuItem onClick={item.onClick}>
                    <StyledListItemIcon style={iconStyle}>
                        {item.icon}
                    </StyledListItemIcon>
                    <ListItemText primary={item.text} />
                </StyledMenuItem>
            ))
        }
        
      </StyledMenu>
      
      
    </div>
  );
}
