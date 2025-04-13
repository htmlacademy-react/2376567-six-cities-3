import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { Setting } from './pages/const';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      numberCards={Setting.ErrorsCount}
    >
    </App>
  </React.StrictMode>
);
