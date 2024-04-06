'use client';
import React from 'react';
import { ChatBubble } from 'react-daisyui';
import Image from 'next/image';
import { Time } from '@/components';
import { Message as IMessage } from '@/types';
import { useAppSelector } from '@/store';

export const Message: React.FC<IMessage> = ({ author, createdAt, text }) => {
  const userId = useAppSelector((state) => state.user.user?.id);
  return (
    <ChatBubble
      end={author.id === userId}
      className={author.id === userId ? 'mr-4' : 'ml-4'}
    >
      <ChatBubble.Avatar className="bg-base-300/50 backdrop-blur-3xl p-1 rounded-full">
        <Image
          width={50}
          height={50}
          src={author.avatar}
          alt="Avatar"
          className="!w-10"
        />
      </ChatBubble.Avatar>
      <ChatBubble.Message
        className={`max-w-[55%] min-w-24 backdrop-blur-3xl break-words rounded-2xl flex flex-col ${
          author.id === userId
            ? 'bg-base-content/80 text-base-300'
            : 'bg-base-100/50 text-base-content'
        }`}
      >
        <pre className="whitespace-pre-wrap w-full">
          <bdi>{text}</bdi>
        </pre>
        <Time createdAt={+createdAt || createdAt} />
      </ChatBubble.Message>
    </ChatBubble>
  );
};
