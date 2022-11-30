import { DisplayObject } from '../Model';
import { SHA1, AES, enc } from 'crypto-js';

class LocalStorageWorker {
  static load(): DisplayObject[] {
    const retrivedStorage: string = localStorage.getItem('history');
    return retrivedStorage !== null ? JSON.parse(retrivedStorage) : [];
  }

  static store(data): void {
    let retrivedStorage = JSON.parse(localStorage.getItem('users'));

    retrivedStorage[data.user].tch = data.merchantHistory;

    // Update Local Storage
    retrivedStorage = JSON.stringify(retrivedStorage);

    localStorage.setItem('users', retrivedStorage);
  }
}

interface Session {
  register(credentials);
  authenticate(credentials);
}

interface Credentials {
  username: string;
  password: string;
}

class ActiveSessionManager {
  static callHistory;

  static createNewActiveSession(sessionParams) {
    console.log('Creating new Session with Params', sessionParams);

    // TODO: CREATE LOGIC FOR CREATING A LIVE SESSION IN LOCAL STORAGE

    const aliveParams = {
      isSessionAlive: sessionParams.isSessionAlive,
      isLoggedIn: true,
      userHash: sessionParams.userHash,
      userName: sessionParams.userName,
    };

    const sessionCache = {
      userCallHistory: sessionParams.userCallHistory,
    };

    console.log(45, aliveParams);

    localStorage.setItem('active-session-alive', JSON.stringify(aliveParams));
    localStorage.setItem('active-session-cache', JSON.stringify(sessionCache));
  }

  static reestablisActiveSession() {
    this.callHistory = JSON.parse(localStorage.getItem('active-session-cache'));
    return this.callHistory;
  }

  static endSession() {}

  static sessionTimeout() {}

  static checkForActiveSessions() {
    console.log('Active Session Found');

    const seshString: string = localStorage.getItem('active-session-alive');
    const sesh = JSON.parse(seshString);

    if (sesh && sesh.isSessionAlive) return sesh;

    return null;
  }
}

// For Simulating a Database Using Local Storage Actual Authentication Goes
// Deeper than that with utilizing a server and database respectively.
class LocalSessionWorker implements Session {
  // Auth
  authenticate(credentials: Credentials) {
    let userCallHistory;

    const master = {
      usersList: JSON.parse(localStorage.getItem('users')),
    };

    console.log('Gets the entire local database of users...');
    console.log(master);

    const getUsernameHashValue = SHA1(credentials.username).toString();

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
      userCallHistory = master.usersList[getUsernameHashValue].tch;

      console.log(userCallHistory);

      // Create an active live session
      console.log(credentials.username);

      const sessionParams = {
        isSessionAlive: true,
        userHash: getUsernameHashValue,
        userName: credentials.username,
        userCallHistory,
      };

      ActiveSessionManager.createNewActiveSession(sessionParams);

      return {
        user: getUsernameHashValue,
        userCallHistory,
      };
    }

    console.log('Wrong Password');
    delete master.usersList;

    return false;
  }
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

export { LocalStorageWorker, SessionManager, ActiveSessionManager };

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
