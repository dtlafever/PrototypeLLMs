import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import '@mantine/core/styles.css'; // Import Mantine styles
import { MantineProvider } from '@mantine/core';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="light"> {/* Wrap App with MantineProvider */}
      <App />
    </MantineProvider>
  </React.StrictMode>
);
