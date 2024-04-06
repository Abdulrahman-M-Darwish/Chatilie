'use client';
import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { SEARCH, SEND_NOTIFICATIONS } from './operations';
import { Avatar, Post } from '@/components';
import { Post as IPost, NotificationType, User } from '@/types';
import { LiaUserFriendsSolid } from 'react-icons/lia';
import { useAppSelector } from '@/store';

type Props = {
  q: string;
};

export const Results: React.FC<Props> = ({ q }) => {
  const { data } = useQuery(SEARCH, { variables: { q } });
  const userId = useAppSelector((state) => state.user.user?.id);
  const [sendNotification] = useMutation(SEND_NOTIFICATIONS);
  const handleClick = (id: string) => {
    sendNotification({
      variables: {
        createNotificationInput: {
          from: userId,
          to: id,
          type: NotificationType.FRIEND_REQUEST,
        },
      },
    });
  };
  return (
    <div>
      <div className="mt-4 p-4 bg-base-300 rounded-box">
        <h2 className="text-3xl font-bold mb-2">People</h2>
        <div className="divide-y divide-base-content/50 rounded-box border border-base-content/50">
          {data?.search?.users?.map((user: User) => (
            <div
              key={user.id}
              className="first-of-type:rounded-t-box last-of-type:rounded-b-box p-4 hover:brightness-110 transition-all bg-base-300"
            >
              <div className="flex items-center gap-2">
                <Avatar
                  size={50}
                  alt={user.name}
                  src={user.avatar}
                  name={user.name}
                />
                <h2 className="flex flex-col">
                  <span className="text-xl tracking-wider">
                    {user.username}
                  </span>
                  <span className="text-lg text-base-content/50 -mt-1.5">
                    @{user.name}
                  </span>
                </h2>
                <div className="ml-auto">
                  <button
                    onClick={() => handleClick(user.id)}
                    className="btn uppercase btn-primary tracking-wide"
                  >
                    <LiaUserFriendsSolid className="text-xl" />
                    Add
                  </button>
                </div>
              </div>
              {user.profile.bio && (
                <p className="ml-14 mt-2 break-words">
                  {user.profile.bio?.slice(0, 100)}
                  {user.profile.bio?.slice(0, 100).length !==
                    user.profile.bio?.length && '...'}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 p-4 bg-base-300 rounded-box">
        <h2 className="text-3xl font-bold mb-2">Posts</h2>
        {data?.search?.posts?.map((post: IPost) => (
          <Post {...post} key={post.id} />
        ))}
      </div>
    </div>
  );
};
