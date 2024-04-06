'use client';
import { Dropdown } from 'react-daisyui';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { BsBookmark, BsPersonSlash, BsThreeDotsVertical } from 'react-icons/bs';
import { FiSlash } from 'react-icons/fi';
import { DynamicDropdown } from '@/components';
import { useAppDispatch, useAppSelector } from '@/store';
import {  Privacy, User } from '@/types';
import { HiOutlinePencil } from 'react-icons/hi';
import { RxCrumpledPaper } from 'react-icons/rx';
import { GrFormViewHide  } from 'react-icons/gr';
import { updatePost } from '@/store/features';
import { useMutation } from '@apollo/client';
import { REMOVE_POST, UPDATE_POST } from './operations';
import { FaCommentSlash } from 'react-icons/fa6';
import { FiEye } from 'react-icons/fi';

type PostDropdownProps = {
  id: string;
  name: string;
  privacy: string;
  authorId: string;
};

type AuthorDropdownProps = {
  id: string;
  privacy: string;
};

const AuthorDropdown: React.FC<AuthorDropdownProps> = ({ id, privacy }) => {
  const dispatch = useAppDispatch();
  const [deletePost] = useMutation(REMOVE_POST, {
    variables: { removePostId: id },
  });
  const [updatePostMutatuion] = useMutation(UPDATE_POST, {
    variables: {
      updatePostId: id,
    },
  });
  return (
    <Dropdown.Menu className="relative z-50 w-56 shadow shadow-base-content/10 mt-2">
      <Dropdown.Item onClick={() => dispatch(updatePost(id))}>
        <HiOutlinePencil className="text-xl -scale-x-100 pointer-events-none" />
        Edit Post
      </Dropdown.Item>
      <Dropdown.Item onClick={() => deletePost()}>
        <RxCrumpledPaper className="text-xl" />
        Delete Post
      </Dropdown.Item>
      {privacy == Privacy.PRIVATE ? (
        <Dropdown.Item
          onClick={() =>
            updatePostMutatuion({
              variables: { updatePostInput: { privacy: Privacy.PUBLIC } },
            })
          }
        >
          <FiEye className="text-xl" />
          Make Public
        </Dropdown.Item>
      ) : (
        <Dropdown.Item
          onClick={() =>
            updatePostMutatuion({
              variables: { updatePostInput: { privacy: Privacy.PRIVATE } },
            })
          }
        >
          <GrFormViewHide className="text-xl" />
          Make Private
        </Dropdown.Item>
      )}
      <Dropdown.Item onClick={() => updatePostMutatuion()}>
        <FaCommentSlash className="text-xl" />
        Hide Comments
      </Dropdown.Item>
    </Dropdown.Menu>
  );
};

const UserDropdown: React.FC<{ name: string }> = ({ name }) => {
  return (
    <Dropdown.Menu className="relative z-50 w-56 shadow shadow-base-content/10 mt-2">
      <Dropdown.Item>
        <AiOutlineUsergroupAdd className="text-xl" />
        Friend Request
      </Dropdown.Item>
      <Dropdown.Item>
        <BsBookmark className="text-xl" />
        Save Post
      </Dropdown.Item>
      <Dropdown.Item>
        <FiSlash className="text-xl" />
        Not interested
      </Dropdown.Item>
      <Dropdown.Item>
        <BsPersonSlash className="text-xl" />
        Block {name}
      </Dropdown.Item>
    </Dropdown.Menu>
  );
};

export const PostDropdown: React.FC<PostDropdownProps> = ({
  authorId,
  id,
  name,
  privacy,
}) => {
  const user = useAppSelector((state) => state.user.user) as User;
  const isMe = user.id == authorId;
  return (
    <DynamicDropdown>
      <Dropdown.Details.Toggle className="HELL text-2xl btn btn-circle btn-outline btn-primary hover:text-primary hover:border-primary hover:border-2 hover:bg-primary-content hover:ring hover:ring-primary hover:ring-offset-8 hover:ring-offset-primary-content hover:animate-spin duration-700">
        <BsThreeDotsVertical />
      </Dropdown.Details.Toggle>
      {isMe ? (
        <AuthorDropdown id={id} privacy={privacy} />
      ) : (
        <UserDropdown name={name} />
      )}
    </DynamicDropdown>
  );
};
