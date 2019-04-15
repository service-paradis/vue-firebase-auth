import { Vue } from 'vue/types/vue';
import { User } from 'firebase';

import _Vue from 'vue';
export declare function install(Vue: typeof _Vue): void;

interface Firebase {

}

interface FirebaseAuth {

  check(): boolean;

  user(): User|null;

  register({ email, password, redirect }: { email: string, password: string, redirect?: string }): Promise<User|null>;

  login({ email, password, redirect }: { email: string, password: string, redirect?: string }): Promise<User|null>;

  logout(params?: null|{ redirect?: null|string }): Promise<null>;
}

declare module 'vue/types/vue' {
  interface Vue {
    $firebase: Firebase;
    $firebaseAuth: FirebaseAuth;
  }
}

// TODO
