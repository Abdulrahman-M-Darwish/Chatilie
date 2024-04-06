'use client';
import { useAppDispatch, useAppSelector } from '@/store';
import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { GET_POST, GET_COMMENTS } from './operations';
import { showPost } from '@/store/features';
import { Post, PostCreator } from '@/components';
import { Post as Comment } from '@/types';

type Props = {
  params: {
    postId: string;
  };
};

const SinglePostPage: React.FC<Props> = ({ params: { postId } }) => {
  const post = useAppSelector((state) => state.post.postToShow);
  const dispatch = useAppDispatch();
  const [getPost] = useLazyQuery(GET_POST);
  const { data } = useQuery(GET_COMMENTS, {
    variables: { findPostsInput: { commentedPostId: postId } },
  });
  useEffect(() => {
    if (post) return;
    getPost({
      variables: { postId },
      onCompleted({ post }) {
        dispatch(showPost(post));
      },
    });
  }, [dispatch, getPost, post, postId]);
  if (!post)
    return (
      <div className="flex-1 grid place-items-center">
        <h1 className="text-6xl text-error">404 Post Not Found</h1>
      </div>
    );
  return (
    <div className="max-w-xl w-full py-8">
      <Post {...post} />
      <div className="bg-base-300 border-y">
        <PostCreator />
      </div>
      <div className="divide-y">
        {data?.posts?.map((comment: Comment) => (
          <div className="bg-base-200" key={comment.id}>
            <Post {...comment} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SinglePostPage;
