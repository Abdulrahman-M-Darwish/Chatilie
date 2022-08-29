import React, { useEffect } from "react";
import { BsFillCameraFill } from "react-icons/bs";
import { MdOutlineAddCircle, MdModeEdit } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";

const Profile = () => {
	const navigate = useNavigate();
	useEffect(() => navigate("/profile/posts"), []);
	return (
		<div className="bg-slate-100 min-h-screen">
			<header className="bg-white shadow relative before:absolute before:left-0 before:top-0 before:h-1/2 before:w-full before:bg-gradient-to-b before:from-black/90">
				<div className="h-[90vh] container px-20 mx-auto flex flex-col">
					<div className="bg-gray-100 shadow h-[65%] rounded-b-xl overflow-hidden relative">
						<img
							src="https://scontent.fcai21-4.fna.fbcdn.net/v/t39.30808-6/299859838_109723761855739_5240421021765901218_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=e3f864&_nc_ohc=ATYGYIzmTJMAX_0NLUy&_nc_ht=scontent.fcai21-4.fna&oh=00_AT8YSmHu6pu_8RQ6-d_Ho_2XP3iUX29lRNxPnG_yZSxL6g&oe=63129A8B"
							alt=""
						/>
						<div className="py-4 px-8 absolute left-0 right-0 bottom-0 bg-gradient-to-t from-black/75 flex justify-end">
							<button className="bg-white py-[6px] px-4 text-sm font-bold rounded flex items-center gap-1">
								<BsFillCameraFill size={18} /> Add Cover Photo
							</button>
						</div>
					</div>
					<div className="-mt-8 mb-8 relative flex justify-between items-end">
						<div className="flex items-center gap-4">
							<div className="relative">
								<img
									className="w-40 h-40 rounded-full ring-4 ring-white"
									src="https://scontent.fcai21-3.fna.fbcdn.net/v/t39.30808-6/299832804_109723151855800_1793827277512332445_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=HDWWOHFI1KoAX_1KSUf&_nc_ht=scontent.fcai21-3.fna&oh=00_AT9JzyDAiDaJ2IAj93HySYt4v_IOkJNGfbA5Its1HZH_PQ&oe=631142E4"
									alt=""
								/>
								<button className="absolute right-0 bottom-2 bg-gray-200 p-2 rounded-full">
									<BsFillCameraFill size={20} />
								</button>
							</div>
							<p className="flex flex-col">
								<span className="text-3xl">WD_Abdulrahman</span>
								<span className="text-slate-500 font-bold">#Abdulrahman</span>
							</p>
						</div>
						<div className="flex gap-4">
							<button className="bg-blue-500 px-4 py-1 rounded-md font-semibold text-white flex gap-1 items-center">
								<MdOutlineAddCircle size={20} /> Add to Story
							</button>
							<button className="bg-slate-200 px-4 py-1 rounded-md font-semibold flex gap-1 items-center">
								<MdModeEdit size={20} /> Edit profile
							</button>
						</div>
					</div>
					<div className="mt-auto border-t border-gray-300">
						<ul className="flex gap-1">
							{["posts", "about", "friends", "photos"].map((item) => (
								<li key={item}>
									<NavLink
										className="p-4 block capitalize font-semibold hover:bg-gray-100 transition-all rounded-md"
										to={item}
									>
										{item}
									</NavLink>
								</li>
							))}
						</ul>
						<div></div>
					</div>
				</div>
			</header>
		</div>
	);
};

export default Profile;
