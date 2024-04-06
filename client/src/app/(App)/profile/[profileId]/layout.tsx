import React from 'react';
import { AvatarSection, CoverSection } from '@/components';

type Props = {
  children: React.ReactNode;
  params: { profileId: string };
};

const Layout: React.FC<Props> = ({ children, params }) => {
  const userName = params.profileId.slice(3);
  return (
    <div className="flex-1">
      <CoverSection userName={userName} />
      <div className="mx-10">
        <AvatarSection userName={userName} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
