'use client';
import React from 'react';
import { GiCrossedSwords } from 'react-icons/gi';
import { IoEarthOutline } from 'react-icons/io5';
import { MdOutlineLockOpen } from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa';
import { Privacy } from '@/types';
import moment from 'moment';
import { Button } from 'react-daisyui';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { PostDropdown } from './PostDropdown';

type Props = {
  username: string;
  name: string;
  privacy: Privacy;
  createdAt: string;
  postId?: string;
  authorId?: string;
  noButtons?: boolean;
};

export const PostHead: React.FC<Props> = ({
  createdAt,
  name,
  privacy,
  authorId,
  postId,
  username,
  noButtons,
}) => {
  return (
    <div className="Header flex justify-between mx-4">
      <div className="flex gap-2 items-center">
        <h2>{username}</h2>
        <h3 className="text-xs text-base-content/50 tracking-tighter flex items-center overflow-clip">
          @{name}
          <span className="w-1 h-1 inline-block mx-1 rounded-full bg-base-content/50" />
          {privacy == Privacy.PUBLIC ? (
            <IoEarthOutline />
          ) : privacy == Privacy.ONLY_FRIENDS ? (
            <FaUserFriends />
          ) : (
            <MdOutlineLockOpen />
          )}
          <span className="w-1 h-1 inline-block mx-1 rounded-full bg-base-content/50" />
          {moment(new Date(+createdAt || createdAt)).fromNow(true)}
        </h3>
      </div>
      {!noButtons && (
        <div className="space-x-4">
          <button className="text-2xl btn btn-circle btn-outline btn-primary hover:text-primary hover:border-primary hover:border-2 hover:bg-primary-content hover:ring hover:ring-primary hover:ring-offset-8 hover:ring-offset-primary-content hover:animate-spin duration-700">
            <GiCrossedSwords />
          </button>
          {authorId && postId ? (
            <PostDropdown
              authorId={authorId}
              id={postId}
              name={name}
              privacy={privacy}
            />
          ) : (
            <Button className="text-2xl btn btn-circle btn-outline btn-primary hover:text-primary hover:border-primary hover:border-2 hover:bg-primary-content hover:ring hover:ring-primary hover:ring-offset-8 hover:ring-offset-primary-content hover:animate-spin duration-700">
              <BsThreeDotsVertical />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
