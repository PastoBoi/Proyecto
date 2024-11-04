// hoc/withAuth.js

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../Context/AuthContext';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push('/login');
      }
    }, [user, router]);

    if (!user) {
      return null; // O un indicador de carga
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;