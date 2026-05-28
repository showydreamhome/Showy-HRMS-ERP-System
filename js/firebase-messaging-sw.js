importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "BHUncyG-C-pxfzu8TDBoqyCAPHduwJLQutbrwexmhg-CCeBi5Kww-aZwepBOmWJES1IRmiWaSjv6LwiJLhBb56Y",
  authDomain: "showy-hrms.firebaseapp.com",
  projectId: "showy-hrms",
  storageBucket: "showy-hrms.firebasestorage.app",
  messagingSenderId: "749206666404",
  appId: "1:749206666404:web:e0adba555f79f7cb357a31"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {

  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body,
      icon: "assets/logo.png"
    }
  );

});