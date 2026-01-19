import { Link, useLocation, useNavigate } from "react-router-dom";

interface OwnerAppBarProps {
  onChangePassword: () => void;
}

export default function OwnerAppBar({
  onChangePassword,
}: OwnerAppBarProps) {
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
          Owner Dashboard
        </h1>

        <Link
          to="/owner/ratings"
          className={`font-medium ${
            location.pathname === "/owner/ratings"
              ? "text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          Ratings
        </Link>
      </div>


      <div className="flex items-center gap-4">
        <button
          onClick={onChangePassword}
          className="px-4 py-2 bg-red-100 hover:bg-red-50 font-semibold rounded-xl"
        >
          Change Password
        </button>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 font-semibold rounded-xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
}