'use client'; // Ensure this is a client component

import Form_success from '@repo/ui/Success';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';
// Import useRouter from Next.js if you need it

const Page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token'); // Retrieve the token

  // Optional: Use router if you need to navigate programmatically
  // const router = useRouter();

  return (
    <div className="flex h-screen w-full items-center justify-center bg-BlackRussian">
      <div className="flex h-[15vmax] w-[40vmax] flex-col items-center justify-center border-white bg-BlueCharcol p-3">
        <Form_success
          className="flex w-[80%] items-center justify-center"
          message="Email has been verified"
        />
        {/* Optional: Include a Link component if needed */}
        <Link className="mt-3 rounded-lg bg-slate-500 p-2" href={'login'}>
          Go to Login Page
        </Link>
      </div>
    </div>
  );
};

export default Page;
