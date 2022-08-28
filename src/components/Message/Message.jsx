import React, { useEffect, useRef } from "react";
import { ImImages } from "react-icons/im";
import { useAuthContext } from "../../context/AuthContext";

const Message = ({ from, photoURL, text, images }) => {
	const { user } = useAuthContext();
	const me = from === user.uid;
	return (
		<li
			className={`flex gap-4 w-[55%] ${
				me ? "self-start" : "self-end flex-row-reverse"
			}`}
		>
			<img src={photoURL} alt="broken photo" className="rounded-full w-8 h-8" />
			<div
				className={`flex flex-col gap-4  ${me ? "items-start" : "items-end"}`}
			>
				{text && (
					<p
						style={{ wordBreak: "break-word" }}
						className={`${
							me
								? "bg-green-400 text-slate-700 px-4 py-1 rounded-r-lg rounded-bl-lg"
								: "bg-blue-500 text-gray-100 px-4 py-1 rounded-l-lg rounded-br-lg"
						}`}
					>
						{text}
					</p>
				)}
				<div className={`flex flex-wrap ${me ? "" : "justify-end"}`}>
					{images?.map((image, i, arr) => (
						<div
							className={`p-[1px] ${
								arr.length > 2
									? "max-w-[33.333333%]"
									: arr.length < 2
									? "w-auto"
									: "max-w-[50%]"
							}`}
							key={i}
						>
							<img src={image.dlUrl} className="h-full rounded-md" />
						</div>
					))}
				</div>
			</div>
		</li>
	);
};

export default Message;
