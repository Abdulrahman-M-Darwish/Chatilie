import {
	collection,
	doc,
	getDoc,
	onSnapshot,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { User, LastMessage } from "../";
import { db } from "../../firbase";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const ChannelListPreview = () => {
	const { "*": id } = useParams();
	const [users, setUsers] = useState([]);
	const { user: currentUser } = useAuthContext();
	const handelClick = async (id) => {
		const docRef = doc(db, "lastMessage", id);
		const lastMessage = await getDoc(docRef);
		if (
			lastMessage.data() &&
			lastMessage.data().unRead &&
			lastMessage.data().from !== currentUser.uid
		) {
			updateDoc(docRef, { unRead: false });
			console.log("ok");
		}
	};
	useEffect(() => {
		const unSubscribe = onSnapshot(
			query(collection(db, "users"), where("uid", "!=", currentUser.uid)),
			(snapshot) => {
				setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
			}
		);
		return () => unSubscribe();
	}, [id]);
	return (
		<div className="flex flex-col overflow-y-auto users divide-y divide-gray-300">
			{users?.map((user) => {
				const id =
					currentUser.uid > user.id
						? currentUser.uid + user.id
						: user.id + currentUser.uid;
				return (
					<Link key={user.id} to={user.id}>
						<div className="p-4" onClick={() => handelClick(id)}>
							<User
								size={44}
								displayName={user.displayName}
								photoURL={user.photoURL}
							/>
							<LastMessage id={id} />
						</div>
					</Link>
				);
			})}
		</div>
	);
};

export default ChannelListPreview;
