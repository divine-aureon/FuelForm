import useProfile from '@/lib/hooks/useProfile'; 

const useProGuard = () => {
  const { profile } = useProfile();
  const isPaidUser = profile?.isPaid ?? false;  // Default to false if undefined

  return isPaidUser;
};

export default useProGuard;