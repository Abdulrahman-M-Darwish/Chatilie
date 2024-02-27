import { AiOutlineHome, AiOutlineBell } from "react-icons/ai";
import { BsBookmarkStar } from "react-icons/bs";
import { BiCog } from "react-icons/bi";
import { TbWall } from "react-icons/tb";
import { IoChatbubblesOutline } from "react-icons/io5";

export const links = [
  {
    name: "Home",
    path: "/",
    icon: AiOutlineHome,
  },
  {
    name: "Notifications",
    path: "/notifications",
    icon: AiOutlineBell,
  },
  {
    name: "Chat",
    path: "/chat",
    icon: IoChatbubblesOutline,
  },
  {
    name: "Bookmarks",
    path: "/bookmarks",
    icon: BsBookmarkStar,
  },
  {
    name: "Wall Of Fame",
    path: "/wall-of-fame",
    icon: TbWall,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: BiCog,
  },
];
