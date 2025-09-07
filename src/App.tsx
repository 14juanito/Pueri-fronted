import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import AdminDashboard from './pages/AdminDashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import ParentDashboard from './pages/ParentDashboard'
import Login from './pages/Login'
import Profile from './pages/Profile'
import RequireAuth from './components/RequireAuth'
import RequireRole from './components/RequireRole'
import CreateUser from './pages/admin/CreateUser'
import TeachersList from './pages/admin/TeachersList'
import ParentsList from './pages/admin/ParentsList'
import UploadAssignments from './pages/teacher/UploadAssignments'
import ParentAssignments from './pages/parent/Assignments'

function App() {
  return (
    <div className="min-h-dvh flex flex-col">
      <NavBar />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route element={<RequireAuth />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/teacher" element={<TeacherDashboard />} />
              <Route path="/parent" element={<ParentDashboard />} />
              <Route path="/profile" element={<Profile />} />
              {/* Admin-only subroutes */}
              <Route element={<RequireRole allow="ADMIN" />}>
                <Route path="/admin/users/new" element={<CreateUser />} />
                <Route path="/admin/teachers" element={<TeachersList />} />
                <Route path="/admin/parents" element={<ParentsList />} />
              </Route>
              {/* Teacher-only subroutes */}
              <Route element={<RequireRole allow="TEACHER" />}>
                <Route path="/teacher/assignments" element={<UploadAssignments />} />
              </Route>
              {/* Parent-only subroutes */}
              <Route element={<RequireRole allow="PARENT" />}>
                <Route path="/parent/assignments" element={<ParentAssignments />} />
              </Route>
            </Route>
            <Route path="*" element={<div>Page non trouvée</div>} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App
