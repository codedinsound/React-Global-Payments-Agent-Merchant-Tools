import Credentials from './Credentials';

interface Session {
  isLoggedIn: boolean;
  isSessionAlive: boolean;
  userHash: string;
  userName: string;
}

export { Credentials, Session };
