import React from "react";

const User = ({ displayName, photoURL, size = 32 }) => {
	return (
		<div className="flex items-center gap-2">
			<img
				className="rounded-full"
				style={{ width: size + "px", height: size + "px" }}
				src={photoURL}
				alt="user_Avatar"
			/>
			<p>{displayName}</p>
		</div>
	);
};

export default User;
