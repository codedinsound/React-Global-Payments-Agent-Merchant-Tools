interface Server {
  connect(): void;
  disconnect(): void;
  registerNewUser(): void;
  authenticateUser(): void;
}

interface Users {
  [key: string]: string;
}

// MARK: Local Storage Server for Testing Purposes
class LocalStorageSimulationServer implements Server {
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

      console.log(this.database);

      localStorage.setItem('usersDB', JSON.stringify(this.database));
    } else {
      console.log('Connected to local storage database usersDB');
    }
  }

  disconnect(): void {
    console.log('disconnecting from local storage server');
    delete this.database;
  }

  registerNewUser(): void {}

  authenticateUser(): void {}
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
    return null;
  }
}

export { Server, LocalStorageSimulationServer, ServerManagerController };
