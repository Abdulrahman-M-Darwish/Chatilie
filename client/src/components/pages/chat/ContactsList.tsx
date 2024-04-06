'use client';
import { useQuery, useSubscription } from '@apollo/client';
import { useAppDispatch, useAppSelector } from '@/store';
import { User } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { setMessages, updateChat } from '@/store/features';
import { EmptyContactsList } from './EmptyContactsList';
import { GET_CHATS, ON_USER_UPDATE } from './operations';
import { useState } from 'react';

export const ContactsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const [chats, setChats] = useState<User[]>([]);
  const user = useAppSelector((state) => state.user.user) as User;
  useQuery(GET_CHATS, {
    onCompleted(data) {
      setChats(data.chats);
    },
  });
  const chatUser = useAppSelector((state) => state.chat.user);
  useSubscription(ON_USER_UPDATE, {
    onData({
      data: {
        data: { userUpdated },
      },
    }) {
      if (userUpdated.id == user.id) return;
      setChats((chats) =>
        chats.map((chat) =>
          chat.id == userUpdated.id
            ? { ...chat, isActive: userUpdated.isActive }
            : chat,
        ),
      );
    },
  });
  const selectUser = async (chat: User) => {
    if (chat.id === chatUser?.id) return;
    dispatch(updateChat({ user: chat }));
    dispatch(setMessages([]));
  };
  return chats.length > 0 ? (
    <ul
      className="bg-base-200/50 shadow rounded-3xl max-w-[250px] my-4 ml-4 w-full flex-shrink-0 backdrop-blur-3xl space-y-1 overflow-hidden"
      style={{ height: 'calc(100vh - 32px)' }}
    >
      {chats.map((user: User, i: number) => (
        <li key={user.id + i} onClick={() => selectUser(user)}>
          <Link
            href={`/chat/${user.chatId}`}
            className="btn btn-ghost rounded-lg w-full flex items-center justify-between h-auto py-3 normal-case"
          >
            <Image
              width={60}
              height={60}
              src={user.avatar}
              alt="Avatar"
              className={`rounded-full ring ring-offset-neutral/50 p-0.5 ring-offset-2 bg-neutral/50 backdrop-blur-3xl ${
                user.isActive ? 'ring-success' : 'ring-error'
              }`}
            />
            <bdi>{user.username}</bdi>
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <EmptyContactsList />
  );
};
