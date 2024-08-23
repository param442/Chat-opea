import { TypeNoitications, UserType } from '@repo/types/types';
import LeftDrawer from '@repo/ui/LeftDrawer';
import { motion, AnimatePresence, easeIn } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { PiCopyBold } from 'react-icons/pi';
import { toast } from 'sonner';
import Fetchnotifations from '../../actions/Fetchnotifations';
import { AddUser } from '../../actions/AddUser';
import { DeleNotitfications } from '../../actions/DeleteNotifications';
import { easeInOut } from 'framer-motion/dom';
const LeftDrawers = ({
  Drawer,
  setDrawer,
}: {
  Drawer: string;
  setDrawer: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const isErrorType = (obj: any): obj is { error: string } => 'error' in obj;
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<TypeNoitications | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);
  const isNotificationArray = (
    obj: any
  ): obj is {
    followerName: string;
    followerImage: string;
    followerId: string;
    type: string;
    content: string;
  }[] => Array.isArray(obj);
  const MOTION = useMemo(
    () => ({
      initial: {
        x: '100%',
        opacity: 0,
      },
      animate: {
        x: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 30,
        },
      },
      exit: {
        x: '100%',
        opacity: 0,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 30,
        },
      },
    }),
    []
  );

  const notificationVariants = {
    initial: { opacity: 1, height: 'auto' },
    animate: { opacity: 1, height: 'auto', ease: easeInOut },
    exit: { opacity: 0, height: 0, transition: { duration: 0.5 } },
  };
  const data = useRef<UserType>();

  const handleClose = () => {
    setDrawer(''); // or setDrawer(null) if you use null to signify no drawer
  };

  const handleCopyClick = () => {
    if (data.current?.id) {
      navigator.clipboard.writeText(data.current.id).then(
        () => toast.success('ID copied to clipboard!'),
        (err) => toast.error('Failed to copy ID!')
      );
    }
  };

  const GetNotifications = useCallback(async () => {
    if (data.current?.id) {
      setLoading(true);
      try {
        const result = await Fetchnotifations(data.current.id);
        if (isErrorType(result)) {
          setError(result.error);
          setNotifications(null);
        } else {
          setNotifications(result);
          setError(null);
        }
      } catch (err) {
        setError('Failed to fetch notifications');
        setNotifications(null);
      } finally {
        setLoading(false);
      }
    } else {
      setError('Invalid user ID');
    }
  }, []);
  const addUser = async (followerId: string) => {
    if (!data.current?.id) {
      return { data: 'incoreect userID' };
    }
    const res = await AddUser(data.current.id, followerId, 'FollowBack');
    if (res === undefined) {
      toast.error('some thing wrong');
      return false;
    }
    toast.info(res.message);
    if (res.success) {
      return true;
    }
    return false;
  };
  const DeletNotification = async (followerId: string) => {
    if (data.current?.id) {
      await DeleNotitfications(data.current.id, followerId);
      setNotifications((prevNotifications) => {
        if (Array.isArray(prevNotifications)) {
          // Filter out the deleted notification
          return prevNotifications.filter(
            (notification) => notification.followerId !== followerId
          );
        }
        // If notifications are not an array, return them unchanged
        return prevNotifications;
      });
    }
  };
  const close = useRef(null);
  useEffect(() => {
    if (session) {
      // Update the ref with session data or any other data
      if (!session.user.image) {
        session.user.image =
          'https://imgs.search.brave.com/7LKV1tXLYYmgh7KaI_iZoDOSgkhg6IBEIQ_2BrLkXXg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzE5LzMyLzkz/LzM2MF9GXzExOTMy/OTM4N19zVVRiVWRl/eWhrMG51aE53NVdh/RnZPeVFGbXhlcHBq/WC5qcGc';
      }
      data.current = {
        id: session.user.id,
        name: session.user.name,
        Image: session.user.image,
        email: session.user.email,
      };

      GetNotifications();
    }
  }, [session, close]);

  return (
    <AnimatePresence>
      {Drawer && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0, width: '100%' }}
            animate={{ opacity: 0.5, width: ['100%', '70%'] }}
            exit={{ opacity: 0, width: '100%' }}
            className="fixed inset-0 z-10 w-[75%] bg-black"
          />
          {Drawer === 'user' && (
            <motion.div
              initial={MOTION.initial}
              animate={MOTION.animate}
              exit={MOTION.exit}
              className="fixed right-0 top-0 h-screen w-[30%] bg-black opacity-0"
            >
              <nav className="p-3">
                <button
                  className="flex w-full justify-end"
                  onClick={handleClose}
                >
                  <RxCross2 />
                </button>
              </nav>
              <LeftDrawer className="mt-6 flex flex-col items-center justify-start gap-4">
                <span className="ml-2">
                  <img
                    className="rounded-full"
                    src={data.current?.Image}
                    alt="LOGO"
                  />
                </span>
                <div className="w-[100%] px-4">
                  <h1 className="mt-3 flex gap-1">
                    <span className="select-none rounded-md bg-BlackRussian px-2">
                      {' '}
                      Name:
                    </span>{' '}
                    {data.current?.name}
                  </h1>
                  <h1 className="mt-3 flex gap-1">
                    <span className="select-none rounded-md bg-BlackRussian px-2">
                      {' '}
                      Email:
                    </span>{' '}
                    {data.current?.email}
                  </h1>
                  <h1 className="mt-3 flex gap-1">
                    <span className="select-none rounded-md bg-BlackRussian px-2">
                      {' '}
                      Id:
                    </span>{' '}
                    {data.current?.id.slice(0, 10) + '.....'}
                    <span className="ml-2 cursor-pointer">
                      <PiCopyBold onClick={handleCopyClick} />
                    </span>
                  </h1>
                </div>
              </LeftDrawer>
            </motion.div>
          )}
          {Drawer === 'notification' && (
            <motion.div
              initial={MOTION.initial}
              animate={MOTION.animate}
              exit={MOTION.exit}
              className="fixed right-0 top-0 h-screen w-[30%] bg-black opacity-0"
            >
              <nav className="p-3">
                <button
                  className="flex w-full justify-end"
                  onClick={handleClose}
                >
                  <RxCross2 />
                </button>
              </nav>
              <LeftDrawer>
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : notifications && isNotificationArray(notifications) ? (
                  notifications.map((notification, idx) => {
                    return (
                      <motion.div
                        variants={notificationVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        key={notification.followerId}
                        className="flex items-center justify-around border-b-2 border-white p-4"
                      >
                        <img
                          className="h-[5vmax] w-[5vmax] rounded-full"
                          src={
                            notification.followerImage ||
                            'https://imgs.search.brave.com/7LKV1tXLYYmgh7KaI_iZoDOSgkhg6IBEIQ_2BrLkXXg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzE5LzMyLzkz/LzM2MF9GXzExOTMy/OTM4N19zVVRiVWRl/eWhrMG51aE53NVdh/RnZPeVFGbXhlcHBq/WC5qcGc'
                          }
                          alt={notification.followerName}
                        />
                        <p className="ml-2">
                          {notification.followerName} <br />
                          <span className="text-xs">
                            {notification.content}
                          </span>
                        </p>
                        <button
                          className="rounded-full bg-white px-2 py-1 text-sm text-black"
                          onClick={async (e) => {
                            const button = e.target as HTMLButtonElement;
                            if (button.innerHTML == 'Following') {
                              return;
                            }
                            const res = await addUser(notification.followerId);
                            if (res) {
                              button.innerHTML = 'Following';
                            }
                          }}
                        >
                          {' '}
                          FollowBack{' '}
                        </button>
                        <span ref={close}>
                          <RxCross2
                            onClick={() => {
                              DeletNotification(notification.followerId);
                            }}
                          />
                        </span>
                      </motion.div>
                    );
                  })
                ) : (
                  <p>No notifications available</p>
                )}
              </LeftDrawer>
            </motion.div>
          )}
          {Drawer === 'more' && (
            <motion.div
              initial={MOTION.initial}
              animate={MOTION.animate}
              exit={MOTION.exit}
              className="fixed right-0 top-0 h-screen w-[30%] bg-black"
            >
              <LeftDrawer>
                <button onClick={handleClose}>
                  Currenty working click me to go back
                </button>
                {/* Other content for LeftDrawer */}
              </LeftDrawer>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default LeftDrawers;
