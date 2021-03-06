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

  constructor(firebase: any, options: FirebaseAuthOptions, router: null|VueRouter) {
    this.firebase = firebase;
    this.options = new FirebaseAuthOptions(options);
    this.router = router;

    this.initRouter();
    // TODO add axios options with interceptors for token?
  }

  check(): boolean {
    return this.user() !== null;
  }

  user(): User|null {
    return this.firebase.auth().currentUser;
  }

  register({ email, password, redirect = '/' }:
    { email: string, password: string, redirect?: string }): Promise<User|null> {
    return new Promise((resolve, reject) => {
      // TODO other registration types?
      this.firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential: firebase.auth.UserCredential) => {
            if (this.router && redirect) {
              this.router.push(redirect);
            }
            resolve(this.user());
        }).catch((error) => {
            reject(error);
        })
    });
  }

  login({ email, password, redirect = '/' }:
    { email: string, password: string, redirect?: string }): Promise<User|null> {
    return new Promise((resolve, reject) => {
      // TODO other login types?
      this.firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential: firebase.auth.UserCredential) => {
            if (this.router && redirect) {
              this.router.push(redirect);
            }
            resolve(this.user());
        }).catch((error) => {
            reject(error);
        })
    });
  }

  logout({ redirect = null }: null|{ redirect?: null|string } = { redirect: null }) {
    const authRedirect = redirect || this.options.authRedirect;
    return new Promise((resolve, reject) => {
      this.firebase.auth().signOut()
        .then(() => {
            if (this.router && authRedirect) {
              this.router.push(authRedirect);
            }
            resolve();
        }).catch((error) => {
            reject(error);
        })
    });
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
      this.router.beforeEach((to: Route, from: Route, next: any) => { // TODO typings
        // We wait until firebase is ready before continuing
        this.firebaseReady().then(() => {
          // TODO to.matched?
          const authMeta = to.meta.auth;
          const authRedirectMeta = to.meta.authRedirect || this.options.authRedirect;

          // If the route needs authentication
          if (authMeta && (authMeta === true/* || authMeta.constructor === Array // TODO roles as array or string?*/)) {
            if (!this.check()) {
              next(authRedirectMeta);
            } /* // TODO else if to check roles and redirect to forbiddenRedirect if incorrect */ else {
              next();
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
