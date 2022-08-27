import React from "react";
import { useAuthContext } from "../../context/AuthContext";

const Message = ({ from, photoURL, text }) => {
	const { user } = useAuthContext();
	return (
		<li
			className={`flex gap-4 w-1/2 ${
				from === user.uid ? "self-start" : "self-end flex-row-reverse"
			}`}
		>
			<img src={photoURL} alt="broken photo" className="rounded-full w-8 h-8" />
			<span
				className={
					from === user.uid
						? "bg-green-400 text-slate-700 px-4 py-1 rounded-r-lg rounded-bl-lg"
						: "bg-blue-500 text-gray-100 px-4 py-1 rounded-l-lg rounded-br-lg"
				}
			>
				{text}
			</span>
		</li>
	);
};

export default Message;
