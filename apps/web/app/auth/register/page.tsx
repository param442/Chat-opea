'use client';

import { cn } from '@repo/lib/utils';
import { useEffect, useState } from 'react';
import Signup from '@repo/ui/signup';
import Login from '@repo/ui/login';
import { register } from '../../../actions/register';
import {
  oAuthTypes,
  TypeLoginSchema,
  TypeSignupSchema,
} from '@repo/types/types';
import LoginCheck from '../../../actions/login';
import { toast } from 'sonner';
import { oAuth } from '../../../actions/oAuth';

const page = () => {
  const [btn, setBtn] = useState<'Login' | 'Signup'>('Login');
  const [Emailverified, setEmailVerifiedStatus] = useState<boolean>(false);
  useEffect(() => {
    const data = process.env.NEXT_PUBLIC_AUTH_SECRET;
    console.log(data);
  });
  const signup = async (data: TypeSignupSchema) => {
    const response = await register(data);

    if (response.success) toast.success(response.success);
    else toast.error(response.message);
  };
  const signIn = async (data: TypeLoginSchema) => {
    const response = await LoginCheck(data);
    if (response.success) toast.success(response.success);
    else toast.error(response.error);
  };
  const oauth = async (Provider: oAuthTypes) => {
    const signin = await oAuth(Provider);
  };
  return (
    <div className="relative flex h-screen w-full bg-BlackRussian font-poppins selection:bg-black">
      <div className="tracking-loose relative left-[8%] flex h-full w-[45%] flex-col items-start justify-center text-7xl leading-tight">
        <h1>Empower</h1>
        <h1>Communication</h1>
        <h1>With chat-opea</h1>
        <h1>🚄Hurry</h1>
        <div className="relative mt-5 flex gap-4 overflow-hidden rounded-full bg-white p-5 px-7 text-xl font-semibold text-EerieBlack">
          <h1
            onClick={() => {
              setBtn('Login');
            }}
            className={cn(
              'relative z-[1] cursor-pointer rounded-full px-3 py-2',
              btn == 'Login' ? 'bg-ShadowBlack text-white' : 'text-black'
            )}
          >
            Login
          </h1>{' '}
          <span className="absolute left-0 top-0 h-full w-full bg-black opacity-[0.2]"></span>
          <h1
            onClick={() => setBtn('Signup')}
            className={cn(
              'z-[1] cursor-pointer rounded-full px-3 py-2',
              btn == 'Signup' ? 'bg-ShadowBlack text-white' : 'text-black'
            )}
          >
            Signup
          </h1>{' '}
        </div>
      </div>
      <div className="Page2 flex h-full w-[55%] flex-col items-center justify-center">
        {btn == 'Login' && (
          <>
            <h1 className="text-center text-xl font-semibold">
              Connect, chat, and share—log in to begin!
              <Login oauth={oauth} signIn={signIn} />
            </h1>
            {Emailverified && (
              <div className="absolute top-0 z-[5] flex h-full w-full items-center justify-center">
                <div className="absolute top-0 z-[5] flex h-full w-full items-center justify-center bg-EerieBlack opacity-[0.8]"></div>

                <h1 className="absloute z-[10] flex w-[60%] flex-col items-center rounded-lg border-2 border-white bg-EerieBlack px-5 py-8 text-center font-poppins text-3xl opacity-100">
                  In order to login please verify your email.Verification Link
                  has been sent to your email.
                  <button
                    onClick={() => setEmailVerifiedStatus(!Emailverified)}
                    className="mt-3 w-[20%] rounded-2xl bg-white px-1 py-3 text-black"
                  >
                    Close
                  </button>
                </h1>
              </div>
            )}
          </>
        )}
        {btn == 'Signup' && (
          <>
            {' '}
            <h1 className="text-center text-xl font-semibold">
              Join the Conversation—Sign Up Now!
              <Signup Signup={signup} />
            </h1>
          </>
        )}
      </div>
    </div>
  );
};

export default page;
