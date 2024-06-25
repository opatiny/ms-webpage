import React from 'react';
import ReactDOM from 'react-dom/client';

import Monitoring from './demo/Monitoring';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <h1>Maze</h1>
    <Monitoring />
  </React.StrictMode>,
);
