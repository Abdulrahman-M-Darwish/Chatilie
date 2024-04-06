'use client';
import { useEffect, useState } from 'react';
import { GiBrickWall } from 'react-icons/gi';

export const Wall: React.FC = () => {
  const brickSize = 60;
  const [bricksPerColumn, setBricksPerColumn] = useState(0);
  const [bricksPerRow, setBricksPerRow] = useState(0);
  useEffect(() => {
    const set = () => {
      setBricksPerRow(
        Math.floor(
          (document.querySelector('.MESSAGES')?.clientWidth || 0) / brickSize,
        ),
      );
      setBricksPerColumn(
        Math.floor(
          (document.querySelector('.MESSAGES')?.clientHeight || 0) / brickSize,
        ),
      );
    };
    const id = setTimeout(set);
    window.addEventListener('resize', set);
    return () => {
      window.removeEventListener('resize', set);
      clearTimeout(id);
    };
  }, []);
  const colors = ['base-content', 'neutral', 'primary', 'accent', 'secondary'];
  return (
    <div className="w-full h-full flex flex-wrap absolute top-0 left-0 -z-10 justify-between after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black/10 after:backdrop-blur-sm">
      {[...Array(bricksPerRow)].map((a, i) =>
        [...Array(bricksPerColumn)].map((a, j) => {
          const randomNum = Math.floor(Math.random() * colors.length);
          return (
            <GiBrickWall
              key={i + j}
              size={brickSize}
              className={`text-${colors[randomNum]} rounded-[10px]`}
            />
          );
        }),
      )}
    </div>
  );
};

export default Wall;
