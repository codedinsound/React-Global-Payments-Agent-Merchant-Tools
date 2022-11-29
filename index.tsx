import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SessionManager } from './Controller';
import { DebuggingManager } from './Testing';

import App from './Views/App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Turns on Debugger or Off
DebuggingManager.turnOn();

root.render(
  <StrictMode>
    <App sessionManager={new SessionManager()} />
  </StrictMode>
);

// Disable Strict Mode if you want to prevent duplicate
