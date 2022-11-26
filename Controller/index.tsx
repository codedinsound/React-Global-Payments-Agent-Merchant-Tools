import { DisplayObject } from '../Model';

class LocalStorageWorker {
  static load(): DisplayObject[] {
    const retrivedStorage: string = localStorage.getItem('history');
    return retrivedStorage !== null ? JSON.parse(retrivedStorage) : [];
  }

  static store(data: any[]): void {
    localStorage.setItem('history', JSON.stringify(data));
  }
}

class SessionManagerWorker {
  static login(): void {}

  static isLoggedIn(): void {}

  static logout(): void {}
}

export { LocalStorageWorker, SessionManagerWorker };
