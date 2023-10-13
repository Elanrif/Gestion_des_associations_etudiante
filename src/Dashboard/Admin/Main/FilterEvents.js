import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function FilterEvents(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const filterTypeAsc = () => {
    props.filterTypeAsc();

    //fermer le pop
    handleClose();
  };

  const filterTypeDesc = () => {
    props.filterTypeDesc();

    handleClose();
  };

  const filterDateAsc = () => {
    props.filterDateAsc();

    handleClose();
  };

  const filterDateDesc = () => {
    props.filterDateDesc();

    handleClose();
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip
          title="Trier par..."
          className="hover:cursor-pointer hover:text-blue-500 duration-300"
          arrow
        >
          <FilterListIcon
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </FilterListIcon>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={filterTypeAsc}>
          <ArrowDropUpIcon /> &nbsp;Type Acroissant
        </MenuItem>
        <MenuItem onClick={filterTypeDesc}>
          <ArrowDropDownIcon className="rotate-90" />
          &nbsp; Type Descroissant
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <FilterListIcon>
            <PersonAdd fontSize="small" />
          </FilterListIcon>
          &nbsp; &nbsp; Autre trie
        </MenuItem>
        <MenuItem onClick={filterDateAsc}>
          <ArrowDropUpIcon>
            <Settings fontSize="small" />
          </ArrowDropUpIcon>
          &nbsp; Date Acroissant
        </MenuItem>
        <MenuItem onClick={filterDateDesc}>
          <ArrowDropDownIcon>
            <Logout fontSize="small" />
          </ArrowDropDownIcon>
          &nbsp;Date Descroissant
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}