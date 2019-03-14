# Vue Firebase Auth

A simple light-weight authentication library for Vue.

## Installation

```bash
TODO: npm install @service-paradis/vue-firebase-auth
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
    {{ $auth.user().displayName }}
</div>
```

### check
* Check to see if the user is logged in.
// TODO roles as argument

```html
<router-link v-if="!$auth.check()"
             :to="'/login'">
    login
</router-link>
<a v-if="$auth.check()"
   @:click="$auth.logout()">
    logout
</a>
```


## WIP (Coming soon)

- Available Methods
  - ready()?
  - check() to improve with roles checking
  - token()?
  - fetch()?
  - refresh()?
  - register()
  - login() (with different types?)
  - logout()
- router meta management for role?
- Axios Interceptors
  - retrieve received new token when available on response
  - insert token on every request
- Password reset management?

// TODO split documentation into separate section (files)