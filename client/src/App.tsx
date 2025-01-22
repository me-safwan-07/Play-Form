import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import AppRouter from './routes';
import { TEnvironment } from './types/environment';
import { getEnvironments } from './api/environment';

const queryClient = new QueryClient();

const App: React.FC = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [environment, setEnvironment] = useState<TEnvironment | null>(null);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const session = localStorage.getItem('token');

  //   if (!session) {
  //     // navigate('/auth/login');
  //     // setIsLoading(false);
  //     return;
  //   }

  //   const fetchEnvironment = async () => {
  //     try {
  //       const environments = await getEnvironments(session);
  //       const env = environments.length > 0 ? environments[0] : null;
  //       setEnvironment(env);

  //       // if (env) {
  //       //   navigate(`/environment/${env.id}/`);
  //       // } else {
  //       //   navigate('/auth/login');
  //       // }
  //     } catch (error) {
  //       console.error(`Error getting environment: ${error}`);
  //       // navigate('/auth/login');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchEnvironment();
  // }, [navigate]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    // <QueryClientProvider client={queryClient}>
      <AppRouter />
    // </QueryClientProvider>

  );
};

export default App;
