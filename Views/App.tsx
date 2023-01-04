import * as React from 'react';
import { useState } from 'react';
import LoginForm from '../Views/LoginView';
import MainToolsView from '../Views/MainToolsView';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import './style.css';
import {
  ActiveSessionManager,
  ExcelManager,
  LocalStorageSimulationServer,
  ServerManagerController,
} from '../Controller';
import { Credentials } from '../Model';

// ESTABLISH SERVER CONNECTION
// ----------------------------------------------------
const server = new ServerManagerController(new LocalStorageSimulationServer());
server.connect();
// -----------------------------------------------------

const Protected = ({ children }) => {
  if (!ActiveSessionManager.isSessionAlive())
    return <Navigate to="/" replace />;
  return children;
};

export default function App() {
  // Check if There is an Active Session
  ActiveSessionManager.restablishSession();

  // MARK: Handle Session Token
  const [sessionToken, updateSessionToken] = useState(
    ActiveSessionManager.isSessionAlive()
      ? ActiveSessionManager.getActiveSession()
      : null
  );

  // MARK: Handle Workbook Excel Sheet State
  const [excelState, updateExcelState] = useState(
    ActiveSessionManager.isSessionAlive()
      ? ActiveSessionManager.getActiveSession().userWorkSheetStore
      : ExcelManager.generateNewExcelLayout()
  );

  console.log(excelState);

  // MARK: Login into Application Handler
  const loginIntoToolsHandler = (credentials: Credentials) => {
    server.getServer().authenticateUser(credentials);

    if (!ActiveSessionManager.isSessionAlive()) return false;

    updateSessionToken(ActiveSessionManager.getActiveSession());

    return true;
  };

  // MARK: Log Out of the Screen
  const logOutOfToolsHandler = (e) => {
    console.log('Logging Out....');
    ActiveSessionManager.endActiveSession();
    updateSessionToken(null);
  };

  // MARK: Update Excel Sheet Handler
  const updateExcelHandler = (newField) => {
    // return `Caller Name: ${displayFields.callerName}\nTitle: ${displayFields.callerTitle}\nSecondary Verification: ${displayFields.sv}\nReason: ${displayFields.callerReason} - no FQA.`;
    // 'Merchant ID',
    // 'DBA',
    // 'SV',
    // 'Caller Name',
    // 'Caller Title',
    // 'Caller Reason',
    const newEntry = [
      newField.mid,
      newField.dba,
      newField.sv,
      newField.callerName,
      newField.callerTitle,
      newField.callerReason,
    ];

    excelState.push(newEntry);

    updateExcelState(excelState);

    console.log(excelState);
  };

  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <LoginForm loginIntoToolsHandler={loginIntoToolsHandler} />
            }
          />
          <Route
            path="/tools"
            element={
              <Protected>
                <MainToolsView
                  userCallHistory={
                    sessionToken !== null ? sessionToken.userCallHistory : null
                  }
                  updateExcelHandler={updateExcelHandler}
                  logOutOfToolsHandler={logOutOfToolsHandler}
                />
              </Protected>
            }
          />
        </Routes>
      </Router>
    </React.Fragment>
  );
}
