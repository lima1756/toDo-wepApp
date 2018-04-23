/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import App from './components/App';
import history from './services/history'
import './styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import '../node_modules/spectre.css/dist/spectre.min.css';
import '../node_modules/spectre.css/dist/spectre-exp.min.css';
import '../node_modules/spectre.css/dist/spectre-icons.min.css';
require('./favicon.ico'); // Tell webpack to load favicon.ico

render(
  <Router history={history}>
    <App />
  </ Router>,
  document.getElementById('app')
);