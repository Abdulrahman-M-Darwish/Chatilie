'use client';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { Button, Dropdown } from 'react-daisyui';
import { BiRepost } from 'react-icons/bi';
import { useMutation, useQuery } from '@apollo/client';
import {
  CREATE_REACTION,
  GET_REACTIONS,
  REMOVE_REACTION,
  CREATE_POST,
} from './operations';
import { Reaction } from '@/types';
import { useAppSelector } from '@/store';
import {  useState } from 'react';
import { DynamicDropdown } from '..';
import { PiMaskSadFill } from 'react-icons/pi';
import { PostInteractionsThoughtsModal } from './PostInteractionsThoughtsModal';

type Props = {
  postId: string;
  authorId: string;
};

export const PostInteractions: React.FC<Props> = ({ postId, authorId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState<number>(0);
  const user = useAppSelector((state) => state.user.user);
  const [createPost] = useMutation(CREATE_POST);
  useQuery(GET_REACTIONS, {
    variables: { postId },
    onCompleted({ reactions }) {
      setLikesCount(reactions.count);
      setIsLiked(
        reactions.reactions.some(
          (reaction: Reaction) => reaction.user.name == user?.name,
        ),
      );
    },
  });
  const [like] = useMutation(CREATE_REACTION, {
    variables: {
      createReactionInput: {
        postId,
        userId: user?.id,
      },
    },
  });
  const [unLike] = useMutation(REMOVE_REACTION, {
    variables: {
      removeReactionPostId: postId,
    },
  });
  const handleClick = async () => {
    if (authorId == user?.id) return;
    if (isLiked) {
      return unLike({
        onCompleted() {
          setLikesCount((p) => p + -1);
          setIsLiked(false);
        },
      });
    }
    like({
      onCompleted() {
        setLikesCount((p) => p + 1);
        setIsLiked(true);
      },
    });
  };
  return (
    <div className="flex justify-around pr-4 py-2">
      <div
        className={
          'flex items-center gap-1 group hover:text-error ' +
          (isLiked ? 'text-error' : '')
        }
        onClick={handleClick}
      >
        <Button
          color="ghost"
          shape="circle"
          className="group-hover:bg-error-content"
        >
          {isLiked ? (
            <FaHeart className="text-xl" />
          ) : (
            <FaRegHeart className="text-xl" />
          )}
        </Button>
        <span className="pointer-events-none select-none">{likesCount}</span>
      </div>
      <div className="flex items-center gap-1 group hover:text-warning">
        <Button
          color="ghost"
          shape="circle"
          className="text-xl group-hover:bg-warning-content"
        >
          <HiOutlineChatBubbleLeftRight />
        </Button>
        <span className="pointer-events-none select-none">0</span>
      </div>
      <div className="flex items-center gap-1 group">
        <DynamicDropdown className="!dropdown-top ">
          <Dropdown.Details.Toggle
            color="ghost"
            shape="circle"
            className="text-xl group-hover:bg-info-content group-hover:text-info"
          >
            <BiRepost />
          </Dropdown.Details.Toggle>
          <Dropdown.Menu className="w-52 z-50">
            <PostInteractionsThoughtsModal
              postId={postId}
              createPost={createPost}
            />
            <Dropdown.Item
              onClick={() =>
                createPost({
                  variables: {
                    createPostInput: {
                      rePostedPostId: postId,
                    },
                  },
                })
              }
            >
              <PiMaskSadFill className="text-2xl text-error" />
              Without!!
            </Dropdown.Item>
          </Dropdown.Menu>
        </DynamicDropdown>
        <span className="pointer-events-none select-none group-hover:text-info">
          0
        </span>
      </div>
      <div className="flex items-center gap-1 group hover:text-success">
        <Button
          color="ghost"
          shape="circle"
          className="text-xl group-hover:bg-success-content"
        >
          <AiOutlineShareAlt />
        </Button>
        <span className="pointer-events-none select-none">0</span>
      </div>
    </div>
  );
};
