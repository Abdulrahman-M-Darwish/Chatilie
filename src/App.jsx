import { getToken } from "firebase/messaging";
import React, { useEffect } from "react";
import { Routes, Route, Navigate, useHref } from "react-router-dom";
import { Chat, Registration, Home, Profile } from "./containers";
import { useAuthContext } from "./context/AuthContext";
import { messaging } from "./firbase";

const App = () => {
	const { user } = useAuthContext();
	return (
		<div className="min-h-screen flex flex-col bg-[#f8f8f8]">
			<Routes>
				<Route
					path="/chat/*"
					element={user ? <Chat /> : <Navigate to="/registration" />}
				/>
				<Route
					path="/"
					element={user ? <Home /> : <Navigate to="/registration" />}
				/>
				<Route
					path="profile/*"
					element={user ? <Profile /> : <Navigate to="/registration" />}
				/>
				<Route path="/registration" element={<Registration />} />
			</Routes>
		</div>
	);
};

export default App;
