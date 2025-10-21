import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Users, BookOpen, FileText, Calendar, MessageSquare, Bell } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/services/api';
import { toast } from '@/components/ui/use-toast';

type StatsType = {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  totalAssignments: number;
  unreadMessages: number;
  unreadNotifications: number;
};

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
        const [
          studentsRes, 
          teachersRes, 
          classesRes, 
          assignmentsRes,
          messagesRes,
          notificationsRes
        ] = await Promise.all([
          api.get('/eleves/count/'),
          api.get('/utilisateurs/count/?role=TEACHER'),
          api.get('/classes/count/'),
          api.get('/devoirs/count/'),
          api.get('/messages/non_lus/count/'),
          api.get('/notifications/non_lues/count/')
        ]);

        setStats({
          totalStudents: studentsRes.data.count,
          totalTeachers: teachersRes.data.count,
          totalClasses: classesRes.data.count,
          totalAssignments: assignmentsRes.data.count,
          unreadMessages: messagesRes.data.count,
          unreadNotifications: notificationsRes.data.count,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        toast({
          title: 'Erreur',
          description: 'Impossible de charger les statistiques du tableau de bord.',
          variant: 'destructive',
        });
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
      toast({
        title: 'Accès refusé',
        description: 'Vous n\'avez pas les permissions nécessaires pour effectuer cette action.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsProcessing(true);
      await api.autoAssignSubdivisions();
      toast({
        title: 'Succès',
        description: 'L\'affectation automatique des subdivisions a été effectuée avec succès.',
      });
    } catch (error) {
      console.error('Error assigning subdivisions:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de l\'affectation des subdivisions.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Gérer le calcul des notes trimestrielles
  const handleCalculateTermGrades = async () => {
    if (!hasPermission('ADMIN')) {
      toast({
        title: 'Accès refusé',
        description: 'Vous n\'avez pas les permissions nécessaires pour effectuer cette action.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsProcessing(true);
      await api.calculateTermGrades();
      toast({
        title: 'Succès',
        description: 'Le calcul des notes trimestrielles a été effectué avec succès.',
      });
    } catch (error) {
      console.error('Error calculating term grades:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors du calcul des notes trimestrielles.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Gérer la promotion automatique des élèves
  const handleAutoPromoteStudents = async () => {
    if (!hasPermission('ADMIN')) {
      toast({
        title: 'Accès refusé',
        description: 'Vous n\'avez pas les permissions nécessaires pour effectuer cette action.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsProcessing(true);
      // Utiliser un seuil de 10/20 par défaut
      await api.autoPromoteStudents(10);
      toast({
        title: 'Succès',
        description: 'La promotion automatique des élèves a été effectuée avec succès.',
      });
    } catch (error) {
      console.error('Error promoting students:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la promotion automatique des élèves.',
        variant: 'destructive',
      });
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Élèves</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalStudents || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.totalStudents === 1 ? 'élève inscrit' : 'élèves inscrits'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enseignants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalTeachers || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.totalTeachers === 1 ? 'enseignant' : 'enseignants'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalClasses || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.totalClasses === 1 ? 'classe' : 'classes'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Devoirs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalAssignments || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.totalAssignments === 1 ? 'devoir' : 'devoirs'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Actions rapides */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Actions Administratives</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={handleAutoAssignSubdivisions}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Users className="mr-2 h-4 w-4" />
              )}
              Affecter automatiquement les subdivisions
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={handleCalculateTermGrades}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FileText className="mr-2 h-4 w-4" />
              )}
              Calculer les notes trimestrielles
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={handleAutoPromoteStudents}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Users className="mr-2 h-4 w-4" />
              )}
              Promouvoir automatiquement les élèves
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Notifications récentes</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/notifications')}>
                Voir tout
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {stats?.unreadNotifications ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-muted/50 rounded-md">
                  <div className="flex-shrink-0">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      Vous avez {stats.unreadNotifications} notification{stats.unreadNotifications > 1 ? 's' : ''} non lue{stats.unreadNotifications > 1 ? 's' : ''}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Consultez vos notifications pour ne rien manquer
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <Bell className="mx-auto h-8 w-8 mb-2 opacity-30" />
                <p>Aucune nouvelle notification</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Prochaines échéances */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Prochaines échéances</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/calendrier')}>
              Voir le calendrier
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-muted-foreground">
            <Calendar className="mx-auto h-8 w-8 mb-2 opacity-30" />
            <p>Aucune échéance à venir cette semaine</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
