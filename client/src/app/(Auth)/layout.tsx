'use client';

const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      {children}
    </div>
  );
};

export default Layout;
