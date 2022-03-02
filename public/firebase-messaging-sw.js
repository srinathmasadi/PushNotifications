
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-database.js")


const firebaseConfig = {
    apiKey: "AIzaSyCTeVnyw5HqndI4xr0R0A72uo864XaHazs",
    authDomain: "venturepact-856ee.firebaseapp.com",
    projectId: "venturepact-856ee",
    storageBucket: "venturepact-856ee.appspot.com",
    messagingSenderId: "208625655386",
    appId: "1:208625655386:web:0f9fc16bb73c3244998263",
    measurementId: "G-YX7P0LKB4C"
  };

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("Recieved Background Message", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/logo192.png'
    };
    this.registration.showNotification(
        notificationTitle,
        notificationOptions
    );
})


