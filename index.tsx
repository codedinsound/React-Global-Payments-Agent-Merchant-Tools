import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SessionManager } from './Controller';

import App from './Views/App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App sessionManager={new SessionManager()} />
  </StrictMode>
);

// Disable Strict Mode if you want to prevent duplicate
