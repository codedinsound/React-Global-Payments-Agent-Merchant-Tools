import { Session } from '../Model';

class ActiveSessionManager {
  static activeSession: Session;

  static startANewActiveSession(userHash: string, userName: string) {
    this.activeSession = {
      isSessionAlive: true,
      userHash,
      userName,
      userCallHistory: [],
    };

    localStorage.setItem(
      'active-session-alive',
      JSON.stringify(this.activeSession)
    );
  }

  static isSessionAlive(): boolean {
    return true;
  }
}

export default ActiveSessionManager;
