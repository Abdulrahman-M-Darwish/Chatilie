'use client';
import { Gender, User } from '@/types';
import { useQuery } from '@apollo/client';
import Image from 'next/image';
import { GET_FRIENDS } from '../operations';
import { Button } from 'react-daisyui';
import Link from 'next/link';
import { useAppSelector } from '@/store';

type Props = {
  userName: string;
};

export const FriendsSection: React.FC<Props> = ({ userName }) => {
  const currentUserName = useAppSelector((state) => state.user.user?.name);
  const isMe = userName == currentUserName;
  const profile = useAppSelector((state) =>
    isMe ? state.user.profile : state.profile.profile,
  );
  const userId = useAppSelector((state) =>
    isMe ? state.user.user?.id : state.profile.user?.id,
  );
  const { data } = useQuery(GET_FRIENDS, { variables: { userId } });
  const prone = profile?.gender === Gender.MALE ? 'He' : 'She';
  return (
    <div className="bg-base-200 p-4 rounded-box">
      <h2
        className={`text-2xl font-bold mb-4 ${
          data?.chats?.length == 0
            ? 'text-error'
            : data?.chats?.length == 1 && data?.chats[0].name == currentUserName
              ? 'text-success'
              : ''
        }`}
      >
        Friends {'>_<'}
      </h2>
      {data?.chats?.length == 0 && (
        <p className="text-center">
          {isMe ? (
            <>
              You Got No Friends! Are you A{' '}
              <span className="text-error font-semibold underline">
                Serial Killer?
              </span>
            </>
          ) : (
            <>
              {prone} Got No Friends! Maybe {prone} Is A{' '}
              <span className="text-error font-semibold underline">
                Serial Killer?
              </span>
            </>
          )}
        </p>
      )}
      {data?.chats?.length == 1 && data?.chats[0].name === currentUserName && (
        <p>
          {prone} Got No Friend Except You Maybe{' '}
          <span className="text-success font-bold">You</span> Are Something{' '}
          <span className="text-success font-bold">Important</span> To{' '}
          {profile?.gender === Gender.MALE ? 'Him' : 'Her'}
        </p>
      )}
      <div className="grid grid-cols-3 gap-2">
        {data?.chats?.map(
          (friend: User) =>
            friend.name !== currentUserName && (
              <Link key={friend.avatar} href={`/profile/@${friend.name}`}>
                <Button className="h-auto rounded-box p-1 pb-0 bg-base-100 w-auto">
                  <Image
                    key={friend.id}
                    width={150}
                    height={150}
                    src={friend.avatar}
                    alt={friend.name}
                  />
                </Button>
              </Link>
            ),
        )}
      </div>
    </div>
  );
};
