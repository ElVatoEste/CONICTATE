import { getServerSession } from "next-auth";
import { authOptions } from "@/Auth";
import { redirect } from "next/navigation";
import DashboardClient from "@/components/Dashboard/DashboardClient";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signup");

  const userName = session.user?.name || "Usuario";
  const role = session.user?.role || "user";
  console.log("📦 Session user role:", session.user?.role);

  return (
    <main className="flex-grow p-8 min-h-screen flex flex-col">1
      <DashboardClient defaultRole={role} userName={userName} />
    </main>
  );
};

export default DashboardPage;
