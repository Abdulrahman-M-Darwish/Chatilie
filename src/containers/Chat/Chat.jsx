import React from "react";
import { ChannelListContainer, ChatRoom } from "../../components";
import { Routes, Route } from "react-router-dom";

const Chat = () => {
	return (
		<div className="flex flex-col">
			<div className="flex">
				<ChannelListContainer dir="left" />
				<Routes>
					<Route path=":id" element={<ChatRoom />} />
				</Routes>
			</div>
		</div>
	);
};

export default Chat;
