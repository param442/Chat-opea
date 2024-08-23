'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useState, useEffect } from 'react';
import Form_error from '@repo/ui/Error';
import Form_success from '@repo/ui/Success';
import { BeatLoader } from 'react-spinners';
import VerificationToken from '../../../actions/VerificationToken';
const page = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const searchParam = useSearchParams();
  const token = searchParam.get('token');
  const OldEmail = searchParam.get('email');
  const onSubmit = useCallback(() => {
    console.log(token);
    if (success || error) return;
    if (!token) {
      setError('Missing Toekn!');
      return;
    }
    if (!OldEmail) {
      VerificationToken(token)
        .then((data) => {
          if (data.success) {
            setSuccess(data.success);
            setError('');
          }
          if (data.error) {
            setError(data.error);
            setSuccess('');
          }
        })
        .catch(() => {
          setError('Something Went Wrong');
        });
    } else {
      VerificationToken(token, OldEmail)
        .then((data) => {
          if (data.success) {
            setSuccess(data.success);
            setError('');
          }
          if (data.error) {
            setError(data.error);
            setSuccess('');
          }
        })
        .catch(() => {
          setError('Something Went Wrong');
        });
    }
  }, [token, OldEmail, success, error]);
  useEffect(() => {
    console.log(token);
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-BlackRussian">
      {!success && !error && <BeatLoader />}
      {!success && <Form_error message={error} />}
      <Form_success message={success} />
    </div>
  );
};

export default page;
