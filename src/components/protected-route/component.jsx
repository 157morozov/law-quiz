import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context.jsx';

function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="protected-route__status">Проверяем доступ к досье…</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
