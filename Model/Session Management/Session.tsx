interface Session {
  isSessionAlive: boolean;
  userHash: string;
  userName: string;
  userCallHistory: any[];
}

export default Session;
