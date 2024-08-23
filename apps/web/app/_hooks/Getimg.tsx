import { useSession } from 'next-auth/react';

const Getimg = () => {
  const { data: session } = useSession();
  let images: string;
  if (session?.user.image) {
    images = session.user.image;
  } else {
    images =
      'https://imgs.search.brave.com/7LKV1tXLYYmgh7KaI_iZoDOSgkhg6IBEIQ_2BrLkXXg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzE5LzMyLzkz/LzM2MF9GXzExOTMy/OTM4N19zVVRiVWRl/eWhrMG51aE53NVdh/RnZPeVFGbXhlcHBq/WC5qcGc';
  }
  return images;
};

export default Getimg;
