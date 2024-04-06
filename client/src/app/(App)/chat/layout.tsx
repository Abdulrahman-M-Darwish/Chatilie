import { ContactsList } from '@/components';
import dynamic from 'next/dynamic';

const Wall = dynamic(() => import('@/components/pages/chat/Wall'), {
  ssr: false,
});

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="MESSAGES flex flex-1 relative overflow-hidden">
      <Wall />
      <ContactsList />
      {children}
    </div>
  );
};

export default Layout;
