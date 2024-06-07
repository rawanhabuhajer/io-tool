import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LogoIcon from '../../assets/v.svg'
import LogoIcon2 from '../../assets/logoNew.svg'
import LogoIcon3 from '../../assets/logoNewLigth.svg'
import "./navbar.css";
import UseLogout from "../../hooks/UseLogout";
import logoutImg from "../../assets/LOGOUT.svg";
import logoutImg2 from "../../assets/logoutDark.svg";
const NavbarComponent = (props) => {
  const drawerWidth = 240;
  const navItems = [
    { text: "Home", path: "/" },
    { text: "Contact", path: "/contact" },
  ];

  const { logout } = UseLogout();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    logout();
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", color: "#000" }}
    >
     <img src={LogoIcon2} style={{width:"45px" , padding:"20px 0"}}/>

      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center", fontFamily: "Montserrat" }}
            >
              <Link
                to={item.path}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemText primary={item.text} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Button
          onClick={handleLogout}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img src={logoutImg2} width={25} />
        </Button>
      </Typography>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", padding: "0 64px" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ padding: "0 64px" }}>
        <Toolbar
          sx={{
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <img src={LogoIcon3} style={{width:"35px"}}/>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                sx={{
                  color: "#fff",
                  fontWeight: 500,
                  marginRight: "45px",
                  textTransform: "capitalize",
                  fontFamily: "Montserrat",
                }}
              >
                <Link
                  to={item.path}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {item.text}
                </Link>
              </Button>
            ))}
            <Button
              sx={{
                color: "#fff",
                fontWeight: 500,
                textTransform: "capitalize",
                fontFamily: "Montserrat",
              }}
              onClick={handleLogout}
            >
             <img src={logoutImg} width={25} />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

NavbarComponent.propTypes = {
  window: PropTypes.func,
};

export default NavbarComponent;
