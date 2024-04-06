'use client';
import React, { useState } from 'react';
import { GET_POSTS } from './operations';
import { DocumentNode, OperationVariables, useQuery } from '@apollo/client';
import { NoPosts, Post } from '@/components';
import { Post as IPost } from '@/types';
import { usePostSubscriptions } from '@/hooks';

type Props = {
  query?: DocumentNode;
  variables?: OperationVariables;
};

export const PostsSection: React.FC<Props> = ({ query, variables }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  useQuery(query || GET_POSTS, {
    variables,
    onCompleted({ posts: queriedPosts }) {
      setPosts((p) => [...p, ...queriedPosts]);
    },
  });
  usePostSubscriptions({ setPosts });
  return posts.length == 0 ? (
    <NoPosts
      message={
        <>
          No Posts GO Mak Posts, Friends, Life,{' '}
          <span className="text-error underline decoration-error tracking-widest">
            H-T-
          </span>
        </>
      }
    />
  ) : (
    <ul className="Posts flex flex-col gap-4">
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </ul>
  );
};
