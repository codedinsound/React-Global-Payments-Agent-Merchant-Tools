import { DisplayObject } from '../Model';
import { SHA1, AES, enc } from 'crypto-js';
import { useReducer } from 'react';

class LocalStorageWorker {
  static load(): DisplayObject[] {
    const retrivedStorage: string = localStorage.getItem('history');
    return retrivedStorage !== null ? JSON.parse(retrivedStorage) : [];
  }

  static store(data: any[]): void {
    localStorage.setItem('history', JSON.stringify(data));
  }
}

async function getClientIPAddress() {
  const res = await fetch('https://geolocation-db.com/json/');
  const data = await res.json();

  return data.IPv4;
}

class SessionManagerWorker {
  static async login(data) {
    console.log(data);

    let IPv4: string = await getClientIPAddress();

    const encryptedPassword = AES.encrypt(
      data.username, // Message
      data.password // Key
    ).toString();

    console.log(encryptedPassword);

    const payload = {
      IPv4,
      username: data.username,
      password: encryptedPassword,
    };

    console.log(payload);

    fetch('https://gp-broomfield-neo-server.codedsound.repl.co/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // const bytes = AES.decrypt(cipher, payload.password);
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

    const val = AES.decrypt(
      master.usersList[getUsernameHashValue].p,
      credentials.password
    ).toString(enc.Utf8);

    let userCallHistory;

    // This Section of Code Generates a temporary token with all the users
    if (val === credentials.password) {
      userCallHistory = master.usersList[getUsernameHashValue].tch;
      return userCallHistory;
    }

    delete master.usersList;

    return null;
  }
  register(credentials: Credentials) {
    console.log(credentials);

    // credentials.username = AES.encrypt(
    //   credentials.username,
    //   credentials.username
    // ).toString();

    // const compared = credentials.password;

    // credentials.password = AES.encrypt(
    //   credentials.password,
    //   credentials.password
    // ).toString();

    // const users = {
    //   template: {
    //     p: 'test',
    //     tch: [],
    //   },
    // };

    // const hash = SHA1(credentials.username).toString();
    // credentials.username = hash;

    // users[credentials.username] = {
    //   p: credentials.password,
    //   tch: [],
    // };

    // Register the User
    // localStorage.setItem('users', JSON.stringify(users));

    // const reshash = SHA1(credentials.username).toString();
    // console.log(usersList[reshash]);

    // const val = AES.decrypt(usersList[reshash].p, '123456A').toString(enc.Utf8);

    console.log('token generated: ', this.authenticate(credentials));
    // usersList[credentials.username] = {
    //   p: credentials.password,
    //   tch: [],
    // };

    // localStorage.setItem('users', JSON.stringify(usersList));

    // users['template'].p = 'test';
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
