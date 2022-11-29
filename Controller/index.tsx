import { DisplayObject } from '../Model';
import { SHA1, AES, enc } from 'crypto-js';
import { useReducer } from 'react';

class LocalStorageWorker {
  static load(): DisplayObject[] {
    const retrivedStorage: string = localStorage.getItem('history');
    return retrivedStorage !== null ? JSON.parse(retrivedStorage) : [];
  }

  static store(data): void {
    let retrivedStorage = JSON.parse(localStorage.getItem('users'));

    console.log('past', data);
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

// For Simulating a Database Using Local Storage Actual Authentication Goes
// Deeper than that with utilizing a server and database respectively.
class LocalSessionWorker implements Session {
  // Auth
  authenticate(credentials: Credentials) {
    const master = {
      usersList: JSON.parse(localStorage.getItem('users')),
    };

    const getUsernameHashValue = SHA1(credentials.username).toString();

    if (!master.usersList[getUsernameHashValue]) {
      console.log('user not found....');
      return false;
    }

    const val = AES.decrypt(
      master.usersList[getUsernameHashValue].p,
      credentials.password
    ).toString(enc.Utf8);

    let userCallHistory;

    // This Section of Code Generates a temporary token with all the users
    if (val === credentials.password) {
      userCallHistory = master.usersList[getUsernameHashValue].tch;
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

    console.log(credentials);

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

export { LocalStorageWorker, SessionManager };

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
