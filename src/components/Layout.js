import React from "react";
import { Link, NavLink } from "react-router-dom";

import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";

import MobileSvg from "../static//IOE_Rankmobile.svg";
import LogoSvg from "../static/ali_thulo_gap_vako.svg";

import Dropdown from "./Dropdown";
import BottomNav from "./BottomNav";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  mobAppBar: {
    backgroundColor: theme.palette.primary.main,
    textAlign: "center",
    minHeight: 30,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.up("sm")]: {
      // width: `calc(100% - ${drawerWidth}px)`,
      // marginLeft: drawerWidth,
    },
    // height: "5rem",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: {
    minHeight: 30,
  },

  drawerPaper: {
    width: drawerWidth,
    flexShrink: 0,
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    padding: "3rem 0",
  },
  title: {
    flexGrow: 1,
    margin: "0.2rem 0.5rem",
    // marginLeft: "1rem",
  },
  subtitle: {
    margin: "0rem 2rem 0.5rem",
    borderBottom: "2px solid",
    borderBottomColor: theme.palette.text.secondary,
    fontSize: "1.1rem",
  },
  navLink: {
    textDecoration: "none",
    color: theme.palette.grey[100],
    padding: "0.5rem",
    margin: "0rem 0.4rem",
    borderRadius: "2px",
    "&:hover": {
      transitionDelay: "0.1s",
      textDecoration: "none",
      color: theme.palette.grey[100],
      backgroundColor: theme.palette.primary.light,
    },
  },
  activeLink: {
    transitionDelay: "0.1s",
    color: theme.palette.grey[100],
    backgroundColor: theme.palette.primary.light,
    borderBottom: "2px solid",
    borderBottomColor: theme.palette.secondary.light,
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.mobAppBar}>
        <img width="150" height="50" src={LogoSvg} alt="logo"></img>
      </div>
      <div className={classes.toolbar} />
      <Typography variant="button" className={classes.subtitle}>
        Filters
      </Typography>
      {props.collegeList && (
        <Dropdown
          type={"College"}
          options={props.collegeList.map((item) => item.code)}
          selected={props.selectedCollege}
          handleSelect={props.setSelectedCollege}
        />
      )}
      {props.facultyList && (
        <Dropdown
          type={"Faculty"}
          options={props.facultyList.map((item) => item.code)}
          selected={props.selectedFaculty}
          handleSelect={props.setSelectedFaculty}
        />
      )}
      {/* <Divider /> */}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Hidden xsDown>
              <Link to="/" className={classes.title}>
                <img
                  onClick={() => props.setShowResult(false)}
                  style={{ margin: "0 auto" }}
                  width="150"
                  height="50"
                  src={LogoSvg}
                  alt="logo"
                ></img>
              </Link>
            </Hidden>
            <Hidden smUp implementation="css" className={classes.title}>
              <img
                style={{ margin: "0 auto" }}
                width="100"
                height="30"
                src={MobileSvg}
                alt="logo"
              ></img>
            </Hidden>

            <Switch
              checked={props.darkState}
              onChange={props.handleThemeChange}
            />
            <Hidden xsDown implementation="css">
              <NavLink
                className={classes.navLink}
                activeClassName={classes.activeLink}
                to="/predict"
              >
                <Typography variant="button">Predict</Typography>
              </NavLink>
              <NavLink
                className={classes.navLink}
                activeClassName={classes.activeLink}
                to="/analyse"
              >
                <Typography variant="button">Analyse</Typography>
              </NavLink>
            </Hidden>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <div className={classes.content}>
          <div className={classes.toolbar}></div>
          {props.children}
        </div>
      </div>
      <Hidden smUp implementation="css">
        <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
          <BottomNav />
        </div>
      </Hidden>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
