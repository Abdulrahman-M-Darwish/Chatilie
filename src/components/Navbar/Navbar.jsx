import { RiChatSmile3Fill } from "react-icons/ri";
import { IoMdChatbubbles } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { AiFillCaretDown } from "react-icons/ai";
import { BsBellFill, BsSearch } from "react-icons/bs";
import { Options, User } from "../";
import { useAuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	const [openOptions, setOpenOptions] = useState(false);
	const { user } = useAuthContext();
	return (
		<nav className="py-4 mx-14 flex justify-between items-center border-b border-gray-300 sticky top-0 z-50">
			<div>
				<h1 className="flex items-center gap-2 text-3xl">
					<div className="bg-teal-800 w-fit p-2 rounded-md">
						<RiChatSmile3Fill className="text-white" size={32} />
					</div>
					Chatilie
				</h1>
			</div>
			<ul className="flex gap-4">
				<li>
					<Link to="/chat">
						<div className="bg-slate-500 p-3 rounded-full cursor-pointer hover:bg-slate-700 hover:text-emerald-400 transition-all">
							<IoMdChatbubbles size={24} />
						</div>
					</Link>
				</li>
				<li>
					<Link to="/chat">
						<div className="bg-slate-500 p-3 rounded-full cursor-pointer hover:bg-slate-700 hover:text-emerald-400 transition-all">
							<FaUserFriends size={24} />
						</div>
					</Link>
				</li>
				<li>
					<Link to="/chat">
						<div className="bg-slate-500 p-3 rounded-full cursor-pointer hover:bg-slate-700 hover:text-emerald-400 transition-all">
							<CgProfile size={24} />
						</div>
					</Link>
				</li>
			</ul>
			<div className="flex gap-3">
				{user && (
					<User displayName={user.displayName} photoURL={user.photoURL} />
				)}
				<div className="flex gap-2 items-center">
					<div className="p-3 bg-slate-500 hover:bg-slate-700 transition-all rounded-full text-white hover:text-emerald-400 cursor-pointer">
						<BsSearch />
					</div>
					<div className="p-3 bg-slate-500 hover:bg-slate-700 transition-all rounded-full text-white hover:text-emerald-400 cursor-pointer">
						<BsBellFill />
					</div>
					<div
						onClick={() => setOpenOptions((p) => !p)}
						className={
							"p-3 bg-slate-500 hover:bg-slate-700 transition-all rounded-full text-white hover:text-emerald-400 cursor-pointer " +
							(openOptions ? "rotate-180 text-emerald-400 bg-slate-700" : "")
						}
					>
						<AiFillCaretDown />
					</div>
				</div>
			</div>
			{openOptions && <Options />}
		</nav>
	);
};

export default Navbar;
