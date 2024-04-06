'use client';
import { useAppSelector } from '@/store';
import React from 'react';

type Props = {
  userName: string;
};

export const IntroSection: React.FC<Props> = ({ userName }) => {
  const profile = useAppSelector((state) =>
    state.user.user?.name == userName
      ? state.user.profile
      : state.profile.profile,
  );
  if (!profile) return;
  return (
    <div className="bg-base-300 py-4 rounded-box divide-y-2">
      <div className="px-4">
        <h2 className="text-2xl font-bold mb-2">Intro -_-</h2>
        <pre className="Caption whitespace-pre-wrap py-2 px-2 break-words">
          {profile.bio || (
            <span className="font-bold text-error">NO INTRO {'>_<'}</span>
          )}
        </pre>
      </div>
      <div className="px-4">
        <h2 className="text-2xl font-bold my-2">Hobbies {':">'}</h2>
        <ul className="flex flex-wrap gap-2">
          {profile.hobbies?.map((hobby: string, i: number) => (
            <li
              key={i}
              className="btn btn-sm rounded-full capitalize even:bg-warning-content even:text-warning odd:bg-primary-content odd:text-primary"
            >
              {hobby}
            </li>
          ))}
        </ul>
        {profile.hobbies?.length == 0 && (
          <pre className="font-bold text-error px-2">NO HOBBIES {'>_<'}</pre>
        )}
      </div>
    </div>
  );
};
