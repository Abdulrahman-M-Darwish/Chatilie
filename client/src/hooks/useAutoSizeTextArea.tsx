import { useEffect } from 'react';

export const useAutoSizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string,
) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = '0px';
      const scrollHeight = textAreaRef.scrollHeight;
      textAreaRef.style.height = 2 + scrollHeight + 'px';
    }
  }, [textAreaRef, value]);
};
