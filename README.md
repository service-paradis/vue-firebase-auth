# Vue Firebase Auth

A simple light-weight authentication library for Vue.

## Installation

```bash
npm install @service-paradis/vue-firebase-auth
```

## Usage
### Basic Configuration
```js
import FirebaseAuth from '@service-paradis/vue-firebase-auth'

Vue.use(FirebaseAuth, {
    project: {
        apiKey: '<API_KEY>',
        authDomain: '<PROJECT_ID>.firebaseapp.com',
        databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
        storageBucket: '<BUCKET>.appspot.com',
        messagingSenderId: '<SENDER_ID>',
        projectId: '<PROJECT_ID>',
    }
})
```

### Using Options

#### Available option (all optional)
##### authRedirect: `'/login'`
* Redirect to use if authentication is required on a route.
// TODO other options

#### Usage
```js
const router = new VueRouter();
Vue.use(FirebaseAuth, {
    project: {
        // ...
    },
    options: {
        authRedirect: '/auth/login'
    }
})
```
// TODO other options


### Using VueRouter
This plugin works with the `vue-router` plugin. Setting an `auth` meta field in the router mapping section will ensure authenticated access to that route.

#### Usage
```js
const router = new VueRouter();
Vue.use(FirebaseAuth, {
    project: {
        // ...
    },
    router
})
```

#### Routing meta

##### auth: `true`
* User must be authenticated.
##### auth: `false`
* If the user is logged in, this route will be unavailable. Useful for login/register pages to be unaccessible once the user is logged in.
##### auth: `undefined`
* Public, no checks required.
##### authRedirect: `String`
Each route can define it's own specific redirect.
**NOTE:** If not set it will default to the global redirect options.

// TODO roles? Inspiration from https://raw.githubusercontent.com/websanova/vue-auth/master/docs/Privileges.md
// TODO usage example


// TODO explain that $firebaseAuth will be available everywhere
### Available Methods

### user
* Returns the current user or null if there is not.

#### Usage
```html
<div>
    {{ $firebaseAuth.user().displayName }}
</div>
```

### check
* Check to see if the user is logged in.
// TODO roles as argument?

```html
<router-link v-if="!$firebaseAuth.check()"
             :to="'/login'">
    login
</router-link>
<a v-if="$firebaseAuth.check()"
   @:click="$firebaseAuth.logout()">
    logout
</a>
```

### register
* Will register user using Firebase Authentication with email and password.
* Required parameters: `email` and `password`
* Accepts `redirect` parameter which is passed directly to router when registration is successful. (default to '/')
// TODO other types

```js
const { email, password } = this;
this.$firebaseAuth.register({ email, password })
    .then((user) => {
        console.log('User created successfully:', user);
        // You can create user related record in database here
    }).catch((error) => {
        console.error('Registration Failed:', error);
        // Handle error here
    });
```

### login
* Will login user using Firebase Authentication with email and password.
* Required parameters: `email` and `password`
* Accepts `redirect` parameter which is passed directly to router when login is successful. (default to '/')
// TODO other types

```js
const { email, password } = this;
this.$firebaseAuth.login({ email, password })
    .then((user) => {
        console.log('User logged in successfully:', user);
        // Some actions on login here
    }).catch((error) => {
        console.error('Login Failed:', error);
        // Handle error here
    });
```

### logout
* Will logout user using Firebase.
* Accepts `redirect` parameter which is passed directly to router when logout is successful. (default to authRedirect option)

```js
this.$firebaseAuth.logout({ redirect = '/signed-out' })
    .then(() => {
        console.log('User logged out successfully.');
        // Some actions on logout here
    }).catch((error) => {
        console.error('Logout Failed:', error);
        // Should not happen, but handle potential error here
    });
```


## WIP (Coming soon)

- Available Methods
  - ready()?
  - check() to improve with roles checking
  - token()?
  - fetch()?
  - refresh()?
- Different types for register/login (Google, Facebook, etc.)
- router meta management for role?
- Axios Interceptors
  - retrieve received new token when available on response
  - insert token on every request
- Password reset management?

// TODO split documentation into separate section (files)