import { Results, Search } from '@/components';
import React from 'react';

type Props = {
  searchParams: {
    q: string;
  };
};

const WhatTheSearchPage: React.FC<Props> = ({ searchParams: { q } }) => {
  return (
    <div className="mx-auto max-w-2xl w-full py-8 ">
      <Search />
      <Results q={q} />
    </div>
  );
};

export default WhatTheSearchPage;
