import { AiOutlineHome, AiOutlineBell } from 'react-icons/ai';
import { BsBookmarkStar } from 'react-icons/bs';
import { BiCog } from 'react-icons/bi';
import { TbWall } from 'react-icons/tb';
import { IoChatbubblesOutline } from 'react-icons/io5';
import { FaUserInjured } from 'react-icons/fa';

export const links = (userName: string, count: number) => [
  {
    name: 'Home',
    path: '/',
    isMinimal: false,
    icon: AiOutlineHome,
    skip: false,
  },
  {
    name: 'Notifications',
    path: '/notifications',
    isMinimal: false,
    icon: AiOutlineBell,
    skip: false,
    flag: count,
  },
  {
    name: 'Chat',
    path: '/chat',
    isMinimal: true,
    icon: IoChatbubblesOutline,
    skip: false,
  },
  {
    path: '/what-the-search',
    isMinimal: false,
    skip: true,
  },
  {
    name: 'Bookmarks',
    path: '/bookmarks',
    isMinimal: false,
    icon: BsBookmarkStar,
    skip: false,
  },
  {
    name: 'Wall Of Fame',
    path: '/wall-of-fame',
    isMinimal: false,
    icon: TbWall,
    skip: false,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: BiCog,
    skip: false,
  },
  {
    name: 'Profile',
    path: '/profile/@' + userName,
    isMinimal: true,
    icon: FaUserInjured,
    skip: false,
  },
];
