import React from 'react';
import { useAuth } from '@/context/AuthContext'; // Contexto de autenticação
import AuthErrorPage from '@/components/AuthErrorPage'; // Componente de erro de autenticação

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  if (!user) {
    // Renderiza a página de erro de autenticação
    return <AuthErrorPage />;
  }

  // Renderiza o conteúdo da rota protegida
  return <>{children}</>;
};

export default RequireAuth;
