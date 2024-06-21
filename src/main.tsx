import React from 'react';
import ReactDOM from 'react-dom/client';

import Maze from './demo/Maze';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <h1>Maze</h1>
    <Maze />
  </React.StrictMode>,
);
