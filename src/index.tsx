import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { cardsData } from './mock/mocks';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App cardsData={ cardsData } />
  </React.StrictMode>
);
