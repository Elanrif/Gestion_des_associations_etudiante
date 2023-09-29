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

export default function UserFilter(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const filterByFirstNameAsc = () => {
    props.filterByFirstNameAsc();

    //fermer le pop
    handleClose();
  };

  const filterByFirstNameDesc = () => {
    props.filterByFirstNameDesc();

    handleClose();
  };
  
  const filterByLastNameAsc = () => {
    props.filterByLastNameAsc();

    handleClose();
  };

   const filterByLastNameDesc = () => {
     props.filterByLastNameDesc();

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
        <MenuItem onClick={filterByFirstNameAsc}>
          <ArrowDropUpIcon /> &nbsp;Nom Acroissant
        </MenuItem>
        <MenuItem onClick={filterByFirstNameDesc}>
          <ArrowDropDownIcon className="rotate-90" />
          &nbsp; Nom Descroissant
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <FilterListIcon>
            <PersonAdd fontSize="small" />
          </FilterListIcon>
          &nbsp; &nbsp; Autre filtre
        </MenuItem>
        <MenuItem onClick={filterByLastNameAsc}>
          <ArrowDropUpIcon>
            <Settings fontSize="small" />
          </ArrowDropUpIcon>
          &nbsp; Prenom Acroissant
        </MenuItem>
        <MenuItem onClick={filterByLastNameDesc}>
          <ArrowDropDownIcon>
            <Logout fontSize="small" />
          </ArrowDropDownIcon>
          &nbsp;Prenom Descroissant
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
