import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmile, BsMicFill } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { useParams } from "react-router-dom";
import {
	addDoc,
	collection,
	doc,
	serverTimestamp,
	setDoc,
} from "firebase/firestore";
import { db } from "../../firbase";
import { useAuthContext } from "../../context/AuthContext";

const SendMessage = ({ scroller }) => {
	const { id: user2 } = useParams();
	const [text, setText] = useState("");
	const { user } = useAuthContext();
	const id = user.uid > user2 ? user.uid + user2 : user2 + user.uid;
	const handelSubmit = async (e) => {
		e.preventDefault();
		if (text.split(" ").join("").length <= 0) {
			return setText("");
		}
		await addDoc(collection(db, `messages/${id}/chat`), {
			text,
			photoURL: user.photoURL,
			from: user.uid,
			to: user2,
			createdAt: serverTimestamp(),
			unRead: true,
		});
		await setDoc(doc(db, "lastMessage", id), {
			text,
			from: user.uid,
			to: user2,
			createdAt: serverTimestamp(),
			unRead: true,
		});
		setText("");
		scroller.current.scrollIntoView({ behavior: "smooth" });
	};
	return (
		<div className="flex bg-main justify-center items-center p-4 gap-4">
			<div className="flex gap-4">
				<button className="text-slate-500">
					<BsEmojiSmile size={24} />
				</button>
				<button className="text-slate-500">
					<ImAttachment size={24} />
				</button>
			</div>
			<form className="flex-1 flex gap-4 items-center" onSubmit={handelSubmit}>
				<input
					type="text"
					className="flex-1 bg-white outline-none p-2 rounded-lg relative"
					placeholder="Write a message"
					contentEditable="true"
					onChange={(e) => setText(e.target.value)}
					value={text}
				/>
				<button className="text-slate-500">
					{text ? <IoMdSend size={24} /> : <BsMicFill size={24} />}
				</button>
			</form>
		</div>
	);
};

export default SendMessage;
