import { useEffect } from 'react';

export const useClickOutside = (
  detailsElementRef: HTMLDetailsElement | null,
) => {
  useEffect(() => {
    if (!detailsElementRef || detailsElementRef.hasAttribute('open')) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        e.target !== detailsElementRef &&
        !detailsElementRef.contains(e.target as Node)
      ) {
        detailsElementRef.removeAttribute('open');
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [detailsElementRef]);
};
