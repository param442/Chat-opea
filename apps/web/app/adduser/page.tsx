'use client';
import { useCallback, useState } from 'react';
import { User } from '@repo/types/types';
import { FormEvent } from 'react';
import { getUserbyId_CheckIfFollowing } from '@repo/lib/GetUser';
import { toast } from 'sonner';
import { AddUser } from '../../actions/AddUser';
import { useSession } from 'next-auth/react';

const SearchPage = () => {
  const [userId, setUserId] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [isFollowingStatus, setIsFollowingStatus] = useState<boolean>();
  const { data: session } = useSession();

  const handleSearch = useCallback(
    async (e: FormEvent<HTMLElement>) => {
      e.preventDefault();
      if (!session?.user?.id) {
        toast.error('User session not found');
        return;
      }
      try {
        const data = await getUserbyId_CheckIfFollowing(
          session.user.id,
          userId
        );
        if (!data) {
          toast.error('User not found, please try again');
          return;
        }
        console.log(data);
        if (data.Boolean === true) {
          setIsFollowingStatus(true);
        } else if (data.Boolean === false) {
          setIsFollowingStatus(false);
        }

        setUser({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          image: data.user.image,
        });
      } catch (error) {
        console.error(error);
        toast.error('An error occurred while fetching user data');
      }
    },
    [session?.user?.id, userId]
  );

  const handleAddUser = useCallback(async () => {
    if (!session?.user?.id) {
      toast.error('User session not found');
      return;
    }
    try {
      const res = await AddUser(session.user.id, userId);
      if (res.success) {
        toast.success(res.message);
        setIsFollowingStatus(!isFollowingStatus);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error('An error occurred while adding user');
    }
  }, [session?.user?.id, userId, isFollowingStatus]);

  return (
    <div className="container mt-4 flex h-screen w-full flex-col items-center justify-start gap-2">
      <h1 className="font-poppins text-3xl font-semibold">Search User</h1>
      <form className="flex gap-2" onSubmit={handleSearch}>
        <input
          className="text-black"
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter user ID or token"
        />
        <button className="border-[1.5px] border-white px-3 py-2" type="submit">
          Search
        </button>
      </form>

      {user && (
        <div className="user-details mt-3 flex w-[30%] items-center justify-between gap-3 text-white">
          <span className="relative flex items-center justify-center gap-2">
            <img
              className="h-[50px] w-[50px] rounded-full object-cover"
              src={user.image || process.env.NEXT_PUBLIC_IMG}
              alt={`${user.name}'s profile`}
            />
            <h1 className="text-white">{user.name}</h1>
          </span>

          <button
            className="border-2 border-white px-3 py-1"
            onClick={isFollowingStatus ? undefined : handleAddUser}
            disabled={isFollowingStatus}
          >
            {isFollowingStatus ? 'Following' : 'Add'}
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
