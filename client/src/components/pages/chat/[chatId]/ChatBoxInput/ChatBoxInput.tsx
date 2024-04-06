'use client';
import { useAutoSizeTextArea, useBase64 } from '@/hooks';
import { useMutation } from '@apollo/client';
import { useRef, useState } from 'react';
import { Button, Dropdown, Textarea } from 'react-daisyui';
import { BsMic } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi';
import { RiEmojiStickerLine } from 'react-icons/ri';
import { ImAttachment } from 'react-icons/im';
import { useAppSelector } from '@/store';
import { SEND_MESSAGE } from '../operations';
import { DynamicDropdown, EmojiPicker } from '@/components';
import { ImagesPreivew } from './components/ImagesPreview';

type Props = { chatId: string };

export const ChatBoxInput: React.FC<Props> = ({ chatId }) => {
  const [caretPosition, setCaretPosition] = useState(0);
  const [text, setText] = useState('');
  const userId = useAppSelector((state) => state.user.user?.id);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [medias, setMedias] = useState<string[]>([]);
  useAutoSizeTextArea(textAreaRef.current, text);
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // eslint-disable-next-line no-empty
    if (e.key === 'Enter' && e.shiftKey) {
    } else if (e.key === 'Enter') {
      e.nativeEvent.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;
    await sendMessage({
      variables: {
        createMessageInput: {
          text: text.trim(),
          chatId,
          userId,
        },
      },
    });
    setText('');
  };
  useBase64(buttonRef.current, (base64Image) =>
    setMedias((p) => [...p, base64Image]),
  );
  return (
    <div className="chat-input bg-base-300/50 backdrop-blur-3xl rounded-box p-2">
      {medias.length > 0 && (
        <ImagesPreivew medias={medias} setMedias={setMedias} />
      )}
      <form className="flex items-center gap-2" onSubmit={handleSubmit}>
        <Button ref={buttonRef}>
          <ImAttachment className="text-xl" />
        </Button>
        <DynamicDropdown>
          <Dropdown.Details.Toggle>
            <RiEmojiStickerLine className="text-xl" />
          </Dropdown.Details.Toggle>
          <Dropdown.Menu className="relative z-50 p-0">
            <EmojiPicker
              onEmojiSelect={({ native }) => {
                setText(
                  (p) =>
                    p.slice(0, caretPosition) + native + p.slice(caretPosition),
                );
                setCaretPosition((p) => (p += native.length));
              }}
            />
          </Dropdown.Menu>
        </DynamicDropdown>
        <div className="py-2 px-4 flex-1 bg-base-100 rounded-box">
          <Textarea
            className="w-full rounded-none resize-none max-h-52 p-0 border-none focus:outline-none"
            placeholder="Talk So I Can C U"
            ref={textAreaRef}
            onChange={handleChange}
            onKeyDown={handleKeyUp}
            onSelect={(e) => {
              setCaretPosition(e.currentTarget.selectionEnd);
            }}
            value={text}
          />
        </div>
        {text ? (
          <Button>
            <FiSend className="text-2xl" />
          </Button>
        ) : (
          <Button>
            <BsMic className="text-2xl" />
          </Button>
        )}
      </form>
    </div>
  );
};
