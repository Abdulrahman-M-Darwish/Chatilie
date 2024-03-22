import { AiOutlineHome, AiOutlineBell } from "react-icons/ai";
import { BsBookmarkStar } from "react-icons/bs";
import { BiCog } from "react-icons/bi";
import { TbWall } from "react-icons/tb";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FaUserInjured, FaGlassWhiskey } from "react-icons/fa";
import { MdExplore, MdOutlineExplore } from "react-icons/md";
import { LiaInternetExplorer } from "react-icons/lia";

export const links = (userName: string) => [
	{
		name: "Home",
		path: "/",
		isMinimal: false,
		icon: AiOutlineHome,
		skip: false,
	},
	{
		name: "Notifications",
		path: "/notifications",
		isMinimal: false,
		icon: AiOutlineBell,
		skip: false,
	},
	{
		name: "Chat",
		path: "/chat",
		isMinimal: true,
		icon: IoChatbubblesOutline,
		skip: false,
	},
	{
		name: "Explore",
		path: "/what-the-search",
		isMinimal: false,
		icon: LiaInternetExplorer,
		skip: false,
	},
	{
		name: "Bookmarks",
		path: "/bookmarks",
		isMinimal: false,
		icon: BsBookmarkStar,
		skip: false,
	},
	{
		name: "Wall Of Fame",
		path: "/wall-of-fame",
		isMinimal: false,
		icon: TbWall,
		skip: false,
	},
	{
		name: "Settings",
		path: "/settings",
		icon: BiCog,
		skip: false,
	},
	{
		name: "Profile",
		path: "/profile/@" + userName,
		isMinimal: true,
		icon: FaUserInjured,
		skip: false,
	},
];
