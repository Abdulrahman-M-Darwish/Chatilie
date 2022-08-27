import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../firbase";
import { useAuthContext } from "../../context/AuthContext";

const Protected = ({ children }) => {
	const { user } = useAuthContext();
	return user ? children : <Navigate to="/registration" />;
};

export default Protected;
