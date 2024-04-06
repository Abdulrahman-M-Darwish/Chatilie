import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  size: number;
  alt: string;
  src: string;
  isUseLink?: boolean;
  name: string;
};

export const Avatar: React.FC<Props> = ({
  size,
  alt,
  src,
  isUseLink = true,
  name,
}) => {
  return isUseLink ? (
    <Link
      href={'/profile/@' + name}
      className="active:scale-[.97] transition-transform"
    >
      <Image
        tabIndex={0}
        width={size}
        height={size}
        alt={alt}
        src={src}
        className="bg-neutral rounded-full pointer-events-none"
      />
    </Link>
  ) : (
    <Image
      tabIndex={0}
      width={size}
      height={size}
      alt={alt}
      src={src}
      className="bg-neutral rounded-full "
    />
  );
};
