import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { UserInfoContext } from "../../AuthContext";


export default function MenuAccount() {

  const navigate = useNavigate() 

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { userConnected,setUserConnected, setUserLoading } = React.useContext(UserInfoContext); 

  const logout = ()=>{

    sessionStorage.removeItem("auth") 

    setUserLoading(false) /* dans ma logique on déconnecte le USER  */
    setUserConnected(null) /* si on met a null , on aura des erreus. on modifier le userConnected  a un objet {} vide comme lors de l'initialisation */
    
     //pour que dans App.js si on actualise la page le state sera initialisé par la session.
        sessionStorage.removeItem("auth")
    
    navigate("/login")
    handleClose() ; 
  }


  return (
    <React.Fragment>
      <Box
        sx={{ display: "flex", alignItems: "center", textAlign: "start" }}
        className="hover:bg-orange-400 rounded-md"
      >
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 0 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <div className="flex items-center space-x-3">
              <Avatar
                sx={{ width: 32, height: 32 }}
                src={
                  userConnected.image &&
                  `data:image/jpeg;base64,${userConnected.image}`
                }
              />
              <div className="text-white text-sm font-medium">
                {userConnected.firstName}
              </div>
            </div>
          </IconButton>
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
        {userConnected.role === "ADMIN" && (
          <>
            <MenuItem onClick={handleClose}>
              <Avatar />
              admin
            </MenuItem>
          </>
        )}
        <Divider />
        <Link to="/dashboard/user/update">
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Modifier compte
          </MenuItem>
        </Link>
        <Link to="/dashboard/user/update/password">
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Mot de passe
          </MenuItem>
        </Link>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Déconneter
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
