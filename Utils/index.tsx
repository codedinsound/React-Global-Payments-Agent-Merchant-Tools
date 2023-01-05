import { DisplayObject } from '../Model';

class Utils {
  // Generates a New display Object
  static generateNewDisplayFieldObject(): DisplayObject {
    return {
      index: -1,
      mid: '',
      dba: '',
      sv: 'DBA Confirmed',
      callerName: '',
      callerTitle: '',
      callerReason: '',
    };
  }

  // Gets Todays Date
  static getTodaysDate(): string {
    const date = new Date();
    return `${date.getMonth() + 1}-${date.getDay()}-${date.getFullYear()}`;
  }
}

export default Utils;
