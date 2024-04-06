'use client';
import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { GET_NOTIFICATIONS, MAKE_FRIEND } from './operations';
import { Notification } from '@/types';
import Image from 'next/image';
import moment from 'moment';

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  useQuery(GET_NOTIFICATIONS, {
    onCompleted(data) {
      setNotifications(data.notifications);
    },
  });
  const [makeFriend] = useMutation(MAKE_FRIEND);
  const handleAccept = async (userId: string, notificationId: string) => {
    setNotifications((p) =>
      p.filter((notification) => notification.id !== notificationId),
    );
    await makeFriend({
      variables: {
        createFriendInput: {
          friendId: userId,
        },
      },
    });
  };
  const handleDecline = (userId: string, notificationId: string) => {
    setNotifications((p) =>
      p.filter(
        (notification: Notification) => notification.id !== notificationId,
      ),
    );
  };
  return (
    <div className="pt-8">
      <h2 className="text-4xl font-bold uppercase ml-2 mb-4">Notifications</h2>
      <div className="divide-y border border-base-content/50 divide-base-content/50 rounded-2xl overflow-hidden">
        {notifications.map((notification: Notification) => (
          <div
            key={notification.id}
            className="bg-base-300 flex gap-4	 items-center justify-between p-2 py-2 hover:brightness-90 transition-al	l"
          >
            <Image
              width={50}
              height={50}
              src={notification.from.avatar}
              alt={notification.from.name}
              className="rounded-full bg-neutral"
            />
            <p className="space-x-1 mr-auto">
              <span className="font-bold">{notification.from.name + ':'}</span>
              <span>{notification.message}</span>
              <time className="text-base-content/75">
                {moment(+notification.createdAt).fromNow()}
              </time>
            </p>
            <div className="flex mr-2">
              <button
                onClick={() =>
                  handleAccept(notification.from.id, notification.id)
                }
                className="btn rounded-l-full font-bold uppercase btn-primary"
              >
                Accept
              </button>
              <button
                onClick={() =>
                  handleDecline(notification.from.id, notification.id)
                }
                className="btn rounded-r-full font-bold uppercase bg-primary-content text-primary hover:bg-primary-content hover:brightness-90"
              >
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
