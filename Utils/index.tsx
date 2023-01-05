import { DisplayObject } from '../Model';

class Utils {
  static generateNewDisplayFieldObject() {
    const obj: DisplayObject = {
      index: -1,
      mid: '',
      dba: '',
      sv: 'DBA Confirmed',
      callerName: '',
      callerTitle: '',
      callerReason: '',
    };

    return obj;
  }

  // Gets Todays Date
  static getTodaysDate(): string {
    const date = new Date();
    return `${date.getMonth() + 1}-${date.getDay()}-${date.getFullYear()}`;
  }
}

export default Utils;
