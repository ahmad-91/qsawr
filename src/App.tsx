import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { FrappeProvider } from 'frappe-react-sdk';
import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './shared/themes';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import CreateProject from './components/Projects/CreateProject';
import CreateProjectForm from './components/Projects/CreateProjectForm';
import ProjectsList from './components/Projects/ProjectsList';
import ProjectsListNew from './components/Projects/ProjectsListNew';
import UserProfile from './components/UserProfile';

function App() {
  const frappeUrl = process.env.REACT_APP_FRAPPE_URL || 'https://qswr.sa';
  
  return (
    <ThemeProvider>
      <FrappeProvider 
        url={frappeUrl}
        enableSocket={false}
        swrConfig={{
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          shouldRetryOnError: false,
        }}
      >
        <AuthProvider>
          <ToastProvider>
            <Router>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard">
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              </Route>
              <Route exact path="/projects">
                <ProtectedRoute>
                  <ProjectsListNew />
                </ProtectedRoute>
              </Route>
              <Route exact path="/projects-new">
                <ProtectedRoute>
                  <ProjectsListNew />
                </ProtectedRoute>
              </Route>
              <Route exact path="/profile">
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              </Route>
              <Route exact path="/projects-old">
                <ProtectedRoute>
                  <ProjectsList />
                </ProtectedRoute>
              </Route>
              <Route exact path="/projects/create">
                <ProtectedRoute>
                  <CreateProject />
                </ProtectedRoute>
              </Route>
              <Route exact path="/projects/create-new">
                <ProtectedRoute>
                  <CreateProjectForm />
                </ProtectedRoute>
              </Route>
              <Route exact path="/">
                <Redirect to="/dashboard" />
              </Route>
              <Route path="*">
                <Redirect to="/dashboard" />
              </Route>
            </Switch>
            </Router>
          </ToastProvider>
        </AuthProvider>
      </FrappeProvider>
    </ThemeProvider>
  );
}

export default App;
