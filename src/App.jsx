import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Protected } from "./components";
import { getToken } from "firebase/messaging";
import { messaging } from "./firbase";
import { Chat, Registration, Home } from "./containers";
import { useAuthContext } from "./context/AuthContext";

const App = () => {
	const { user, logout } = useAuthContext();
	useEffect(() => {
		console.log("Requesting permission...");
		Notification.requestPermission().then((permission) => {
			if (permission === "granted") {
				getToken(messaging, { vapidKey: "<YOUR_PUBLIC_VAPID_KEY_HERE>" })
					.then((currentToken) => {
						if (currentToken) {
							console.log("ok");
						} else {
							console.log(
								"No registration token available. Request permission to generate one."
							);
						}
					})
					.catch((err) => {
						console.log("An error occurred while retrieving token. ", err);
					});
			}
		});
	}, []);
	return (
		<div className="min-h-screen flex flex-col bg-[#f8f8f8]">
			<Router>
				<Routes>
					<Route
						path="/chat/*"
						element={
							<Protected>
								<Chat />
							</Protected>
						}
					/>
					<Route
						path="/"
						element={
							<Protected>
								<Home />
							</Protected>
						}
					/>
					<Route path="/registration" element={<Registration />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
