import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import UserContextProvider from './Context/UserContext';
// import { QueryClientProvider, QueryClint } from 'react-query'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
// let queryClint = new QueryClint();
root.render(

    // <QueryClientProvider client={queryClint}>
        <UserContextProvider>
            <App />
        </UserContextProvider>
    // </QueryClientProvider>
);

