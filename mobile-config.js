// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'com.capcarde.langex',
  name: 'Langex',
  description: 'Langex',
  author: 'Camilo Pestana',
  email: 'capcarde@gmail.com',
  website: 'http://example.com'
});

// Set up resources such as icons and launch screens.
App.icons({
  /*
  'android_ldpi':'public/icons/android/icon-36-ldpi.png',
  'android_mdpi':'public/icons/android/icon-48-mdpi.png',
  'android_hdpi':'public/icons/android/icon-72-hdpi.png',
  'android_xhdpi':'public/icons/android/icon-96-xhdpi.png'
  */
  // ... more screen sizes and platforms ...
});

App.launchScreens({
  /*
  'android_ldpi_portrait': 'public/screens/android/screen-ldpi-portrait.png',
  'android_mdpi_portrait': 'public/screens/android/screen-mdpi-portrait.png',
  'android_hdpi_portrait': 'public/screens/android/screen-hdpi-portrait.png',
  'android_xhdpi_portrait': 'public/screens/android/screen-xhdpi-portrait.png'
  */
  // ... more screen sizes and platforms ...
});

// Set PhoneGap/Cordova preferences
//App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('DisallowOverscroll', true);
App.setPreference('HideKeyboardFormAccessoryBar', true);
//App.setPreference('StatusBarBackgroundColor', '#3F51B5');
//App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'portrait', 'android');

// Pass preferences for a particular PhoneGap/Cordova plugin
/*App.configurePlugin('com.phonegap.plugins.facebookconnect', {
  APP_ID: '1234567890',
  API_KEY: 'supersecretapikey'
});
*/
