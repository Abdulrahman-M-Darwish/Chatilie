import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const app = initializeApp({
	apiKey: "AIzaSyDfqgzIKV52Bg1aXIzNvoXmMzlT7c9AJF4",
	authDomain: "chati-def86.firebaseapp.com",
	projectId: "chati-def86",
	storageBucket: "chati-def86.appspot.com",
	messagingSenderId: "610731116804",
	appId: "1:610731116804:web:d3bba87cc79c5404cfa851",
});

export const db = getFirestore(app);
export const auth = getAuth(app);
