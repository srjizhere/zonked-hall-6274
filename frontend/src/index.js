import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import ChatProvider from './context/chatprovider'
import { ChakraProvider } from '@chakra-ui/react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
  <BrowserRouter>
  <ChatProvider> 
    <App />
  </ChatProvider>
    </BrowserRouter>
  </ChakraProvider>
);