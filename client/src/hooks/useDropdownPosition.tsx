import { useEffect } from 'react';

export const useDropdownPosition = (dropdownRef: HTMLDetailsElement | null) => {
  useEffect(() => {
    if (!dropdownRef) return;
    const handleClick = () => {
      if (dropdownRef.hasAttribute('open')) return;
      const { innerWidth, innerHeight } = window;
      const { top, bottom, left, right } = dropdownRef.getBoundingClientRect();
      const { width, height } = dropdownRef.children[1].getBoundingClientRect();
      const topSpace = top;
      const bottomSpace = innerHeight - bottom;
      const leftSpace = left;
      const rightSpace = innerWidth - right - 30;
      if (bottomSpace >= height || topSpace < height) {
        dropdownRef?.classList.remove('dropdown-top');
      } else {
        dropdownRef?.classList.add('dropdown-top');
      }
      if (rightSpace >= width || leftSpace < width) {
        dropdownRef?.classList.remove('dropdown-left');
      } else {
        dropdownRef?.classList.add('dropdown-left');
      }
    };
    const handleResize = () => dropdownRef.removeAttribute('open');
    window.addEventListener('resize', handleResize);
    dropdownRef.children[0].addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('resize', handleResize);
      dropdownRef.children[0].removeEventListener('click', handleClick);
    };
  }, [dropdownRef]);
};
