import { DisplayObject } from '../Model';
import { AES, enc } from 'crypto-js';

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
  static login(payload): void {
    console.log(payload);

    const encrypted = AES.encrypt(
      payload.username,
      payload.password
    ).toString();

    console.log(encrypted);

    // const bytes = AES.decrypt(cipher, payload.password);
  }

  static isLoggedIn(): void {}

  static logout(): void {}
}

export { LocalStorageWorker, SessionManagerWorker };
