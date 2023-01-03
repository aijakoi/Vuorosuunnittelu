import { useState, useEffect } from 'react';
import { Link, NavLink, Switch, Route, BrowserRouter as Router, useHistory, withRouter, Redirect, useLocation } from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar";
import {Tyontekijat} from './components/Tyontekijat/tyontekijat'
import {VuoronLisays} from './components/Vuoronlisays/vuoronLisays'
import {Vuorolista} from './components/Vuorolista/vuorolista'
import {Kiinnitys} from './components/Kiinnitys/kiinnitys'
import logo_teksti2 from './logo_teksti2.jpg'
import { Height } from '@material-ui/icons';



//Anna react kansiossa käsky:
//npm install react-router-dom --save

function Demo() {
  
  return (
    <div className="app">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/"><Koti /></Route>
          <Route path="/tyontekijat"> <Tyontekijat /> </Route>
          <Route path="/vuoroLisays"> <VuoronLisays /> </Route>
          <Route path="/vuorolista"> <Vuorolista /> </Route>
          <Route path="/kiinnitys"> <Kiinnitys /> </Route>
          <Route path="/"><Error /></Route>
        </Switch>
      </Router>
      

    </div>
  );
}

const Koti = () => {
  return (
    <div 
    style={{
      backgroundColor: '#154667'
    }}
>
      <img src={logo_teksti2} alt="Logo" 
          style={{
            display: 'block',
            width: '50%',
            marginLeft: 'auto',
            marginRight: 'auto'
          }} />;
    </div>
  )
}

const Error = () => {

  return (
    <h3>Sivu ei käytössä</h3>
  )
}

export default Demo;
