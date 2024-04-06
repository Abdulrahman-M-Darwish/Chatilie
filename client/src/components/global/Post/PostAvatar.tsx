import Image from 'next/image';
import React from 'react';

type Props = {
  source: string;
};

export const PostAvatar: React.FC<Props> = ({ source }) => {
  return (
    <button className="w-14 h-14 btn btn-circle overflow-hidden ml-4 btn-neutral hover:ring ring-primary ring-offset-[6px] ring-offset-primary-content">
      <Image width={56} height={56} src={source} alt="avatar" />
    </button>
  );
};
