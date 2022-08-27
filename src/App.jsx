import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Protected } from "./components";
import { Chat, Registration, Home } from "./containers";
import { useAuthContext } from "./context/AuthContext";

const App = () => {
	const { user, logout } = useAuthContext();
	useEffect(() => {
		if (!("Notification" in window)) {
			alert("This browser does not support desktop notification");
		} else if (
			Notification.permission !== "denied" &&
			Notification.permission !== "granted"
		) {
			Notification.requestPermission().then((permission) => {
				if (permission === "granted") {
					const notification = new Notification("Welcome to chat clone!");
				}
			});
		}
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
