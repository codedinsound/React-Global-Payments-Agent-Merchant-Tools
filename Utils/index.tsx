import { DisplayObject } from '../Model';

class Utils {
  static generateNewDisplayFieldObject() {
    const obj: DisplayObject = {
      mid: '',
      dba: '',
      svg: '',
      callerName: '',
      callerTitle: '',
      callerReason: '',
    };

    return obj;
  }
}

export default Utils;
