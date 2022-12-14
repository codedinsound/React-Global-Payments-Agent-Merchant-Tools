import { DisplayObject } from '../Model';

class Utils {
  static generateNewDisplayFieldObject() {
    const obj: DisplayObject = {
      mid: '',
      dba: '',
      sv: 'DBA Confirmed',
      callerName: '',
      callerTitle: '',
      callerReason: '',
    };

    return obj;
  }
}

export default Utils;
