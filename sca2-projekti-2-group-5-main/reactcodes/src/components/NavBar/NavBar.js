import React from "react";
import { Link } from "react-router-dom";
import './NavBar.css'
import logo from './logo.jpg';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default function NavBar(props) {
  return (
    <div>
      <AppBar position="static" style={{marginBottom: "10px", backgroundColor: "#3f51b5"}}>
        <Toolbar>
        <Link to="/"><img src={logo} style={{width: "40px"}} /></Link>
        <Link to="/tyontekijat" style={{ textDecoration: 'none', marginLeft: "10px"}}><Button>Työntekijät</Button></Link>
          <Link to="/vuoroLisays" style={{ textDecoration: 'none', marginLeft: "10px" }}><Button>Vuoron lisäys</Button></Link>
          <Link to="/kiinnitys" style={{ textDecoration: 'none', marginLeft: "10px" }}><Button>Kiinnitys</Button></Link>
          <Link to="/vuorolista" style={{ textDecoration: 'none', marginLeft: "10px" }}><Button>Vuorot</Button></Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}