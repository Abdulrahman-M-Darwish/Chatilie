'use client';
import { useGetProfile } from '@/hooks';
import Image from 'next/image';
import React from 'react';
import { GET_PROFILE } from '../operations';
import { useAppDispatch } from '@/store';
import { setProfile, setUserProfile } from '@/store/features';

type Props = {
  userName: string;
};

export const CoverSection: React.FC<Props> = ({ userName }) => {
  const dispatch = useAppDispatch();
  const { profile } = useGetProfile(GET_PROFILE, {
    idOrName: userName,
    personFunction(profile) {
      dispatch(setProfile({ profile }));
    },
    meFunction(profile) {
      dispatch(setUserProfile(profile));
    },
  });
  return (
    <div className="w-full rounded-bl-[3rem] overflow-hidden">
      {profile?.cover ? (
        <Image
          src={profile.cover}
          alt="ok"
          width={1920}
          height={1080}
          className="aspect-[16/6]"
        />
      ) : (
        <div className="bg-neutral aspect-[16/6] text-2xl flex items-center justify-center font-semibold">
          Empty Just Like You
        </div>
      )}
    </div>
  );
};
