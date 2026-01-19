import { useState } from "react";
import { signup } from "../services/auth.service";
import type { Role } from "../types/types";
import { useNavigate } from "react-router-dom";

type Props = {
  role: Role;
  onBack: () => void;
};

export default function SignupCard({ role, onBack }: Props) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); 
  };

  const validateForm = () => {
    const { name, email, password, address } = formData;
    if (name.length < 20 || name.length > 60) {
      return "Name must be between 20 and 60 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,16}$/;

    if (!passwordRegex.test(password)) {
      return "Password must be 8–16 characters, include one uppercase letter and one special character";
    }

    if (role === "USER") {
      if (!address) {
        return "Address is required";
      }
      if (address.length > 400) {
        return "Address cannot exceed 400 characters";
      }
    }

    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await signup(formData, role);
      alert("Signup successful");
      navigate("/login");
    } catch (err: any) {
      alert(err.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-105">
        <button
          onClick={onBack}
          className="text-sm text-blue-600 mb-4"
        >
          ← Change role
        </button>

        <h2 className="text-2xl font-bold mb-6">
          Signup as {role}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-2"
          />

          {role === "USER" && (
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full border rounded-lg px-4 py-2"
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}