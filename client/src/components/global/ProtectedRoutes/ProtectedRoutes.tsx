'use client';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { setUser } from '@/store/features';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import { GET_USER } from './operations';

export const ProtectedRoutes: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const { replace } = useRouter();
  const { error, loading } = useQuery(GET_USER, {
    variables: { userId: 'me' },
    onCompleted(data) {
      dispatch(setUser(data.user));
    },
    onError(error) {
      if (error?.message == 'Forbidden resource') {
        replace('/login');
      }
    },
  });
  if (error?.message == 'Failed to fetch')
    return 'failed to fetch please check your internet connection';
  if (loading) return <Loading />;
  if (user) return children;
};
