// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  clientId: 'bda62570-d959-453d-9af5-aae9f15c2c74',
  authority: 'https://login.microsoftonline.com/ac765bab-27a8-484f-a45a-fea45f848c01',
  redirectUrl: 'http://localhost:4200',
  firebase: {
    apiKey: "AIzaSyA66myDUKulTPxWlrk6s4u0CdUyUrWV1q4",
    authDomain: "enterprise-app-demo.firebaseapp.com",
    projectId: "enterprise-app-demo",
    storageBucket: "enterprise-app-demo.appspot.com",
    messagingSenderId: "760600305727",
    appId: "1:760600305727:web:5b5ff26f46c30fa436588a",
    measurementId: "G-VCTSEGP8JZ"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
