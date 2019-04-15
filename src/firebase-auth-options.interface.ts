import { User } from 'firebase';

export default class FirebaseAuthOptions {

  authRedirect?: string = '/login';
  // TODO useful options

  constructor({ authRedirect = '/login' }: any = {}) {
      this.authRedirect = authRedirect;
  }

} // TODO rename file (no more an interface)
