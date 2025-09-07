import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth, type Role } from '../stores/auth'

export default function RequireRole({ allow }: { allow: Role | Role[] }) {
  const { user } = useAuth()
  const location = useLocation()
  const allowed = Array.isArray(allow) ? allow : [allow]
  if (!user || !allowed.includes(user.role)) {
    return <Navigate to="/" replace state={{ from: location }} />
  }
  return <Outlet />
}
