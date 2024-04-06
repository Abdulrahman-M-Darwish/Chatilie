/* eslint-disable no-unused-vars */
'use client';
import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Form, Input } from 'react-daisyui';
import { RiSearchEyeLine } from 'react-icons/ri';
import { GET_USERS } from './operations';
import Image from 'next/image';
import { User } from '@/types';
import { GiIceCube } from 'react-icons/gi';

export const SideNav: React.FC = () => {
  const [coolPeople, setCoolPeople] = useState<User[]>([]);
  useQuery(GET_USERS, {
    onCompleted(query) {
      setCoolPeople((p) => [...p, ...query.users]);
    },
  });
  return (
    <div className="sticky h-screen top-0 p-8 space-y-4">
      <Form className="flex-row" action="what-the-search" method="get">
        <Input
          placeholder="Search People"
          className="border-r-0 rounded-r-none max-w-lg w-full"
          name="q"
        />
        <Button className="btn-outline rounded-l-none">
          <RiSearchEyeLine className="text-xl" />
        </Button>
      </Form>
      <div className="bg-base-300 p-4 rounded-box divide-y space-y-4">
        <h2 className="text-2xl">Hot Notifs</h2>
        <ul className="p-4 space-y-2 text-lg">
          <li>New Message</li>
          <li>Friend Request</li>
          <li>Post Liked</li>
        </ul>
      </div>
      <div className="bg-base-300 p-4 rounded-box divide-y space-y-4">
        <h2 className="text-2xl">Catchy People</h2>
        {/* <ul className="space-y-4 py-4">
          {coolPeople.slice(coolPeople.length - 3).map((user: User) => (
            <li
              key={user.id}
              className="flex flex-wrap items-center gap-2 pt-2 rounded-box bg-base-200"
            >
              <Image
                width={50}
                height={50}
                alt={user.name}
                src={user.avatar}
                className="rounded-full bg-neutral ring-neutral ring ml-2 mb-2"
              />
              <h3 className="flex flex-col">
                <span className="text-lg">{user.name}</span>
                <span className="text-base-content/50">{user.username}</span>
              </h3>
              <button className="btn btn-outline w-[100%]">
                <GiIceCube className="text-xl" />
                Cool
              </button>
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};
