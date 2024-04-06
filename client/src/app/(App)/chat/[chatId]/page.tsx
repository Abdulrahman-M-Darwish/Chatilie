'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { GiCrossedSwords } from 'react-icons/gi';
import { useQuery, useSubscription } from '@apollo/client';
import { ChatBoxInput } from '@/components';
import { GET_MESSAGES, ON_MESSAGE_CREATED } from '../operations';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { User } from '@/types';
import { updateCache } from '@/utils';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store';
import { Message } from '@/components';
import { addMessages, setMessages } from '@/store/features';

const ChatBox: React.FC<{ params: { chatId: string } }> = ({
  params: { chatId },
}) => {
  const user = useAppSelector((state) => state.chat.user) as User;
  const messages = useAppSelector((state) => state.message);
  const dispatch = useAppDispatch();
  const virtuoso = useRef<VirtuosoHandle>(null);
  useQuery(GET_MESSAGES, {
    variables: { chatId },
    onCompleted(data) {
      dispatch(setMessages(data.messages));
    },
  });
  useSubscription(ON_MESSAGE_CREATED, {
    onData: ({ data: { data } }) => {
      dispatch(addMessages(data.messageCreated));
      updateCache({
        query: GET_MESSAGES,
        variables: { chatId },
        data: (queryData) => ({
          ...queryData.follower,
          messages: [...queryData.messages, data.messageCreated],
        }),
      });
    },
  });
  useEffect(() => {
    const time = setTimeout(() =>
      virtuoso.current?.scrollToIndex(999999999999),
    );
    return () => clearTimeout(time);
  }, [messages, user]);
  return (
    <div
      className="flex flex-1 flex-col m-4 gap-1 bg-base-300/5 backdrop-blur-3xl rounded-box"
      style={{ height: 'calc(100vh - 32px)' }}
    >
      <div className="nav flex items-center justify-between p-4 bg-base-300/50 backdrop-blur-3xl rounded-box">
        <div className="Controls space-x-4">
          <Link
            href="/messages"
            className="text-2xl btn btn-circle btn-outline btn-primary hover:text-primary hover:border-primary hover:border-2 hover:bg-primary-content hover:ring hover:ring-primary hover:ring-offset-8 hover:ring-offset-primary-content hover:animate-spin duration-700"
          >
            <GiCrossedSwords />
          </Link>
        </div>
        <h2 className="text-xl bg-base-content text-base-100 p-2 rounded-lg">
          {user.name}
        </h2>
        <div className="flex gap-4 items-center">
          <bdi>{user.username}</bdi>
          <Image
            width={50}
            height={50}
            src={user.avatar}
            alt="Avatar"
            className="rounded-full bg-base-300 ring ring-primary ring-offset-4 ring-offset-base-300"
          />
        </div>
      </div>
      <div className="flex-1 relative bg-base-300/50 backdrop-blur-3xl rounded-box">
        <Virtuoso
          data={messages}
          ref={virtuoso}
          itemContent={(i, message) => <Message {...message} />}
        />
      </div>
      <ChatBoxInput chatId={chatId} />
    </div>
  );
};

export default ChatBox;
