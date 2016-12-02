# Mobile App Base Project (Frontend)

This repository includes a boilerplate project used for all Seedstars Labs mobile applications. It uses Django as backend and React as frontend.

To test the application you need to also run this backend: https://github.com/seedstars/reactnative-backend-base

We build on the shoulders of giants with the following technologies:

* [React](https://github.com/facebook/react)
* [React Native](https://github.com/facebook/react-native)
* [Redux](https://github.com/rackt/redux)'s futuristic [Flux](https://facebook.github.io/react/blog/2014/05/06/flux.html) implementation
* [Redux Dev Tools](https://github.com/rackt/redux-devtools) for next generation DX (developer experience). Watch [Dan Abramov's talk](https://www.youtube.com/watch?v=xsSnOQynTHs)
* [Redux Thunk](https://github.com/gaearon/redux-thunk) Thunk middleware for Redux - used in async actions
* [Babel](http://babeljs.io) for ES6 and ES7 magic
* [React Native Config](https://github.com/luggit/react-native-config) Bring some 12 factor love to your mobile apps!
* [React Native Navigation Redux Helpers](https://github.com/bakery/react-native-navigation-redux-helpers) Redux actions and reducers for React Native experimental navigation
* [React Native Tab View](https://github.com/react-native-community/react-native-tab-view) A cross-platform Tab View component for React Native
* [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons) 3000 Customizable Icons for React Native with support for NavBar/TabBar/ToolbarAndroid, image source and full stying.
* [tcomb form](https://github.com/gcanti/tcomb-form) Forms library for react and [tcomb form native](https://github.com/gcanti/tcomb-form-native) for React Native
* [react-native-communications](https://github.com/anarchicknight/react-native-communications) Open a web address or call, email, text or iMessage (iOS only) someone in React Native

* [React Native Module for CodePush](https://github.com/Microsoft/react-native-code-push) React Native module for CodePush http://codepush.tools

* [Branch Metrics React Native SDK Reference](https://github.com/BranchMetrics/react-native-branch-deep-linking)
* [GoogleAnalyticsBridge](https://github.com/idehub/react-native-google-analytics-bridge)
* [React Native FBSDK](https://github.com/facebook/react-native-fbsdk)
* [react-native-fabric](https://github.com/corymsmith/react-native-fabric) A React Native library for Fabric, Crashlytics and Answers
* [React Native OneSignal](https://github.com/geektimecoil/react-native-onesignal) React Native Push Notifications support with OneSignal integration.

* [ESLint](http://eslint.org), [Airbnb Javascript/React Styleguide](https://github.com/airbnb/javascript), [Airbnb CSS / Sass Styleguide](https://github.com/airbnb/css) to maintain a consistent code style and [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import) to make sure all imports are correct



## Readme Notes

* Command line starts with $, the command should run with user privileges
* Command line starts with #, the command should run with root privileges


## Retrieve code

* `$ git clone https://github.com/seedstars/reactnative-mobile-app-base.git`
* `$ cd reactnative-mobile-app-base`
* `$ git submodule init`
* `$ git submodule update`
* `$ ./scripts/get_static_validation.sh`

Remember that when you copy this repository for a new project you need to add the scripts external module using:

* `$ git submodule add https://github.com/Seedstars/culture-scripts scripts`

## Installation

### NODEJS

* `# wget -qO- https://deb.nodesource.com/setup_4.x | sudo bash -`
* `# apt-get install --yes nodejs`

### Main Project

* `$ npm install`


## Running

### Installing React Native / Android Studio

Follow instructions in React Native website:

`https://facebook.github.io/react-native/docs/getting-started.html`

### Required Configuration

You need to edit the environment files to be able to use external SDKs (facebook, analysis, onesignal, etc) and also access backend.
The files are in root of project and are called: .env.local_dev, .env.production and .env.staging.


### Development

Export needed variables

* `$ export ANDROID_HOME=~/Android/Sdk`
* `$ export PATH=${PATH}:${ANDROID_HOME}/tools:${ANDROID_HOME}/platform-tools`

Start react-native development server

* `$ npm run start`

Run app on emulador

* `$ ENVFILE=.env.local_dev react-native run-android  # or any other .env`

## Testing

Confirm that the current app version dont have a staging version in codepush. other wise the will download the update.

* `code-push deployment ls "Seedstars Base" -k`


### Static analysis

Frontend (javascript static analysis)

* `$ npm run lintjs`

### Deploy

* increment app version in `.env.production`

* `$ cd android && ENVFILE=.env.production ./gradlew assembleRelease`

### CodePush Deploy
 if you don't are register in Codepush do:

 * `$ code-push register`

 The person who initial register the app should run:

 * `$ code-push collaborator add <appName> <collaboratorEmail>`

 After that you can do a release:

 * `$ code-push release-react "Seedstars Base" android -m --description "Message"`

The version are now in staging. After confirm that everything its ok, promote the version to Production.

* `$ code-push promote "Seedstars Base" Staging Production`

Any trouble check the [Documentation](http://microsoft.github.io/code-push/docs/getting-started.html)
