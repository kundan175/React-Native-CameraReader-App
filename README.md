# CameraReader

## Overview

CameraReader is an application that leverages the camera to read and process various forms of data.

## Setup

To get started with the CameraReader app, you need to set up Firebase for your project. Follow the instructions below to configure your Firebase settings.

### Firebase Configuration

1. **Create a Firebase Project:**

   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Click on "Add project" and follow the setup instructions to create a new project.

2. **Add Your App to Firebase:**

   - In the Firebase Console, click on the "Add app" button and choose your platform (iOS, Android, or Web).
   - Follow the setup steps provided by Firebase for your chosen platform.

3. **Obtain Firebase Configuration:**

   - After adding your app, Firebase will provide you with the configuration details that include `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`, and `measurementId`.

4. **Add `secret_config.js`:**
   - Create a new file named `secret_config.js` in the root directory of your project.
   - Add the following code to `secret_config.js`, replacing the placeholder values with your actual Firebase configuration details:

```js
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id",
};

export default firebaseConfig;
```
