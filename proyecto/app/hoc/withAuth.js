import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../Context/AuthContext';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
      if (user === false) { // Verifica explícitamente si el usuario no está autenticado
        router.push('/'); // Redirige a la página de inicio
      }
    }, [user, router]);

    if (user === null) { // Mientras se verifica la autenticación
      return <div>Cargando...</div>; // Opcional: Mostrar un indicador de carga
    }

    return user ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;