import { useEffect } from "react";

interface Props {
  sessionRole: string;
  onRoleOverride: (newRole: string) => void;
}

export default function RoleUpdater({ sessionRole, onRoleOverride }: Props) {
  useEffect(() => {
    const urlRole = localStorage.getItem("signup-role");
    if (urlRole && ["contractor", "employee"].includes(urlRole) && urlRole !== sessionRole) {
      onRoleOverride(urlRole);
      localStorage.removeItem("signup-role");
    }
  }, [sessionRole, onRoleOverride]);

  return null;
}
