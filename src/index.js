import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import{BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';

// provide from redux and Store 
import{Provider}from 'react-redux'
import Store from './Redux/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
  <BrowserRouter>
      <App />
  </BrowserRouter>
    
  </Provider>
);

