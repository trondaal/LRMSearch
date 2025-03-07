import React from 'react';
import { createRoot } from 'react-dom/client';
//import ReactDOM from 'react-dom';
import App from './App.jsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ApolloProvider, ApolloClient, } from '@apollo/client';
import {Cache} from "./api/Cache"
import { ThemeProvider } from '@mui/material/styles';
import {theme} from "./theme";
import { BrowserRouter } from 'react-router-dom';


//console.log("URI = " + import.meta.env.VITE_NEO4J_BACKEND);

const client = new ApolloClient({
    uri: 'http://dijon.idi.ntnu.no:8080/graphql',
    //uri: import.meta.env.VITE_NEO4J_BACKEND,
    cache: Cache
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
              <App/>
          </ThemeProvider>
      </ApolloProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
