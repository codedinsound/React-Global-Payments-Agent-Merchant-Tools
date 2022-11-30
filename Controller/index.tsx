import { SHA1, AES, enc } from 'crypto-js';

interface Credentials {
  username: string;
  password: string;
}

interface Session {
  isLoggedIn: boolean;
  isSessionAlive: boolean;
  userHash: string;
  userName: string;
}

class ActiveSessionManager {
  static callHistory;
  static activeSession: Session;

  static getActiveSession(): Session {
    return this.activeSession;
  }

  // MARK: Store in to Local Storage Cache
  static storeIntoActiveSessionCache() {
    const cachedCallHistory = JSON.parse(
      localStorage.getItem('active-session-cache')
    );

    const newCache = {
      ...cachedCallHistory,
      ...this.callHistory,
    };

    localStorage.setItem('active-session-cache', JSON.stringify(newCache));
  }

  static createNewActiveSession(sessionParams) {
    console.log('Creating new Session with Params');

    const aliveParams: Session = {
      isSessionAlive: true,
      isLoggedIn: true,
      userHash: sessionParams.userHash,
      userName: sessionParams.userName,
    };

    const sessionCache = {
      userCallHistory: sessionParams.userCallHistory,
    };

    localStorage.setItem('active-session-alive', JSON.stringify(aliveParams));
    localStorage.setItem('active-session-cache', JSON.stringify(sessionCache));
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
    console.log('ending session');

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
    console.log('Check if Session is Alive');

    const isAlive: boolean = JSON.parse(
      localStorage.getItem('active-session-alive')
    );

    if (isAlive === null) {
      console.log("Session Information in Local Storage Doesn't Exist");
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

    console.log('Gets the entire local database of users...');
    console.log(117, master);

    const getUsernameHashValue = SHA1(credentials.username).toString();

    console.log(master);

    if (!master.usersList[getUsernameHashValue]) {
      console.log('user not found....');
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
    console.log(credentials);

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

  public localSessionRegister(credentals): void {
    this.localSessionWorker.register(credentals);
  }

  public localSessionAuthenticate(credentials) {
    return this.localSessionWorker.authenticate(credentials);
  }
}

export { SessionManager, ActiveSessionManager };

// console.log(
//   AES.decrypt(credentials.password, '123456A').toString(enc.Utf8)
// );

// const decryptedTest = AES.decrypt(credentials.password, '123456A').toString(
//   enc.Utf8
// );

// if (credentials.username === decryptedTest) {
//   console.log(true);
// }

// console.log('decrypted text: ', decryptedTest);
