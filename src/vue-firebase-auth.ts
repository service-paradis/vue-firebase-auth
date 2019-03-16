import Firebase from 'firebase/app';
import { User } from 'firebase';
import 'firebase/auth';
import VueRouter, { Route } from 'vue-router';

import FirebaseAuthOptions from './firebase-auth-options.interface';
// TODO firebase persistence as option?

export default class FirebaseAuth {

  private firebase: Firebase.app.App;
  private options: FirebaseAuthOptions;
  private router: null|VueRouter;
  private axios: null|any;

  constructor(firebase: any, options: FirebaseAuthOptions, router: null|VueRouter, axios: null|any) { // TODO axios type
    this.firebase = firebase;
    this.options = new FirebaseAuthOptions(options);
    this.router = router;
    this.axios = axios;

    this.initRouter();
    // TODO if an axios options have been added, add interceptors for token
  }

  check(): boolean {
    return this.user() !== null;
  }

  user(): User|null {
    return this.firebase.auth().currentUser;
  }

  register({ email, password, redirect = '/' }:
    { email: string, password: string, redirect: string}): Promise<User|null> {
    return new Promise((resolve, reject) => {
      // TODO other types?
      this.firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential: firebase.auth.UserCredential) => {
          if (this.router && redirect) {
            this.router.push(redirect);
          }
          resolve(this.user());
      }).catch((error) => {
          console.error(error);
          reject(error);
      })
    });
  } // TODO test error

  login() {
    // TODO (with different types?)
  }

  logout() {
    // TODO
  }


  token() {
    // TODO? (need to use onIdTokenChanged?)
  }

  fetch() {
    // TODO?
  }

  refresh() {
    // TODO?
  }


  private firebaseReady(): Promise<User|null> {
    return new Promise((resolve, reject) => {
      this.firebase.auth().onAuthStateChanged((currentUser: User|null) => {
        resolve(currentUser);
      }, (error) => {
        console.error(error);
        reject(reject);
      });
    });
  }

  private initRouter() {
    if (this.router) {
      this.router.beforeEach((to: Route, from: Route, next: any) => { // TODO types?
        // We wait until firebase is ready before continuing
        this.firebaseReady().then(() => {
          // TODO to.matched?
          const authMeta = to.meta.auth;
          const authRedirectMeta = to.meta.authRedirect || this.options.authRedirect;

          // If the route needs authentication
          if (authMeta && (authMeta === true/* || authMeta.constructor === Array // TODO roles as array or string?*/)) {
            if (!this.check()) {
              next(authRedirectMeta);
            } /* TODO else if to check roles and redirect to forbiddenRedirect if incorrect */ else {
              next(); // TODO test
            }
          } else if (authMeta === false && this.check()) {
            // If the route is unaccessible from logged in users
            next(); // TODO redirect to notFoundRedirect
          } else {
            next();
          }
        });
      }); // TODO catch!
    }
  }
}
