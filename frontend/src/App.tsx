import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserDashboard from "./pages/dashboard/UserDashBoard";
import OwnerDashboard from "./pages/dashboard/OwnerDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import Ratings from "./pages/owner/Ratings";
import Stores from "./pages/user/Stores";
import AdminStores from "./pages/admin/stores";
import AdminUsers from "./pages/admin/users";


function App() {

  // useEffect(() => {
  //   window.location.href = "/signup";
  // })

  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/user/dashboard"
        element={
            <UserDashboard />
        }
      />
      <Route
        path="/owner/dashboard"
        element={
            <OwnerDashboard />
        }
      />

      <Route
        path="/admin/dashboard"
        element={
            <AdminDashboard />
        }
      />
      <Route path="/owner/ratings" element={<Ratings />} />
      <Route path="/user/stores" element={<Stores />} />
      <Route path="/admin/stores" element={<AdminStores />} />
      <Route path="/admin/users" element={<AdminUsers />} />
    </Routes>
    
  );
}

export default App;