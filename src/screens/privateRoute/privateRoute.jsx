import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    // Se não estiver autenticado, redireciona para a página de login
    return <Navigate to="/login" />;
  }

  // Se estiver autenticado, permite o acesso às rotas protegidas dentro do Outlet
  return <Outlet />;
}

export default PrivateRoute;
