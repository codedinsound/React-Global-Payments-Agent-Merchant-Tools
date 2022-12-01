import { SHA1, AES, enc } from 'crypto-js';

import { Session } from '../Model';

interface Credentials {
  username: string;
  password: string;
}

class ActiveSessionManager {
  static callHistory;
  static activeSession: Session;

  static getActiveSession(): Session {
    return this.activeSession;
  }

  // MARK: Store in to Local Storage Cache
  static storeIntoActiveSessionCache(newEntry) {
    const cachedCallHistory = JSON.parse(
      localStorage.getItem('active-session-cache')
    );

    // localStorage.setItem('active-session-cache', JSON.stringify(newCache));
  }

  static createNewActiveSession(sessionParams) {
    const aliveParams: Session = {
      isSessionAlive: true,
      isLoggedIn: true,
      userHash: sessionParams.userHash,
      userName: sessionParams.userName,
    };

    localStorage.setItem('active-session-alive', JSON.stringify(aliveParams));
    localStorage.setItem('active-session-cache', JSON.stringify([]));
  }

  static reestablisActiveSession() {
    const callHistoryCache = JSON.parse(
      localStorage.getItem('active-session-cache')
    );

    const activeCache = JSON.parse(
      localStorage.getItem('active-session-alive')
    );

    if (callHistoryCache === null) {
      this.callHistory = [];
    } else {
      this.callHistory = callHistoryCache;
    }

    if (activeCache === null) {
      this.activeSession = {
        isLoggedIn: false,
        isSessionAlive: false,
        userHash: '',
        userName: '',
      };
    } else {
      this.activeSession = activeCache;
    }

    return this.callHistory.userCallHistory;
  }

  static endSession() {
    const reset: Session = {
      isLoggedIn: false,
      isSessionAlive: false,
      userHash: '',
      userName: '',
    };

    localStorage.setItem('active-session-alive', JSON.stringify(reset));
    localStorage.setItem('active-session-cache', JSON.stringify([]));
  }

  // NOTE: Transform this into a live booleanic Value
  static checkForActiveSessions() {
    const isAlive: boolean = JSON.parse(
      localStorage.getItem('active-session-alive')
    );

    if (isAlive === null) {
      return false;
    }

    return isAlive;
  }
}

// For Simulating a Database Using Local Storage Actual Authentication Goes
// Deeper than that with utilizing a server and database respectively.
class LocalSessionWorker {
  // Auth
  authenticate(credentials: Credentials) {
    let userCallHistory;

    const master = {
      usersList: JSON.parse(localStorage.getItem('users')),
    };

    const getUsernameHashValue = SHA1(credentials.username).toString();

    if (!master.usersList[getUsernameHashValue]) {
      return false;
    }

    // Compares the password provided with the one from local database
    const val = AES.decrypt(
      master.usersList[getUsernameHashValue].p,
      credentials.password
    ).toString(enc.Utf8);

    // This Section of Code Generates a temporary token with all the users
    if (val === credentials.password) {
      userCallHistory = ActiveSessionManager.callHistory;

      console.log(138, ActiveSessionManager.callHistory); // <---------------------------------------------------------- DEUBGGER

      // // Create an active live session
      // console.log(credentials.username);

      const sessionParams = {
        userHash: getUsernameHashValue,
        userName: credentials.username,
        userCallHistory: [],
      };

      console.log(150, sessionParams); // <---------------------------------------------------------- DEUBGGER

      ActiveSessionManager.createNewActiveSession(sessionParams);

      return {
        user: getUsernameHashValue,
        userCallHistory: [],
      };
    }

    console.log('Wrong Password');
    delete master.usersList;

    return false;
  }

  // MARK: Register New Agents
  register(credentials: Credentials) {
    const compared = credentials.password;

    credentials.password = AES.encrypt(
      credentials.password,
      credentials.password
    ).toString();

    const hash = SHA1(credentials.username).toString();
    credentials.username = hash;

    const users = JSON.parse(localStorage.getItem('users'));

    users[credentials.username] = {
      p: credentials.password,
      tch: [],
    };

    // Register the User
    localStorage.setItem('users', JSON.stringify(users));
  }
}

class SessionManager {
  private localSessionWorker: LocalSessionWorker;

  constructor() {
    this.localSessionWorker = new LocalSessionWorker();
  }

  // public localSessionRegister(credentals): void {
  //   this.localSessionWorker.register(credentals);
  // }

  public localSessionAuthenticate(credentials) {
    return this.localSessionWorker.authenticate(credentials);
  }
}

export { SessionManager, ActiveSessionManager };
