import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Composants UI
import { Button } from '@/components/ui/button';
import { Loader2, Users, BookOpen, FileText, Calendar } from 'lucide-react';

// Hooks et services
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/services/api';

// Types
interface StatsType {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  totalAssignments: number;
  unreadMessages: number;
  unreadNotifications: number;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}


export default function AdminDashboard() {
  const { user, hasPermission, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<StatsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // Charger les statistiques du tableau de bord
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        // En production, ces appels pourraient être combinés en un seul endpoint
        const responses = await Promise.all([
          api.get<{ count: number }>('/eleves/count/'),
          api.get<{ count: number }>('/utilisateurs/count/?role=TEACHER'),
          api.get<{ count: number }>('/classes/count/'),
          api.get<{ count: number }>('/devoirs/count/'),
          api.get<{ count: number }>('/messages/non_lus/count/'),
          api.get<{ count: number }>('/notifications/non_lues/count/')
        ]);

        setStats({
          totalStudents: responses[0].count,
          totalTeachers: responses[1].count,
          totalClasses: responses[2].count,
          totalAssignments: responses[3].count,
          unreadMessages: responses[4].count,
          unreadNotifications: responses[5].count,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        // Gérer l'erreur sans utiliser toast
        console.error('Impossible de charger les statistiques du tableau de bord.');
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchStats();
    }
  }, [user]);

  // Gérer l'affectation automatique des subdivisions
  const handleAutoAssignSubdivisions = async () => {
    if (!hasPermission('ADMIN')) {
      console.error('Accès refusé: auto_assign_subdivisions');
      return;
    }

    try {
      setIsProcessing(true);
      await api.post('/admin/auto-assign-subdivisions');
      console.log('Attribution automatique des subdivisions réussie');
    } catch (error) {
      console.error('Erreur lors de l\'attribution automatique des subdivisions:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Gérer le calcul des notes trimestrielles
  const handleCalculateTermGrades = async () => {
    if (!hasPermission('ADMIN')) {
      console.error('Accès refusé: calculate_term_grades');
      return;
    }

    try {
      setIsProcessing(true);
      await api.post('/admin/calculate-term-grades');
      console.log('Calcul des moyennes de trimestre réussi');
    } catch (error) {
      console.error('Erreur lors du calcul des moyennes de trimestre:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Gérer la promotion automatique des élèves
  const handleAutoPromoteStudents = async () => {
    if (!hasPermission('ADMIN')) {
      console.error('Accès refusé: auto_promote_students');
      return;
    }

    try {
      setIsProcessing(true);
      await api.post('/admin/auto-promote-students');
      console.log('Promotion automatique des élèves réussie');
    } catch (error) {
      console.error('Erreur lors de la promotion automatique des élèves:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord Administrateur</h1>
          <p className="text-muted-foreground">
            Bienvenue, {user?.firstName} {user?.lastName}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => navigate('/admin/parametres')}>
            Paramètres
          </Button>
          <Button variant="outline" onClick={() => logout()}>
            Déconnexion
          </Button>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Élèves</h3>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">{stats?.totalStudents || 0}</div>
            <p className="text-xs text-muted-foreground">Inscrits cette année</p>
          </div>
        </div>
        
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Enseignants</h3>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">{stats?.totalTeachers || 0}</div>
            <p className="text-xs text-muted-foreground">Enseignants actifs</p>
          </div>
        </div>
        
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Classes</h3>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">{stats?.totalClasses || 0}</div>
            <p className="text-xs text-muted-foreground">Classes actives</p>
          </div>
        </div>
        
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Devoirs</h3>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">{stats?.totalAssignments || 0}</div>
            <p className="text-xs text-muted-foreground">Cette année scolaire</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm md:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Notifications récentes</h3>
          <Button variant="ghost" size="sm" onClick={() => navigate('/notifications')}>
            Voir tout
          </Button>
        </div>
        <div className="space-y-4">
          {stats && stats.unreadNotifications > 0 ? (
            <div className="rounded-lg bg-blue-50 p-4">
              <div className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-xs font-medium">{stats.unreadNotifications}</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-800">
                    {stats.unreadNotifications} notification(s) non lue(s)
                  </p>
                  <p className="text-sm text-blue-700">
                    Consultez vos notifications pour les détails
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Aucune nouvelle notification
            </p>
          )}
        </div>
      </div>

      {/* Actions rapides */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Actions Administratives</h3>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleAutoAssignSubdivisions}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center py-2">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Traitement en cours...
                </div>
              ) : (
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  Affecter automatiquement les subdivisions
                </div>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={handleCalculateTermGrades}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center py-2">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Traitement en cours...
                </div>
              ) : (
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Calculer les moyennes de trimestre
                </div>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={handleAutoPromoteStudents}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center py-2">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Traitement en cours...
                </div>
              ) : (
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  Promouvoir automatiquement les élèves
                </div>
              )}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Section Notifications */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Notifications récentes</h3>
              <Button variant="ghost" size="sm" onClick={() => navigate('/notifications')}>
                Voir tout
              </Button>
            </div>
            <div className="space-y-4">
              {stats && stats.unreadNotifications > 0 ? (
                <div className="rounded-lg bg-blue-50 p-4">
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-xs font-medium">{stats.unreadNotifications}</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-blue-800">
                        {stats.unreadNotifications} notification(s) non lue(s)
                      </p>
                      <p className="text-sm text-blue-700">
                        Consultez vos notifications pour les détails
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Aucune nouvelle notification
                </p>
              )}
            </div>
          </div>

          {/* Section Prochaines échéances */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Prochaines échéances</h3>
              <Button variant="ghost" size="sm" onClick={() => navigate('/calendrier')}>
                Voir le calendrier
              </Button>
            </div>
            <div className="text-center py-6 text-muted-foreground">
              <Calendar className="mx-auto h-8 w-8 mb-2 opacity-30" />
              <p>Aucune échéance à venir cette semaine</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
