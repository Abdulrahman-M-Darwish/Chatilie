import { SideNav } from '@/components';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const SideNavLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      {children}
      <SideNav />
    </>
  );
};

export default SideNavLayout;
