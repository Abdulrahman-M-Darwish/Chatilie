import { useAppSelector } from '@/store';
import { User } from '@/types';
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
  meFunction?: (user: User) => void;
  // eslint-disable-next-line no-unused-vars
  personFunction?: (user: User) => void;
};

export const useGetUser = (
  query: DocumentNode | TypedDocumentNode<any, OperationVariables>,
  { idOrName, meFunction, personFunction }: Props,
) => {
  const currentUser = useAppSelector((state) => state.user.user);
  const isMe = currentUser?.name == idOrName || currentUser?.id == idOrName;
  const [getUser, result] = useLazyQuery(query);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (isMe) {
      setUser(currentUser);
      if (meFunction) meFunction(currentUser);
      return;
    }
    getUser({
      variables: { userId: idOrName },
      onCompleted(data) {
        setUser(data.user);
        if (personFunction) personFunction(data.user);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, getUser, idOrName, isMe]);
  return { user, isMe, ...result };
};
