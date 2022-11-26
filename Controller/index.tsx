import { DisplayObject } from '../Model';
import { encrypt, decrypt } from 'react-crypt-gsm';

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

    payload.username = encrypt(payload.username).content;
    payload.password = encrypt(payload.password);
    const decoder = new TextDecoder();

    let pass = payload.password;

    console.log(decrypt(pass));
  }

  static isLoggedIn(): void {}

  static logout(): void {}
}

export { LocalStorageWorker, SessionManagerWorker };
