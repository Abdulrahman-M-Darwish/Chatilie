'use client';
import React from 'react';
import Picker from '@emoji-mart/react';
import emojiData from '@emoji-mart/data';
import { useAppSelector } from '@/store';

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  // eslint-disable-next-line no-unused-vars
  onEmojiSelect: (data: { name: string; native: string }) => void;
}

export const EmojiPicker: React.FC<Props> = (props) => {
  const colorScheme = useAppSelector((state) => state.theme.colorScheme);
  return (
    <Picker
      data={emojiData}
      theme={colorScheme}
      exceptEmojis={['rainbow-flag', 'transgender_flag']}
      perLine={7}
      emojiButtonColors={[
        'rgba(155,223,88,.7)',
        'rgba(149,211,254,.7)',
        'rgba(247,233,34,.7)',
        'rgba(238,166,252,.7)',
        'rgba(255,213,143,.7)',
        'rgba(211,209,255,.7)',
      ]}
      {...props}
    />
  );
};
