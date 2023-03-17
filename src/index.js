import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBNlTtgQmFZEyAJfun8-uQ6sw8lJqAtwxs",
  authDomain: "naikeecommerce.firebaseapp.com",
  projectId: "naikeecommerce",
  storageBucket: "naikeecommerce.appspot.com",
  messagingSenderId: "447442529056",
  appId: "1:447442529056:web:6c9f10305b0e69be66c545"
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
