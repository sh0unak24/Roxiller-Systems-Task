import { useEffect, useState } from "react";
import axios from "axios";
import AdminAppBar from "../../components/AdminAppbar";
import { UpdatePassword } from "../../components/UpdatePassword";
import AddUser  from "../../components/AddUser";

interface DashboardStats {
  totalUsers: number;
  totalStoreOwners: number;
  totalStores: number;
  totalAdmins: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem("Authorization");

        const res = await axios.get(
          "http://localhost:3000/api/v1/systemAdministrator/dashboard",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        setStats(res.data.data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Loading dashboard...
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Failed to load dashboard
      </div>
    );
  }

  return (
    <div className="p-6">
      
      <AdminAppBar
        onChangePassword={() => setShowUpdatePassword(true)}
        onAddUser={() => setShowAddUser(true)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
        <DashboardCard title="Total Users" value={stats.totalUsers} />
        <DashboardCard title="Store Owners" value={stats.totalStoreOwners} />
        <DashboardCard title="Total Stores" value={stats.totalStores} />
        <DashboardCard title="Admins" value={stats.totalAdmins} />
      </div>
        {showUpdatePassword && (
            <UpdatePassword onClose={() => setShowUpdatePassword(false)} />
          )}

        {showAddUser && (
          <AddUser onClose={() => setShowAddUser(false)} />
        )}
    </div>
    
  );
}

function DashboardCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}