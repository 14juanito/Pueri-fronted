import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth as useAuthStore } from '../stores/auth';
import { api } from '../services/api';
import type { UserRole } from '../types';

export function useAuth() {
  const { user, isAuthenticated, login: loginStore, logout: logoutStore, updateProfile: updateProfileStore } = useAuthStore();
  const navigate = useNavigate();

  /**
   * Connecte l'utilisateur avec un email et un mot de passe
   */
  const login = useCallback(async (email: string, password: string) => {
    try {
      const { user: userData, token } = await api.login(email, password);
      
      // Stocker le token dans le localStorage
      localStorage.setItem('authToken', token);
      
      // Mettre à jour le store d'authentification
      loginStore({
        id: userData.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
        isActive: userData.isActive,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt
      });
      
      // Rediriger vers le tableau de bord approprié
      switch (userData.role) {
        case 'ADMIN':
        case 'DEVELOPER':
          navigate('/admin');
          break;
        case 'TEACHER':
          navigate('/teacher');
          break;
        case 'PARENT':
          navigate('/parent');
          break;
        default:
          navigate('/');
      }
      
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Une erreur est survenue lors de la connexion' 
      };
    }
  }, [loginStore, navigate]);

  /**
   * Déconnecte l'utilisateur
   */
  const logout = useCallback(async () => {
    try {
      await api.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Toujours nettoyer le stockage local et l'état
      localStorage.removeItem('authToken');
      logoutStore();
      navigate('/login');
    }
  }, [logoutStore, navigate]);

  /**
   * Met à jour le profil de l'utilisateur
   */
  const updateProfile = useCallback(async (data: { firstName?: string; lastName?: string; email?: string }) => {
    if (!user) return { success: false, error: 'Not authenticated' };
    
    try {
      await api.updateProfile(data);
      updateProfileStore({
        firstName: data.firstName || user.firstName,
        lastName: data.lastName || user.lastName,
        email: data.email || user.email,
      });
      return { success: true };
    } catch (error) {
      console.error('Update profile failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Une erreur est survenue lors de la mise à jour du profil' 
      };
    }
  }, [updateProfileStore]);

  /**
   * Change le mot de passe de l'utilisateur
   */
  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    try {
      await api.changePassword(currentPassword, newPassword);
      return { success: true };
    } catch (error) {
      console.error('Change password failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Une erreur est survenue lors du changement de mot de passe' 
      };
    }
  }, []);

  /**
   * Vérifie si l'utilisateur a un certain rôle
   */
  const hasRole = useCallback((role: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    
    const roles = Array.isArray(role) ? role : [role];
    return roles.includes(user.role);
  }, [user]);

  /**
   * Vérifie si l'utilisateur a un rôle avec un niveau d'autorisation égal ou supérieur
   */
  const hasPermission = useCallback((role: UserRole): boolean => {
    if (!user) return false;
    
    const ROLE_LEVELS: Record<UserRole, number> = {
      DEVELOPER: 4,
      ADMIN: 3,
      TEACHER: 2,
      PARENT: 1,
    };
    
    return ROLE_LEVELS[user.role] >= ROLE_LEVELS[role];
  }, [user]);

  return {
    user,
    isAuthenticated,
    login,
    logout,
    updateProfile,
    changePassword,
    hasRole,
    hasPermission,
  };
}

/**
 * Hook pour accéder aux informations d'authentification
 * C'est un alias de useAuth pour une meilleure lisibilité
 */
export const useAuthContext = useAuth;
