import { useContext, useEffect, useRef, useState } from 'react';
import { getUser } from '../utils/api';
import AuthContext from '../utils/context/AuthContext';

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const controller = new AbortController();
  const { user, updateUser } = useContext(AuthContext);
  const hasFetched = useRef(false);

  useEffect(() => {
    const updateAuthUser = async () => {
      try {
        const { data } = await getUser();

        updateUser(data);
        setTimeout(() => setLoading(false), 1000);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
      hasFetched.current = true;
    };

    if (!hasFetched.current) {
      if (!user) {
        updateAuthUser();
      } else {
        // If state already has user ... eg. When user gets redirected from a route that is meant for non-authenticated people
        setLoading(false);
      }

      hasFetched.current = true;
    }
    return () => {
      controller.abort();
    };
  }, []);

  return { user, loading };
};

export default useAuth;
