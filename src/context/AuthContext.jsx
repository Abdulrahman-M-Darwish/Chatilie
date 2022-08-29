import { createContext, useContext, useEffect, useState } from "react";
import {
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from "firebase/auth";
import { auth, db } from "../firbase";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	useEffect(() => {
		const unSubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
		});
		console.log(user);
		return () => {
			unSubscribe();
		};
	}, [user]);
	const signup = async ({
		userName,
		uniqeName,
		email,
		photoURL,
		password,
		confirmPassword,
	}) => {
		if (password !== confirmPassword) {
			return;
		}
		const result = await createUserWithEmailAndPassword(auth, email, password);
		await updateProfile(auth.currentUser, {
			displayName: userName,
			photoURL:
				photoURL ||
				"https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png",
		});
		await setDoc(doc(db, "users", result.user.uid), {
			displayName: userName,
			photoURL:
				photoURL ||
				"https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png",
			uniqeName,
			isOnline: true,
			uid: result.user.uid,
			createdAt: serverTimestamp(),
		});
	};
	const signin = async (email, password) => {
		const result = await signInWithEmailAndPassword(auth, email, password);
		updateDoc(doc(db, "users", result.user.uid), { isOnline: true });
	};
	const logout = async () => {
		await updateDoc(doc(db, "users", user.uid), { isOnline: false });
		await signOut(auth);
	};
	return (
		<AuthContext.Provider value={{ user, signup, logout, signin }}>
			{children}
		</AuthContext.Provider>
	);
};
