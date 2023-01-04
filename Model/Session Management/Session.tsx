interface Session {
  isSessionAlive: boolean;
  userHash: string;
  userName: string;
  userCallHistory: any[];
  userWorkSheetStore: any[];
}

export default Session;
