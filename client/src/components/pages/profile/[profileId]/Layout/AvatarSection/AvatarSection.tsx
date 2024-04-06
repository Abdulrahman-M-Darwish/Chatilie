'use client';
import { useAppDispatch, useAppSelector } from '@/store';
import React from 'react';
import { GET_USER } from '../operations';
import { useGetUser } from '@/hooks';
import { setProfile } from '@/store/features';
import Image from 'next/image';
import { LiaCalendarSolid, LiaUserFriendsSolid } from 'react-icons/lia';
import { PiMaskSadBold } from 'react-icons/pi';
import { IoMdFemale, IoMdMale } from 'react-icons/io';
import { ProfileEditor } from '@/components';
import Link from 'next/link';
import { profileLinks } from '@/constants';

type Props = {
  userName: string;
};

export const AvatarSection: React.FC<Props> = ({ userName }) => {
  const dispatch = useAppDispatch();
  const { user, isMe } = useGetUser(GET_USER, {
    idOrName: userName,
    personFunction(user) {
      dispatch(setProfile({ user }));
    },
  });
  const profile = useAppSelector((state) =>
    isMe ? state.user.profile : state.profile.profile,
  );
  return (
    <>
      <div className="User pl-16 -translate-y-1/4 flex gap-4 items-center relative">
        <div className="avatar">
          <div className="w-[150px] h-w-[150px] ring-8 ring-base-100 rounded-full shadow-lg shadow-base-300 bg-base-100 relative z-50">
            <Image
              width={150}
              height={150}
              src={user?.avatar || ''}
              alt="avatar"
              className="object-contain"
            />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{user?.username}</h1>
          <h2 className="text-lg opacity-70 font-semibold tracking-tighter -mt-1">
            @{user?.name}
          </h2>
          <div className="flex gap-2 absolute">
            <div className="px-4 py-2 bg-primary-content text-primary flex gap-2 items-center rounded-md shadow font-bold">
              <LiaCalendarSolid className="text-2xl" />{' '}
              {new Date(user?.birthDate || '').getFullYear()}
            </div>
            <div className="px-4 py-2 bg-success-content text-success flex gap-2 items-center rounded-md shadow font-bold">
              {user?.friendsCount ? (
                <>
                  <LiaUserFriendsSolid className="text-2xl" />{' '}
                  {user?.friendsCount}
                </>
              ) : (
                <PiMaskSadBold className="text-2xl" />
              )}
            </div>
            <div className="px-4 py-2 bg-warning-content text-warning flex gap-2 items-center rounded-md shadow font-bold">
              {profile?.gender === 'MALE' ? (
                <IoMdMale className="text-2xl" />
              ) : (
                <IoMdFemale className="text-2xl" />
              )}
            </div>
          </div>
        </div>
        {isMe && <ProfileEditor />}
      </div>
      <div className="Tabs join w-full mt-4">
        {user &&
          profileLinks.map((link) => (
            <Link
              key={link.path}
              href={`/profile/@${user.name}/${link.path}`}
              className="btn btn-outline odd:btn-primary even:btn-accent join-item flex-1 capitalize"
            >
              {link.name}
            </Link>
          ))}
      </div>
    </>
  );
};
