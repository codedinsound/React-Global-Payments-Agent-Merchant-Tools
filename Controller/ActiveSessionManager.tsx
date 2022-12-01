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
    if (!this.activeSession) return false;
    return this.activeSession.isSessionAlive;
  }

  static getActiveSession(): Session {
    return this.activeSession;
  }

  static restablishSession() {
    console.log('Checking if there is an active session in local storage');
    const sesh = JSON.parse(localStorage.getItem('active-session-alive'));

    if (sesh && sesh.isSessionAlive) {
      this.activeSession = sesh;
    }
  }
}

export default ActiveSessionManager;
