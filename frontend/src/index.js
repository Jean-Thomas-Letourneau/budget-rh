import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app/App'; // Updated path to App.js
import { store } from './app/store'; // Updated path to store.js
import reportWebVitals from './reportWebVitals';
import './index.css'; // Assuming you have global styles defined

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you're using reportWebVitals (optional)
reportWebVitals();
