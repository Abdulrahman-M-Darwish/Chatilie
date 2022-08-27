import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { FaCog } from "react-icons/fa";
import { IoIosMoon } from "react-icons/io";
import { AiOutlineRight } from "react-icons/ai";
import { GoSignOut } from "react-icons/go";

const Options = () => {
	const { user, logout } = useAuthContext();
	const [toggle, setToggle] = useState(
		JSON.parse(localStorage.getItem("theme"))
	);
	const active = toggle ? "after:ml-8 bg-slate-800 after:bg-emerald-500" : "";
	useEffect(() => localStorage.setItem("theme", `${toggle}`), [toggle]);
	return (
		<div className="absolute right-0 bottom-0 translate-y-full shadow-lg shadow-black/25 min-w-[300px] pt-4 z-50">
			<div>
				<div className="flex gap-4 border-b border-gray-300 pb-2 mx-4">
					<img
						className="w-12 h-12 rounded-full"
						src={user.photoURL}
						alt={`${user.displayName}_image`}
					/>
					<h2 className="flex flex-col">
						<span className="font-bold">{user.displayName}</span>
						<span className="text-gray-400 text-sm">See your profile</span>
					</h2>
				</div>
				<ul className="flex flex-col divide-y divide-gray-300">
					<li className="flex justify-between items-center gap-2 hover:bg-gray-900/5 px-4 py-4 cursor-pointer">
						<div className="w-12 h-12 flex justify-center items-center bg-slate-500 hover:bg-slate-700 transition-all rounded-full text-white hover:text-emerald-400 cursor-pointer">
							<FaCog size={24} />
						</div>
						<p className="mr-auto">Settings</p>
						<AiOutlineRight size={24} />
					</li>
					<li
						onClick={() => setToggle((p) => !p)}
						className="flex justify-between items-center gap-2 hover:bg-gray-900/5 px-4 py-4 cursor-pointer"
					>
						<div className="w-12 h-12 flex justify-center items-center bg-slate-500 hover:bg-slate-700 transition-all rounded-full text-white hover:text-emerald-400 cursor-pointer">
							<IoIosMoon size={24} />
						</div>
						<p className="mr-auto">Dark Mode</p>
						<div
							className={
								"h-8 w-16 bg-slate-500 rounded-full relative after:w-8 after:h-8 after:absolute after:bg-white after:rounded-full transition-all after:transition-all " +
								active
							}
						/>
					</li>
					<li
						onClick={logout}
						className="flex justify-between items-center gap-2 hover:bg-gray-900/5 px-4 py-4 cursor-pointer"
					>
						<div className="w-12 h-12 flex justify-center items-center bg-slate-500 hover:bg-slate-700 transition-all rounded-full text-white hover:text-emerald-400 cursor-pointer">
							<GoSignOut size={24} />
						</div>
						<p className="mr-auto">Log Out</p>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Options;
