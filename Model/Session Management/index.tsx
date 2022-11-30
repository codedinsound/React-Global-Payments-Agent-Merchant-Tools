interface Session {
  isLoggedIn: boolean;
  isSessionAlive: boolean;
  userHash: string;
  userName: string;
}

export { Session };
