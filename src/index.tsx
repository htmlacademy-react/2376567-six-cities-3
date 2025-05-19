import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { generateMockData } from './mock/mocks';
import { Provider } from 'react-redux';
import { store } from './store';

const data = (generateMockData(10));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}><App placeCardsData = { data } /></Provider>
  </React.StrictMode>
);
