import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/scss/bootstrap.scss'
// import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/css/demo.css";

import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';
import './assets/style/maps.scss';
import 'typeface-roboto';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "./layouts/Admin.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/maps" ><App /></Route>
      <Route path="/maps/admin" render={(props) => <AdminLayout {...props} />} />
      <Redirect from={`/`} to="/maps" />
    </Switch>
  </BrowserRouter>
);

