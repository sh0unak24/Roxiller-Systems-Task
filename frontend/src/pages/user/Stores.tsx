
/*
Store listings should display:
○ Store Name
○ Address
○ Overall Rating
○ User's Submitted Rating
○ Option to submit a rating
○ Option to modify their submitted rating
Can submit ratings (between 1 to 5) for individual stores.
*/

import axios from "axios";
import { useEffect, useState } from "react";
import StoreCard from "../../components/StoreCard";

interface Rating {
    value: number;
}
  
interface Store {
    id: number;
    storeName: string;
    storeAddress: string;
    avgRating: number;
    ratings: Rating[];
}
export default function Stores() {

    const [stores , setStores] = useState<Store[]>([])
    const [loading, setLoading] = useState(true);

    async function getStores() {
        try {
          setLoading(true);
          const token = localStorage.getItem("Authorization");
      
          const res = await axios.get(
            "http://localhost:3000/api/v1/store",
            {
              headers: {
                Authorization: token,
              },
            }
          );
          console.log("Stores" + stores)
          setStores(res.data.stores);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
      useEffect(() => {
        getStores()
      })

      return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex justify-center items-center p-30">
                <div className="space-y-6">
                    {stores.map((store) => (
                        <StoreCard store={store} />
                    ))}
                </div>
          </div>
          <div></div>
      </div>
      )
}