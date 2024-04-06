import { useAppDispatch, useAppSelector } from '@/store';
import { openImage } from '@/store/features';
import React, { useRef } from 'react';
import { ImUpload } from 'react-icons/im';
import { Profile } from '@/types';
import Image from 'next/image';
import { useBase64 } from '@/hooks';

export const Cover: React.FC = () => {
  const preview = useAppSelector((state) => state.image.cover);
  const profile = useAppSelector((state) => state.user.profile) as Profile;
  const dispatch = useAppDispatch();
  const buttonRef = useRef<HTMLButtonElement>(null);
  useBase64(buttonRef.current, (image) =>
    dispatch(openImage({ image, type: 'cover' })),
  );
  return (
    <button
      ref={buttonRef}
      className="cursor-pointer shadow-2xl btn btn-ghost rounded-none w-full block h-auto p-0 relative"
    >
      {preview || profile?.cover ? (
        <Image
          alt="cover"
          width={1920}
          height={1080}
          src={preview || profile?.cover || ''}
          className="aspect-[16/6] pointer-events-none"
        />
      ) : (
        <div className="bg-base-100 aspect-[16/6] flex items-center justify-center text-xl font-semibold gap-2 text-base-content/50">
          Upload A Cover
          <ImUpload className="text-2xl text-secondary" />
        </div>
      )}
    </button>
  );
};
