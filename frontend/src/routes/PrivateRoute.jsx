import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import TrainerContext from '../contexts/TrainerContext';

const PrivateRoute = () => {
  const { userToken } = useContext(TrainerContext);

  return userToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
