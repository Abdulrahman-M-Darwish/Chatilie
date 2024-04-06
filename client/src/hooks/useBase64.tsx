import { useEffect, useState } from 'react';

export const useBase64 = (
  triggerRef: HTMLButtonElement | null,
  // eslint-disable-next-line no-unused-vars
  fn: (base64Image: string) => void,
) => {
  // const inputElement = document.createElement("input");
  // inputElement.type = "file";
  const [input, setInput] = useState(document.createElement('input'));
  input.type = 'file';
  useEffect(() => {
    if (!triggerRef || !input) return;
    const handleClick = () => {
      input.click();
    };
    const handleInput = (e: Event) => {
      const file = ((e.target as HTMLInputElement).files || [])[0];
      if (!file) return;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        fn(reader.result as string);
        setInput(() => {
          const input = document.createElement('input');
          input.type = 'file';
          return input;
        });
      };
    };
    triggerRef.addEventListener('click', handleClick);
    input.addEventListener('change', handleInput);
    return () => {
      triggerRef.removeEventListener('click', handleClick);
      input.removeEventListener('change', handleInput);
      input.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, triggerRef]);
};
