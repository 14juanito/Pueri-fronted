import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../stores/auth';
import type { UserRole } from '../types';

// Définition de la hiérarchie des rôles
const ROLE_HIERARCHY: Record<UserRole, number> = {
  DEVELOPER: 4,
  ADMIN: 3,
  TEACHER: 2,
  PARENT: 1,
};

interface RequireRoleProps {
  allow: UserRole | UserRole[];
  redirectTo?: string;
  showForbidden?: boolean;
  children?: React.ReactNode;
}

/**
 * Composant de protection de route basé sur les rôles
 * @param allow - Rôle(s) autorisé(s) à accéder à la route
 * @param redirectTo - Route de redirection si l'utilisateur n'a pas les droits (par défaut: page d'accueil)
 * @param showForbidden - Afficher un message d'interdiction au lieu de rediriger
 * @param children - Contenu à afficher si l'utilisateur a les droits
 */
export default function RequireRole({
  allow,
  redirectTo = '/',
  showForbidden = false,
  children,
}: RequireRoleProps) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const allowedRoles = Array.isArray(allow) ? allow : [allow];
  const userRoleLevel = ROLE_HIERARCHY[user.role as UserRole] || 0;
  
  // Vérifier si l'utilisateur a un rôle suffisant
  const hasRequiredRole = allowedRoles.some(role => {
    const requiredRoleLevel = ROLE_HIERARCHY[role];
    // Un utilisateur avec un rôle supérieur a automatiquement accès
    return userRoleLevel >= requiredRoleLevel;
  });

  // Si l'utilisateur n'a pas le bon rôle
  if (!hasRequiredRole) {
    if (showForbidden) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Accès refusé</h2>
          <p className="text-gray-600">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </p>
        </div>
      );
    }
    
    // Rediriger vers la page spécifiée ou la page d'accueil par défaut
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Si l'utilisateur a les droits, afficher les enfants ou le contenu de la route
  return children ? <>{children}</> : <Outlet />;
}

// Composant utilitaire pour vérifier les permissions dans les composants
export function useHasRole(requiredRole: UserRole | UserRole[]): boolean {
  const { user } = useAuth();
  
  if (!user) return false;
  
  const requiredRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  const userRoleLevel = ROLE_HIERARCHY[user.role as UserRole] || 0;
  
  return requiredRoles.some(role => {
    const requiredRoleLevel = ROLE_HIERARCHY[role];
    return userRoleLevel >= requiredRoleLevel;
  });
}
