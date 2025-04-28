import useProfile from '@/lib/hooks/ProfileData'; 

const useProGuard = () => {
  const { profile } = useProfile();
  const isPaidUser = profile?.isPaid ?? false;  // Default to false if undefined

  return isPaidUser;
};

export default useProGuard;