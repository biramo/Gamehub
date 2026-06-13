import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Spiner from '../components/Spiner';

export default function ProtectedRoute({ children }) {
  const {user, loading}=useAuth();

  if(loading) return (
    <Spiner/>
  );

  if(!user){
   return <Navigate to="/login" replace/>
  }

  return children;
}
