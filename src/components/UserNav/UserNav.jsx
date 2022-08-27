import React, { useEffect, useState } from "react";
import { User } from "../";
import { AiOutlineSearch } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firbase";

const UserNav = () => {
	const { id } = useParams();
	const [user, setUser] = useState({});
	useEffect(() => {
		const unSubscribe = onSnapshot(doc(db, `users/${id}`), (user) => {
			setUser({ ...user.data() });
		});
		return () => unSubscribe();
	}, [id]);
	return (
		<header className="bg-main p-4 flex justify-between items-center">
			<User displayName={user.displayName} photoURL={user.photoURL} size={48} />
			<div className="flex gap-4">
				<div className="cursor-pointer">
					<AiOutlineSearch size={26} />
				</div>
				<div className="cursor-pointer">
					<BsThreeDotsVertical size={26} />
				</div>
			</div>
		</header>
	);
};

export default UserNav;
