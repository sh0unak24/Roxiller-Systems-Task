import { useState } from "react";
import OwnerAppBar from "../../components/OwnerAppBar";
import { UpdatePassword } from "../../components/UpdatePassword";

export default function OwnerDashboard() {
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">

      <OwnerAppBar
        onChangePassword={() => setShowUpdatePassword(true)}
      />


      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-700">
          Welcome to your dashboard
        </h2>
      </div>

      {showUpdatePassword && (
        <UpdatePassword onClose={() => setShowUpdatePassword(false)} />
      )}
    </div>
  );
}