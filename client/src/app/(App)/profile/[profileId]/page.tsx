import {
  FriendsSection,
  IntroSection,
  PostCreator,
  PostsSection,
} from '@/components';
import { GET_POSTS } from './operations';

const Profile: React.FC = (props: any) => {
  const userName = props.params.profileId.slice(3);
  const variables = {
    findPostsInput: { author: { name: userName } },
  };
  return (
    <div className="flex my-8 gap-4">
      <div className="max-w-[400px] h-fit space-y-4 flex-1">
        <IntroSection userName={userName} />
        <FriendsSection userName={userName} />
      </div>
      <div className="space-y-4 mx-auto w-full max-w-xl">
        <PostCreator userName={userName} />
        <PostsSection query={GET_POSTS} variables={variables} />
      </div>
    </div>
  );
};

export default Profile;
