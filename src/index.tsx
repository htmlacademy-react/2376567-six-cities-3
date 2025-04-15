import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { generateMockData } from './mock/mocks';

const data = (generateMockData(10));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App placeCardsData = { data } />
  </React.StrictMode>
);
