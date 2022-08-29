import React, { useState } from "react";
import { Navbar } from "../../components";
import { useAuthContext } from "../../context/AuthContext";

const Home = () => {
	const { user } = useAuthContext();
	return (
		<div className="flex flex-col">
			{user && <Navbar />}
			<div className="px-8 ml-[200px]">
				<h2 className="text-3xl">comming soon</h2>
				<div></div>
			</div>
		</div>
	);
};

export default Home;
