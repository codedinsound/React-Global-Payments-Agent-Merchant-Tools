import { SHA1, AES, enc } from 'crypto-js';
import ActiveSessionManager from '../Controller/ActiveSessionManager';

interface Authenticate {
  registerNewUser(): void;
  authenticateUser(payload): void;
}

interface Server extends Authenticate {
  connect(): void;
  disconnect(): void;
}

// Users Interface
interface Users {
  [key: string]: string;
}

// MARK: Local Storage Server for Testing Purposes
class LocalStorageSimulationServer implements Authenticate {
  private database: Users;

  connect(): void {
    console.log('Connecting to Local Storage Server.......');

    this.database = JSON.parse(localStorage.getItem('usersDB'));

    if (!this.database) {
      console.log('Creating new simulated database for testing');
      this.database = {
        '24adc97d46a48d334d86558646f0f8c841d5260c':
          'U2FsdGVkX19vteDGe4HPQtxPCj0vv/UwIoKd64Xq0u8=',
      };

      localStorage.setItem('usersDB', JSON.stringify(this.database));
    } else {
      console.log('Connected to local storage database usersDB');
    }
  }

  // MARK: Disconnects from Local Storage Server Test Instance
  disconnect(): void {
    console.log('disconnecting from local storage server');
    delete this.database;
  }

  registerNewUser(): void {}

  authenticateUser(payload): void {
    const { username, password } = payload;
    const getUsernameHashValue = SHA1(username).toString();

    let pass = this.database[getUsernameHashValue];

    if (!pass) {
      console.log('Return False user not found in database');
    }

    let isValidUser = AES.decrypt(pass, password).toString(enc.Utf8);

    if (isValidUser === password) {
      console.log('User authenticated and starting new session');

      // TODO: Initiliaze a New Active Session
      ActiveSessionManager.startANewActiveSession(
        getUsernameHashValue,
        username
      );
    } else {
      console.log('Wrong Password');
    }
  }
}

// MARK: External API Server
class ServerManagerController {
  private server: Server;

  constructor(server: Server) {
    this.server = server;
  }

  public connect(): void {
    this.server.connect();
  }

  public disconnect(): void {}

  public getServer(): Server {
    return this.server;
  }
}

export { Server, LocalStorageSimulationServer, ServerManagerController };
