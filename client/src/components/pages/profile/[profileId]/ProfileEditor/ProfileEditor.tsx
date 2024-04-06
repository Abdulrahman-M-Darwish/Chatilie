'use client';
import React, { useRef, useState } from 'react';
import { TbUserEdit } from 'react-icons/tb';
import { AiOutlineClose } from 'react-icons/ai';
import { Button, Input, Modal, Textarea } from 'react-daisyui';
import { Profile, User } from '@/types';
import { Avatar, Cover, CoverCropper, Hobbies } from './components';
import { useAppDispatch, useAppSelector } from '@/store';
import { BsArrowLeft } from 'react-icons/bs';
import {
  closeImage,
  setUserProfile,
  editUser,
  setImage,
} from '@/store/features';
import { useFormik } from 'formik';
import { useAutoSizeTextArea } from '@/hooks';
import { useMutation } from '@apollo/client';
import { UPLOAD_MEDIAS, UPDATE_PROFILE, UPDATE_USER } from './operations';
import { removeUnchangedFields } from '@/utils';

export const ProfileEditor: React.FC = () => {
  const user = useAppSelector((state) => state.user.user) as User;
  const profile = useAppSelector((state) => state.user.profile) as Profile;
  const { avatar, cover, isModalOpen, type } = useAppSelector(
    (state) => state.image,
  );
  const [uploadMedias] = useMutation(UPLOAD_MEDIAS);
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const [updateUser] = useMutation(UPDATE_USER);
  const [hobbies, setHobbies] = useState<string[]>(profile?.hobbies || []);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      username: user.username,
      bio: profile?.bio || '',
    },
    onSubmit() {},
  });
  const handleSave = async () => {
    dialogRef.current?.close();
    const { bio, username } = formik.values;
    const profileFieldsToUpdate = {
      bio,
      hobbies,
      cover: profile?.cover,
    };
    const userFieldsToUpdate = {
      username,
      avatar: user.avatar,
    };
    if (cover) {
      const { data } = await uploadMedias({
        variables: {
          uploadMediasInput: {
            base64EncodedImages: [cover],
            folder: 'cover',
          },
        },
      });
      profileFieldsToUpdate.cover = data.uploadMedias[0].secure_url;
    }
    if (avatar) {
      const { data } = await uploadMedias({
        variables: {
          uploadMediasInput: {
            base64EncodedImages: [avatar],
            folder: 'avatar',
          },
        },
      });
      userFieldsToUpdate.avatar = data.uploadMedias[0].secure_url;
    }
    removeUnchangedFields(profileFieldsToUpdate, profile);
    removeUnchangedFields(userFieldsToUpdate, user);
    dispatch(setUserProfile({ ...profile, ...profileFieldsToUpdate }));
    dispatch(editUser(userFieldsToUpdate));
    if (Object.keys(profileFieldsToUpdate).length > 0) {
      updateProfile({
        variables: {
          updateProfileId: user.id,
          updateProfileInput: profileFieldsToUpdate,
        },
      });
    }
    if (Object.keys(userFieldsToUpdate).length > 0) {
      updateUser({
        variables: {
          updateUserInput: userFieldsToUpdate,
        },
      });
    }
  };
  const handleClose = () => {
    dispatch(setImage({ image: '', type }));
    dispatch(closeImage());
  };
  useAutoSizeTextArea(textAreaRef.current, formik.values.bio);
  return (
    <>
      <Button
        className="self-end ml-auto capitalize"
        onClick={() => dialogRef.current?.showModal()}
      >
        <TbUserEdit className="text-2xl" /> Edit
      </Button>
      <Modal ref={dialogRef} className="p-0">
        <Modal.Actions className="bg-base-200 flex justify-between items-center p-4 gap-2 sticky top-0 m-0 z-50">
          {isModalOpen && (
            <button type="button" onClick={handleClose}>
              <BsArrowLeft className="text-2xl" />
            </button>
          )}
          {!isModalOpen && (
            <button onClick={() => dialogRef.current?.close()}>
              <AiOutlineClose className="text-2xl" />
            </button>
          )}
          <h2 className="!mr-auto text-xl">Edit Profile</h2>
          {!isModalOpen && (
            <button
              className="btn btn-primary px-8 capitalize font-bold rounded-full"
              onClick={handleSave}
            >
              save
            </button>
          )}
        </Modal.Actions>
        <Modal.Body className="bg-base-300">
          {isModalOpen && (avatar || cover) && <CoverCropper />}
          <div className={isModalOpen ? 'opacity-0 absolute w-0 h-0' : ''}>
            <Cover />
            <Avatar />
            <div className="px-8 space-y-6">
              <div className="relative">
                <label
                  htmlFor="username"
                  className="absolute left-0 top-0 text-primary font-bold translate-x-4 -translate-y-1/2 bg-base-300 px-2"
                >
                  Username
                </label>
                <Input
                  id="username"
                  placeholder="username"
                  size="lg"
                  color="ghost"
                  className="focus:bg-opacity-5 w-full"
                  {...formik.getFieldProps('username')}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="bio"
                  className="absolute left-0 top-0 text-primary font-bold translate-x-4 -translate-y-1/2 bg-base-300 px-2"
                >
                  Bio
                </label>
                <Textarea
                  id="bio"
                  color="ghost"
                  size="lg"
                  placeholder="NO BIO >_<"
                  className="focus:bg-opacity-5 w-full resize-none"
                  ref={textAreaRef}
                  {...formik.getFieldProps('bio')}
                ></Textarea>
              </div>
              <Hobbies hobbies={hobbies} setHobbies={setHobbies} />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
