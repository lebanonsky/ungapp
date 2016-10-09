// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'com.unginfo.app',
  name: 'Unginfo App',
  version: "0.0.1"
});

//android build version 4.2
App.setPreference('android-targetSdkVersion', '17');
App.setPreference('android-minSdkVersion', '17');

//ios
App.setPreference("BackupWebStorage", "local");
App.accessRule('*');