'use client';
import { useState } from "react";
import { ContractorDashboard } from "./ContractorDashboard";
import { EmployDashboard } from "./EmployDashboard";
import RoleUpdater from "../RoleUpdater";

interface Props {
  defaultRole: string;
  userName: string;
}

const DashboardClient: React.FC<Props> = ({ defaultRole, userName }) => {
  const [role, setRole] = useState(defaultRole);

  return (
    <>
      <RoleUpdater sessionRole={defaultRole} onRoleOverride={setRole} />
      {role === "contractor" ? (
        <ContractorDashboard userName={userName} />
      ) : (
        <EmployDashboard userName={userName} />
      )}
    </>
  );
};

export default DashboardClient;
