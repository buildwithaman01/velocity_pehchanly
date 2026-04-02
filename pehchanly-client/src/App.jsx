import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Services from './pages/Services';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminOverview from './pages/AdminOverview';
import AdminServices from './pages/AdminServices';
import AdminProjects from './pages/AdminProjects';
import AdminLeads from './pages/AdminLeads';
import Contact from './pages/Contact';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#122837]">
      <div className="w-12 h-12 border-4 border-[#FBFC09] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/dashboard" />;
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-[#122837] min-h-screen text-white font-sans selection:bg-[#FBFC09] selection:text-[#122837]">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/services" element={<Services />} />
              <Route path="/login" element={<Login />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Client Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />

              {/* Admin Routes */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute adminOnly>
                    <AdminOverview />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/services" 
                element={
                  <ProtectedRoute adminOnly>
                    <AdminServices />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/projects" 
                element={
                  <ProtectedRoute adminOnly>
                    <AdminProjects />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/leads" 
                element={
                  <ProtectedRoute adminOnly>
                    <AdminLeads />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </AnimatePresence>
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#1a3245',
                color: '#fff',
                border: '1px solid rgba(251, 252, 9, 0.1)',
                fontFamily: 'Bricolage Grotesque, sans-serif',
                textTransform: 'uppercase',
                fontSize: '10px',
                letterSpacing: '0.1em'
              }
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
