import { PostCreator, PostsSection } from '@/components';

const Home: React.FC = () => {
  return (
    <div className="max-w-xl w-full space-y-4 mt-8">
      <PostCreator />
      <PostsSection />
    </div>
  );
};

export default Home;
