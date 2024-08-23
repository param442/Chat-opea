'use client'; // Ensure this is a client component

import { useSearchParams } from 'next/navigation';
import React from 'react';

const Page = () => {
  const router = useSearchParams();
  const token = router.get('token');

  return (
    <div className="h-screen w-full bg-BlackRussian">
      <input className="text-black" type="text" />
      <button onClick={() => console.log()}>Submit</button>
    </div>
  );
};

export default Page;
