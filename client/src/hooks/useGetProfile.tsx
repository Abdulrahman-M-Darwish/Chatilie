import { useAppSelector } from '@/store';
import { Profile } from '@/types';
import {
  DocumentNode,
  OperationVariables,
  TypedDocumentNode,
  useLazyQuery,
} from '@apollo/client';
import { useEffect, useState } from 'react';

type Props = {
  idOrName: string;
  // eslint-disable-next-line no-unused-vars
  meFunction?: (profile: Profile) => void;
  // eslint-disable-next-line no-unused-vars
  personFunction?: (profile: Profile) => void;
};

export const useGetProfile = (
  query: DocumentNode | TypedDocumentNode<any, OperationVariables>,
  { idOrName, meFunction, personFunction }: Props,
) => {
  const currentUser = useAppSelector((state) => state.user.user);
  const currentProfile = useAppSelector((state) => state.user.profile);
  const isMe = currentUser?.name == idOrName || currentUser?.id == idOrName;
  const [getProfile, result] = useLazyQuery(query);
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => {
    if (isMe && currentProfile) {
      setProfile(currentProfile);
      if (meFunction) meFunction(currentProfile);
      return;
    }
    if (isMe && !currentProfile) {
      getProfile({
        variables: { userId: idOrName },
        onCompleted({ profile }) {
          setProfile(profile);
          if (meFunction) meFunction(profile);
        },
      });
      return;
    }
    getProfile({
      variables: { userId: idOrName },
      onCompleted(data) {
        setProfile(data.profile);
        if (personFunction) personFunction(data);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProfile, getProfile, idOrName, isMe]);
  return { profile, isMe, ...result };
};
