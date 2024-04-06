import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_POST } from './operations';
import { PostHead } from './PostHead';
import { PostBody } from './PostBody';
import { PostAvatar } from './PostAvatar';

type Props = {
  rePostedPostId: string;
  text: string | null | undefined;
};

export const PostRePostBody: React.FC<Props> = ({ rePostedPostId, text }) => {
  const { data } = useQuery(GET_POST, {
    variables: { postId: rePostedPostId },
  });
  if (data)
    return (
      <div>
        <pre className="px-8 py-2 whitespace-pre-wrap break-words">{text}</pre>
        <div className="p-4 border-base-100">
          <div className="flex flex-col gap-2 border-2 rounded-xl border-base-100 pt-4 pb-2">
            <div className="flex">
              <PostAvatar source={data.post.author.avatar} />
              <div className="flex-1">
                <PostHead
                  createdAt={data.post.createdAt}
                  name={data.post.author.name}
                  privacy={data.post.privacy}
                  username={data.post.author.username}
                  noButtons={true}
                />
                <PostBody
                  mediaUrls={data.post.mediaUrls}
                  text={data.post.text}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};
