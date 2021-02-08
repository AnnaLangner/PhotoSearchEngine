import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const Root = () => (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

ReactDOM.render(<Root/>, document.getElementById('root'));
