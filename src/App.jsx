import { useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Login } from './pages';
import { ProductProvider } from './contexts/ProductContext';
import { ProfileProvider } from './contexts/ProfileContext';
import { router } from './routes';
import { AuthProvider } from './contexts/AuthContext';
import { AuthContext } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}

function InnerApp() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <ProductProvider>
      <ProfileProvider>
        <Router>
          <Routes>
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/" /> : <Login />}
            />
            {router.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  isAuthenticated ? route.element : <Navigate to="/login" />
                }
              />
            ))}
          </Routes>
        </Router>
        <ToastContainer />
      </ProfileProvider>
    </ProductProvider>
  );
}

export default App;
