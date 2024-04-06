'use client';
import moment from 'moment';
import { useState } from 'react';

type Props = {
  createdAt: string | number;
};

export const Time: React.FC<Props> = ({ createdAt }) => {
  const time = new Date(createdAt || +createdAt);
  const [clickedTimes, setClickedTimes] = useState(0);
  const handleClick = () => {
    setClickedTimes((p) => (p < 3 ? p + 1 : 0));
  };
  return (
    <time
      onClick={handleClick}
      className="text-xs opacity-50 select-none w-fit h-fit p-0"
    >
      {clickedTimes === 0 && moment(time).fromNow(true)}
      {clickedTimes === 1 && moment(time).format('MMM Do YY')}
      {clickedTimes === 2 && moment(time).format('dddd')}
      {clickedTimes === 3 && moment(time).format('h:mm:ss')}
    </time>
  );
};
