import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyDGAWbw1AR5DSk3njcqN3SKer1AtCGLTQs',
    authDomain: 'image-cloud-98533.firebaseapp.com',
    databaseURL:
        'https://image-cloud-98533-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'image-cloud-98533',
    storageBucket: 'image-cloud-98533.appspot.com',
    messagingSenderId: '734291274417',
    appId: '1:734291274417:web:53228b40f3bbaed133d090',
    measurementId: 'G-HQZGPKQGBL',
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
