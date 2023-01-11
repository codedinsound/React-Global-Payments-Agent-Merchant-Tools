import { DisplayObject } from '../Model';

class Utils {
  // MARK: Generates a New display Object
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

  // MARK: Gets Todays Date
  static getTodaysDate(): string {
    const date = new Date();
    return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
  }
}

export default Utils;
