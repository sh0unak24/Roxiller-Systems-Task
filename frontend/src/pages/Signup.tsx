import { useState } from "react";
import RoleSelector from "../components/RoleSelector";
import SignupCard from "../components/SignupCard";
import type { Role } from "../types/types";


export default function Signup() {
  const [role, setRole] = useState<Role | null>(null);

  if (!role) {
    return <RoleSelector onSelect={setRole} />;
  }

  return (
    <SignupCard
      role={role}
      onBack={() => setRole(null)}
    />
  );
}