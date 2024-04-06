import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { GiCrossedSwords } from 'react-icons/gi';

type Props = {
  medias: string[];
  setMedias: Dispatch<SetStateAction<string[]>>;
};

export const ImagesPreivew: React.FC<Props> = ({ medias, setMedias }) => {
  const handleClick = (i: number) =>
    setMedias((p) => p.filter((_, index) => index !== i));
  return (
    <div className="flex gap-2 p-2 bg-base-200/50 backdrop-blur-sm rounded-box mb-1 justify-center">
      {medias.map((media, i) => (
        <div
          key={i}
          className="relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-base-200/50 after:rounded-xl after:opacity-0 hover:after:opacity-100 after:transition-opacity group"
        >
          <button
            onClick={() => handleClick(i)}
            className="btn btn-xs btn-circle absolute -top-1.5 -right-1.5 z-50 group-hover:opacity-100 group-hover:ring-2 opacity-0 ring-primary group-hover:ring-offset-4 ring-offset-primary-content animate-spin"
          >
            <GiCrossedSwords />
          </button>
          <Image
            width={100}
            height={100}
            alt="media-preview"
            src={media}
            className="rounded-xl"
          />
        </div>
      ))}
    </div>
  );
};
