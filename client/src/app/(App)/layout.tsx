import { Navbar, ProtectedRoutes } from '@/components';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ProtectedRoutes>
      <div className="flex justify-center gap-8">
        <Navbar />
        {children}
      </div>
    </ProtectedRoutes>
  );
};

export default Layout;
