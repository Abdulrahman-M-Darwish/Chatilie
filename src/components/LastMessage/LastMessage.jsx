import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { db } from "../../firbase";
import { IoMdImages } from "react-icons/io";

const LastMessage = ({ id }) => {
	const [lastMessage, setLastMessages] = useState("");
	const { user } = useAuthContext();
	useEffect(() => {
		onSnapshot(doc(db, "lastMessage", id), (snapshot) =>
			setLastMessages({ ...snapshot.data() })
		);
	}, []);
	return (
		<div className="flex justify-between items-center gap-2">
			<p className="truncate ml-[52px] flex">
				{lastMessage.from === user.uid && (
					<span className="font-bold mr-1">You:</span>
				)}
				{!lastMessage.containImages && (
					<span className="text-gray-500">{lastMessage.text}</span>
				)}
				{lastMessage.containImages && (
					<span className="flex items-center gap-1 text-gray-500">
						Image(s) <IoMdImages size={20} />
					</span>
				)}
			</p>
			{lastMessage.unRead && lastMessage.to === user.uid && (
				<span className="bg-blue-500 text-white py-1 px-4 font-bold rounded-full">
					New
				</span>
			)}
		</div>
	);
};

export default LastMessage;
