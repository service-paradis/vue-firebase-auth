import { Vue } from 'vue/types/vue';

interface Firebase {

}

interface FirebaseAuth {
  check(): boolean;
  user(): User|null
}

declare module 'vue/types/vue' {
  interface Vue {
    $firebase: Firebase;
    $firebaseAuth: FirebaseAuth;
  }
}

// TODO !!!!!
