import { useSubscription } from '@apollo/client';
import {
  ON_POST_CREATED,
  ON_POST_REMOVED,
  ON_POST_UPDATED,
} from '../components/pages/home/PostsSection/operations';
import { Post } from '@/types';

type Props = {
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

export const usePostSubscriptions = ({ setPosts }: Props) => {
  useSubscription(ON_POST_CREATED, {
    onData({ data: { data } }) {
      setPosts((p) => [data.postAdded, ...p]);
    },
  });
  useSubscription(ON_POST_UPDATED, {
    onData({ data: { data } }) {
      const updatedPost = data.postUpdated as Post;
      setPosts((p) =>
        p.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
      );
    },
  });
  useSubscription(ON_POST_REMOVED, {
    onData({ data: { data } }) {
      setPosts((p) => p.filter((post) => post.id !== data.postRemoved));
    },
  });
};
