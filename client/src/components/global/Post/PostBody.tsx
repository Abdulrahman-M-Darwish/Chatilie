import { PostBodyImages } from './PostBodyImages';

type Props = {
  text: string;
  mediaUrls: string[];
};

export const PostBody: React.FC<Props> = ({ mediaUrls, text }) => {
  return (
    <figure className="px-4 py-2">
      <pre className="whitespace-pre-wrap break-words mx-2 my-2 mb-4 text-lg">
        {text}
      </pre>
      <PostBodyImages mediaUrls={mediaUrls} />
    </figure>
  );
};
