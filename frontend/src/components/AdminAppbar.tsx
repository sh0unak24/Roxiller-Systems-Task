import { Link, useLocation, useNavigate } from "react-router-dom";

interface AdminAppBarProps {
  onChangePassword: () => void;
  onAddUser : () => void;
}

export default function AdminAppBar({
  onChangePassword,
  onAddUser
}: AdminAppBarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (!confirm) return;
  
    localStorage.removeItem("Authorization");
    localStorage.removeItem("role");
    navigate("/login", { replace: true });
  };

  return (
    <div className="w-full h-16 bg-white shadow flex items-center justify-between px-8">

      <div className="flex items-center gap-8">
        <h1 className="text-xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <Link
          to="/admin/stores"
          className={`font-medium ${
            location.pathname === "/admin/stores"
              ? "text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          Stores
        </Link>
        <Link
          to="/admin/users"
          className={`font-medium ${
            location.pathname === "/admin/users"
              ? "text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          Users
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onChangePassword}
          className="px-4 py-2 bg-gray-200 hover:bg-red-50 font-semibold rounded-xl"
        >
          Change Password
        </button>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 font-semibold rounded-xl"
        >
          Logout
        </button>
        <button
          onClick={onAddUser}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 font-semibold rounded-xl"
        >
          Add User
        </button>
      </div>
    </div>
  );
}