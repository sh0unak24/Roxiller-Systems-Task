import { useState } from "react";
import axios from "axios";

interface UpdatePasswordProps {
  onClose: () => void;
}

export function UpdatePassword({ onClose }: UpdatePasswordProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validatePassword = () => {
    if (!currentPassword || !newPassword) {
      return "All fields are required";
    }

    if (currentPassword === newPassword) {
      return "New password must be different from current password";
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,16}$/;

    if (!passwordRegex.test(newPassword)) {
      return "Password must be 8–16 characters, include one uppercase letter and one special character";
    }

    return "";
  };

  const handleUpdatePassword = async () => {
    setError("");

    const validationError = validatePassword();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:3000/api/v1/user/update/password",
        {
          oldPassword: currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      );

      alert("Password updated successfully");

      localStorage.removeItem("Authorization");
      localStorage.removeItem("role");
      onClose();
      window.location.href = "/login";
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Failed to update password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Change Password</h2>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <input
          type="password"
          placeholder="Current password"
          className="border p-2 w-full mb-3 rounded"
          value={currentPassword}
          onChange={(e) => {
            setCurrentPassword(e.target.value);
            setError("");
          }}
        />

        <input
          type="password"
          placeholder="New password"
          className="border p-2 w-full mb-4 rounded"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setError("");
          }}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdatePassword}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}