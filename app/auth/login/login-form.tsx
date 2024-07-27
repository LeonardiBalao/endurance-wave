"use client";

import AuthCard from "./auth-card";

interface Inputs {
  email: string;
  password: string;
}

export default function LoginForm() {
  return (
    <AuthCard
      cardTitle="Entre ou cadastre-se"
      showSocials
      description="Bem-vindo"
    />
  );
}
