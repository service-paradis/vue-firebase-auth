import { VueConstructor } from 'vue';
import VueRouter from 'vue-router';

import Firebase from 'firebase/app';
import 'firebase/auth';

import FirebaseAuthOptions from './firebase-auth-options.interface';
import FirebaseAuth from './vue-firebase-auth';

export default {
  install(Vue: VueConstructor,
          {
            project,
            options = {},
            router = null,
          }: InstallParameters) { // TODO axios?

    const firebase = Firebase.initializeApp(project);
    const firebaseAuth = new FirebaseAuth(firebase, options, router);

    Vue.prototype.Firebase = Firebase;
    Vue.prototype.$firebase = firebase;
    Vue.prototype.$firebaseAuth = firebaseAuth;

  },
};

interface InstallParameters {
  project: any; // TODO type
  options: FirebaseAuthOptions;
  router: null|VueRouter;
}
