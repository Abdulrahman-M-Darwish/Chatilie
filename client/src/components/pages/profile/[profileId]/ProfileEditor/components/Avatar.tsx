import { BiSolidCamera } from 'react-icons/bi';
import Image from 'next/image';
import { useRef } from 'react';
import { useBase64 } from '@/hooks';
import { openImage } from '@/store/features';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/store';

export const Avatar: React.FC = () => {
  const avatar = useAppSelector((state) => state.user.user?.avatar);
  const avatarPreview = useAppSelector((state) => state.image.avatar);
  const dispatch = useDispatch();
  const buttonRef = useRef<HTMLButtonElement>(null);
  useBase64(buttonRef.current, (image) =>
    dispatch(openImage({ image, type: 'avatar' })),
  );
  return (
    <button
      ref={buttonRef}
      className="avatar -top-16 ml-6 group btn btn-circle w-auto h-auto p-0"
    >
      <div className="absolute !flex items-center justify-center w-full h-full bg-base-300/75 z-50 rounded-full opacity-0 group-hover:opacity-100 transition-all">
        <BiSolidCamera className="text-4xl" />
      </div>
      <div className="w-32 h-32 ring-8 ring-base-200 rounded-full bg-base-200 relative">
        <Image
          width={150}
          height={150}
          src={avatarPreview || avatar!}
          alt="avatar"
          className="object-contain"
        />
      </div>
    </button>
  );
};
