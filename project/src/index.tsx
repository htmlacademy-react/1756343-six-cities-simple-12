import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const Data = {
  placesFound: 776,
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App placesFound={Data.placesFound} />
  </React.StrictMode>,
);
