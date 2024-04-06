import { MdOutlineDangerous } from 'react-icons/md';

export const ErroDialog: React.FC<{
  errorMessage: string | undefined;
  isTouched: Boolean | undefined;
}> = ({ errorMessage, isTouched }) => {
  if (!errorMessage || !isTouched) return;
  return (
    <p className="text-error flex items-center gap-1 p-2">
      <MdOutlineDangerous className="text-xl" />
      {errorMessage}
    </p>
  );
};
