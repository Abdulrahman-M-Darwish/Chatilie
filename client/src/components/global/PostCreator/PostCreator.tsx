'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useAutoSizeTextArea, useBase64 } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/store';
import { Button, Dropdown, Textarea } from 'react-daisyui';
import { Post, Privacy, User } from '@/types';
import { IoEarthOutline } from 'react-icons/io5';
import { FaUserFriends } from 'react-icons/fa';
import { MdOutlineLockOpen } from 'react-icons/md';
import { ImAttachment } from 'react-icons/im';
import { EmojiPicker } from '../EmojiPicker/EmojiPicker';
import { DynamicDropdown } from '@/components';
import { updatePost } from '@/store/features';
import { removeUnchangedFields } from '@/utils';
import { PostHead } from '../Post/PostHead';
import { PostBodyImages } from '../Post/PostBodyImages';
import { PostAvatar } from '../Post/PostAvatar';
import { useMutation } from '@apollo/client';
import { CREATE_POST, UPDATE_POST, UPLOAD_MEDIAS } from './operations';

type Props = {
  userName?: string;
  post?: Post;
};

export const PostCreator: React.FC<Props> = ({ post, userName }) => {
  const postCreatorRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user) as User;
  const [text, setText] = useState('');
  const [privacy, setPrivacy] = useState(Privacy.PUBLIC);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [caretPosition, setCaretPosition] = useState(0);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isMe = user.name == (userName || user.name);
  useAutoSizeTextArea(textAreaRef.current, text);
  useBase64(buttonRef.current, (base64Image) =>
    setMediaUrls((p) => [...p, base64Image]),
  );
  const [createPost, { loading: createPostLoading }] = useMutation(CREATE_POST);
  const [updatePostMutation, { loading: updatePostLoading }] =
    useMutation(UPDATE_POST);
  const [uploadMedias, { loading: uploadMediasLoading }] =
    useMutation(UPLOAD_MEDIAS);
  const handlePrivacyChange = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => setPrivacy(e.currentTarget.dataset.value as Privacy);
  const handleUploadPost = async () => {
    text.trim();
    if (text == '' && mediaUrls.length === 0) return;
    let pics = [];
    if (mediaUrls.length) {
      const { data } = await uploadMedias({
        variables: {
          uploadMediasInput: {
            base64EncodedImages: mediaUrls,
            folder: 'posts',
          },
        },
      });
      pics = data?.uploadMedias;
    }
    createPost({
      variables: {
        createPostInput: {
          text,
          mediaUrls: pics.map((image: any) => image.secure_url),
          privacy,
        },
      },
    });
    setText('');
    setMediaUrls([]);
  };
  const handleUpdatePost = async () => {
    const postFieldsToUpdate = {
      text,
      mediaUrls,
      privacy,
    };
    removeUnchangedFields(postFieldsToUpdate, post);
    if (Object.keys(postFieldsToUpdate).length == 0) return;
    if (mediaUrls.length) {
      const { data } = await uploadMedias({
        variables: {
          uploadMediasInput: {
            base64EncodedImages: mediaUrls,
            folder: 'posts',
          },
        },
      });
      postFieldsToUpdate.mediaUrls = data?.uploadMedias?.map(
        (image: any) => image.secure_url,
      );
    }
    updatePostMutation({
      variables: {
        updatePostId: post?.id,
        updatePostInput: postFieldsToUpdate,
      },
    });
    dispatch(updatePost(null));
  };
  const handleCancel = () => {
    dispatch(updatePost(null));
  };
  useEffect(() => {
    setText(post?.text || '');
    setMediaUrls(post?.mediaUrls || []);
    setPrivacy(post?.privacy || Privacy.PUBLIC);
    postCreatorRef.current?.scrollIntoView({ behavior: 'smooth' });
    textAreaRef.current?.focus();
  }, [post]);
  if (!isMe) return;
  return (
    <div
      ref={postCreatorRef}
      className="Post self-center w-full bg-base-300 py-4 rounded-box"
    >
      <div className="flex">
        <PostAvatar source={user.avatar} />
        <div className="flex-1">
          <PostHead
            privacy={privacy}
            createdAt={post?.createdAt || 'Not Yet'}
            name={post?.author?.name || user.name}
            username={post?.author?.username || user.username}
          />
          <div className="pr-4">
            <figure>
              <div>
                <Textarea
                  ref={textAreaRef}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onSelect={(e) => {
                    setCaretPosition(e.currentTarget.selectionEnd);
                  }}
                  color="ghost"
                  placeholder="Definitely Not Text"
                  className="resize-none caret-primary w-full focus:bg-opacity-5 focus:border-0 focus:outline-none border-none text-base mt-2 mb-4 font-mono bg-base-300 max-h-[40vh]"
                />
              </div>
              <PostBodyImages mediaUrls={mediaUrls} />
            </figure>
          </div>
        </div>
      </div>
      <div className="flex mx-4 pt-4 gap-2">
        <Button ref={buttonRef} shape="circle">
          <ImAttachment />
        </Button>
        {post ? (
          <>
            <Button
              color="ghost"
              className="flex-1 rounded-full"
              onClick={handleUpdatePost}
              loading={updatePostLoading}
              disabled={updatePostLoading}
            >
              Save
            </Button>
            <Button
              color="ghost"
              disabled={updatePostLoading}
              className="flex-1"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            color="primary"
            className="flex-1"
            onClick={handleUploadPost}
            loading={createPostLoading || uploadMediasLoading}
            disabled={createPostLoading || uploadMediasLoading}
            shape="circle"
          >
            Done
          </Button>
        )}
        <DynamicDropdown>
          <Dropdown.Details.Toggle shape="circle">
            {'>_<'}
          </Dropdown.Details.Toggle>
          <Dropdown.Menu className="relative z-50 p-0">
            <EmojiPicker
              onEmojiSelect={({ native }) => {
                setText(
                  (p) =>
                    p.slice(0, caretPosition) + native + p.slice(caretPosition),
                );
                setCaretPosition((p) => (p += native.length));
              }}
            />
          </Dropdown.Menu>
        </DynamicDropdown>
        <DynamicDropdown>
          <Dropdown.Details.Toggle className="text-xl" shape="circle">
            {privacy == Privacy.PUBLIC ? (
              <IoEarthOutline />
            ) : privacy == Privacy.ONLY_FRIENDS ? (
              <FaUserFriends />
            ) : (
              <MdOutlineLockOpen />
            )}
          </Dropdown.Details.Toggle>
          <Dropdown.Menu className="z-50 relative">
            <Dropdown.Item
              data-value={Privacy.PUBLIC}
              onClick={handlePrivacyChange}
            >
              Public <IoEarthOutline />
            </Dropdown.Item>
            <Dropdown.Item
              data-value={Privacy.ONLY_FRIENDS}
              onClick={handlePrivacyChange}
            >
              OnlyFriends <FaUserFriends />
            </Dropdown.Item>
            <Dropdown.Item
              data-value={Privacy.PRIVATE}
              onClick={handlePrivacyChange}
            >
              Private <MdOutlineLockOpen />
            </Dropdown.Item>
          </Dropdown.Menu>
        </DynamicDropdown>
      </div>
    </div>
  );
};
