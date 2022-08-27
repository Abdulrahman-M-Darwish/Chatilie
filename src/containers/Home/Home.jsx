import React from "react";
import { ChannelListContainer, Navbar } from "../../components";

const Home = () => {
	return (
		<div className="flex flex-col">
			<Navbar />
			<div className="px-8 ml-[200px]">
				<h2 className="text-3xl">home page</h2>
			</div>
		</div>
	);
};

export default Home;
