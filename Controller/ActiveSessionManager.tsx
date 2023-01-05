import { ExcelManager } from '../Controller';
import { Session } from '../Model';

class ActiveSessionManager {
  static activeSession: Session;

  // MARK: Start a new Active Session after Loggin In.
  static startANewActiveSession(userHash: string, userName: string) {
    this.activeSession = {
      isSessionAlive: true,
      userHash,
      userName,
      userCallHistory: [],
      userWorkSheetStore: ExcelManager.generateNewExcelLayout(),
    };

    localStorage.setItem(
      'active-session-alive',
      JSON.stringify(this.activeSession)
    );
  }

  // MARK: Update Session Call History on Client Local Store.
  static updateActiveUserCallHistoryInLocalStore() {
    localStorage.setItem(
      'active-session-alive',
      JSON.stringify(this.activeSession)
    );
  }

  // MARK: Check if a Session is Alive
  static isSessionAlive(): boolean {
    if (!this.activeSession) return false;
    return this.activeSession.isSessionAlive;
  }

  // MARK: Get the Active Session State
  static getActiveSession(): Session {
    return this.activeSession;
  }

  // MARK: Reconnect to Session
  static restablishSession(): void {
    console.log('Checking if there is an active session in local storage');
    const sesh = JSON.parse(localStorage.getItem('active-session-alive'));

    if (sesh && sesh.isSessionAlive) {
      this.activeSession = sesh;
    }
  }

  // MARK: Logout and end Active Session.
  static endActiveSession(): void {

    console.log(this.activeSession); 

    this.activeSession = {
      isSessionAlive: false,
      userHash: '',
      userName: '',
      userCallHistory: [],
      userWorkSheetStore: ExcelManager.generateNewExcelLayout()
    };

    localStorage.setItem(
      'active-session-alive',
      JSON.stringify(this.activeSession)
    );
  }
}

export default ActiveSessionManager;
