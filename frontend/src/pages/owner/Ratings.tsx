import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Rating {
  id: number;
  value: number;
  user: User;
}

interface Store {
  id: number;
  storeName: string;
  storeAddress: string;
}

export default function Ratings() {
  const [store, setStore] = useState<Store | null>(null);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalRatings, setTotalRatings] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const token = localStorage.getItem("Authorization");

        const res = await axios.get(
          "http://localhost:3000/api/v1/storeOwner/ratings",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        setStore(res.data.store);
        setRatings(res.data.ratings);
        setAverageRating(res.data.averageRating);
        setTotalRatings(res.data.totalRatings);
      } catch (error) {
        console.error("Failed to fetch ratings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  

  if (loading) {
    return <div className="p-6 text-gray-600">Loading ratings...</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          {store?.storeName}
        </h1>
        <p className="text-gray-500">{store?.storeAddress}</p>

        <div className="flex gap-6 mt-4">
          <div>
            <p className="text-sm text-gray-500">Average Rating</p>
            <p className="text-xl font-bold text-yellow-500">
              ⭐ {averageRating}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Ratings</p>
            <p className="text-xl font-bold">{totalRatings}</p>
          </div>
        </div>
      </div>


      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">
                User
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">
                Email
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">
                Rating
              </th>
            </tr>
          </thead>
          <tbody>
            {ratings.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-6 text-center text-gray-500"
                >
                  No ratings yet
                </td>
              </tr>
            ) : (
              ratings.map((rating) => (
                <tr
                  key={rating.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{rating.user.name}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {rating.user.email}
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    ⭐ {rating.value}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}