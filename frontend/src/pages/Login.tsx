import { useState } from "react";
import RoleSelector from "../components/RoleSelector";
import LoginCard from "../components/LoginCard";
import type { Role } from "../types/types";


export default function Login() {
  const [role, setRole] = useState<Role | null>(null);

  // Step 1: Select role
  if (!role) {
    return <RoleSelector onSelect={setRole} />;
  }

  // Step 2: Login form
  return (
    <LoginCard
      role={role}
      onBack={() => setRole(null)}
    />
  );
}