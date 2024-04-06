export const topOrBottom = (detailsRef: HTMLDetailsElement | null) => {
  let position = 'bottom';
  if (!detailsRef) return;
  const { height, y } = (
    detailsRef?.lastChild as HTMLUListElement
  ).getBoundingClientRect();
  if (y > height / 2) {
    position = 'top';
  } else {
    position = 'bottom';
  }
  return position;
};
