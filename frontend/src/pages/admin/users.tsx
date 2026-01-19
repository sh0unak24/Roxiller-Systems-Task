
import axios from "axios";
import { useEffect, useState } from "react";
import UserCard from "../../components/UserCard";

interface User {
    id: number;
    name: string;
    address: string;
    email : string;
}

export default function AdminUsers() {

    const [users , setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true);

    async function getUsers() {
        try {
          setLoading(true);
          const token = localStorage.getItem("Authorization");
      
          const res = await axios.get(
            "http://localhost:3000/api/v1/systemAdministrator/users",
            {
              headers: {
                Authorization: token,
              },
            }
          );

          setUsers(res.data.users);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
      useEffect(() => {
        getUsers()
      })

      return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex justify-center items-center p-30">
                <div className="space-y-6">
                    {users.map((user) => (
                        <UserCard user={user} />
                    ))}
                </div>
          </div>
          <div></div>
      </div>
      )
}