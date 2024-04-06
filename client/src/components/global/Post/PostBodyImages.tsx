import Image from 'next/image';
import React from 'react';

type Props = {
  mediaUrls: string[];
};

export const PostBodyImages: React.FC<Props> = ({ mediaUrls }) => {
  return (
    mediaUrls?.length > 0 && (
      <div className="flex flex-wrap rounded-box overflow-hidden border-2 border-neutral-content">
        {mediaUrls?.length === 1 && (
          <Image
            alt="Idk Maybe It's An Image Of Hell"
            width={500}
            height={500}
            className="w-full"
            src={mediaUrls[0]}
          />
        )}
        {mediaUrls?.length === 2 && (
          <>
            <Image
              alt="Idk Maybe It's An Image Of Hell"
              width={500}
              height={500}
              className="w-1/2 border-neutral-content border-r-2"
              src={mediaUrls[0]}
            />
            <Image
              alt="Idk Maybe It's An Image Of Hell"
              width={500}
              height={500}
              className="w-1/2 border-l-2"
              src={mediaUrls[1]}
            />
          </>
        )}
        {mediaUrls?.length === 3 && (
          <>
            <Image
              alt="Idk Maybe It's An Image Of Hell"
              width={500}
              height={500}
              className="w-1/2 border-neutral-content border-r-4"
              src={mediaUrls[0]}
            />
            <div className="w-1/2">
              <div className="h-1/2">
                <Image
                  alt="Idk Maybe It's An Image Of Hell"
                  width={500}
                  height={500}
                  className="border-b-2 h-full border-neutral-content"
                  src={mediaUrls[1]}
                />
              </div>
              <div className="h-1/2">
                <Image
                  alt="Idk Maybe It's An Image Of Hell"
                  width={500}
                  height={500}
                  className="h-full border-t-2 border-neutral-content"
                  src={mediaUrls[2]}
                />
              </div>
            </div>
          </>
        )}
        {mediaUrls?.length === 4 && (
          <>
            <Image
              alt="Idk Maybe It's An Image Of Hell"
              width={500}
              height={500}
              className="w-1/2 border-r-neutral-content border-b-neutral-content border-r-2 border-b-2"
              src={mediaUrls[0]}
            />
            <Image
              alt="Idk Maybe It's An Image Of Hell"
              width={500}
              height={500}
              className="w-1/2 border-b-2 border-l-2 border-l-neutral-content border-b-neutral-content"
              src={mediaUrls[1]}
            />
            <Image
              alt="Idk Maybe It's An Image Of Hell"
              width={500}
              height={500}
              className="w-1/2 border-neutral-content border-r-2 border-t-2"
              src={mediaUrls[2]}
            />
            <Image
              alt="Idk Maybe It's An Image Of Hell"
              width={500}
              height={500}
              className="w-1/2 border-neutral-content border-l-2 border-t-2"
              src={mediaUrls[3]}
            />
          </>
        )}
      </div>
    )
  );
};
