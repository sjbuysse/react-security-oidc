importScripts('https://www.gstatic.com/firebasejs/8.1.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.1.2/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyAh2uomua8n1hLapc-khRL4IewcyM2bRaE",
    authDomain: "ordina-push-notification.firebaseapp.com",
    databaseURL: "https://ordina-push-notification.firebaseio.com",
    projectId: "ordina-push-notification",
    storageBucket: "ordina-push-notification.appspot.com",
    messagingSenderId: "319381111953",
    appId: "1:319381111953:web:d698437c3e24aa5e5d6b30",
    measurementId: "G-31K5XCP8HS"
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(event) {
    console.log('[firebase-messaging-sw.js] Received background message ', event);
    const data = event.data;
    const notificationTitle = data.username;
    const notificationOptions = {
        body: data.message,
        icon: 'ordina.png',
        requireInteraction: false
    };

    self.onnotificationclick = function(event) {
        console.log('On notification click: ', event.notification.tag);
        event.notification.close();
    };
    return self.registration.showNotification(notificationTitle, notificationOptions);
});
