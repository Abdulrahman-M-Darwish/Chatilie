'use client';
import { useClickOutside, useDropdownPosition } from '@/hooks';
import React, { useRef } from 'react';
import { Dropdown } from 'react-daisyui';

interface Props {
  horizontal?: 'left' | 'right' | undefined;
  vertical?: 'top' | 'bottom' | undefined;
  end?: boolean | undefined;
  hover?: boolean | undefined;
  open?: boolean | undefined;
  children: React.ReactNode;
  className?: string;
}

export const DynamicDropdown: React.FC<Props> = ({ children, ...args }) => {
  const ref = useRef<HTMLDetailsElement>(null);
  useClickOutside(ref.current);
  useDropdownPosition(ref.current);
  return (
    <Dropdown.Details {...args} ref={ref}>
      {children}
    </Dropdown.Details>
  );
};
