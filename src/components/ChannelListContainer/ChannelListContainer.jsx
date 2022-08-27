import React from "react";
import { ChannelListPreview } from "../";
import { useAuthContext } from "../../context/AuthContext";

const ChannelListContainer = ({ dir = "right" }) => {
	const { user } = useAuthContext();
	return (
		<div
			style={{ [dir]: 0 }}
			className="flex h-screen flex-col w-[30%] shadow-lg"
		>
			<div className="p-4 border-r border-gray-300 bg-main">
				<img
					src={user?.photoURL}
					alt={user?.displayName}
					className="rounded-full w-12 h-12"
				/>
			</div>
			<ChannelListPreview />
		</div>
	);
};

export default ChannelListContainer;
