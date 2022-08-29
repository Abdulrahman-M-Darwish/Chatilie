import React, { useEffect, useRef, useState } from "react";
import { UserNav, SendMessage, Message } from "../";
import { useParams } from "react-router-dom";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firbase";
import { useAuthContext } from "../../context/AuthContext";

const ChatRoom = () => {
	const { id: user2 } = useParams();
	const [messages, setMessages] = useState([]);
	const { user } = useAuthContext();
	const id = user.uid > user2 ? user.uid + user2 : user2 + user.uid;
	const scroller = useRef(0);
	const handelScroll = (e) => {
		console.log(e.target.scrollTop, e.target.lastElementChild.scrollTop);
	};
	useEffect(() => {
		const unSubscribe = onSnapshot(
			query(collection(db, `messages/${id}/chat`), orderBy("createdAt")),
			(snapshot) => {
				setMessages(
					snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
				);
			}
		);
		scroller.current.scrollIntoView({ behavior: "smooth" });
		return () => unSubscribe();
	}, [user2]);
	return (
		<div className="flex-1 flex flex-col">
			<UserNav />
			<div className="relative flex-1">
				<ul
					onScroll={handelScroll}
					className="flex flex-col absolute left-0 top-0 w-full h-full px-8 pt-4 overflow-auto gap-4"
				>
					{messages.map((message) => (
						<Message key={message.id} {...message} />
					))}
					<span ref={scroller}></span>
				</ul>
			</div>
			<SendMessage scroller={scroller} />
		</div>
	);
};

export default ChatRoom;
