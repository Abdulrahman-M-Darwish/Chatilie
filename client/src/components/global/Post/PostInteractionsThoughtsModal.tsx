import {
  ApolloCache,
  DefaultContext,
  MutationFunctionOptions,
  OperationVariables,
} from '@apollo/client';
import React, { useRef, useState } from 'react';
import { Button, Dropdown, Modal, Textarea } from 'react-daisyui';
import { GiThink } from 'react-icons/gi';
import { useAutoSizeTextArea } from '@/hooks';

interface Props {
  postId: string;
  createPost: (
    // eslint-disable-next-line no-unused-vars
    options?:
      | MutationFunctionOptions<
          any,
          OperationVariables,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined,
  ) => Promise<any>;
}

export const PostInteractionsThoughtsModal: React.FC<Props> = ({
  postId,
  createPost,
}) => {
  const ref = useRef<HTMLDialogElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState('');
  useAutoSizeTextArea(textareaRef.current, text);
  return (
    <>
      <Dropdown.Item onClick={() => ref.current?.showModal()}>
        <GiThink className="text-2xl text-warning" /> Thoughts!
      </Dropdown.Item>
      <Modal ref={ref}>
        <Modal.Body>
          <Textarea
            ref={textareaRef}
            value={text}
            className="resize-none w-full max-h-[60vh] rounded-xl placeholder:text-xl"
            placeholder="Write Your Thoughts"
            onChange={(e) => setText(e.target.value)}
          />
        </Modal.Body>
        <Modal.Actions>
          <form method="dialog">
            <Button
              color="primary"
              className="mr-4"
              onClick={() =>
                createPost({
                  variables: {
                    createPostInput: {
                      rePostedPostId: postId,
                      text,
                    },
                  },
                })
              }
            >
              Re Post
            </Button>
            <Button>Close</Button>
          </form>
        </Modal.Actions>
      </Modal>
    </>
  );
};
