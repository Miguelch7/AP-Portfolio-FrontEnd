// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'portfolio-web-miguelch',
    appId: '1:112309329593:web:7e7ed4f66141d91f2c0568',
    storageBucket: 'portfolio-web-miguelch.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyCpASok7VMwXdbxNf5ZWQoh_XG1NWE0PTE',
    authDomain: 'portfolio-web-miguelch.firebaseapp.com',
    messagingSenderId: '112309329593',
  },
  production: false,
  apiUrl: 'https://portfolio-web-mch.herokuapp.com',
  emailReceiver: 'noreply.miguelch@gmail.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
