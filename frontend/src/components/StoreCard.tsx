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
  
interface StoreCardProps {
    store: Store;
}

export default function StoreCard({ store }: StoreCardProps) {
    return (
      <div className="rounded-xl p-8 w-80 shadow-sm hover:shadow-md transition bg-white">
        <div className="flex">
            <h2 className="text-xl font-semibold text-amber-900">
                Name : 
            </h2>
            <p className="font-semibold px-1 text-indigo-700 text-lg">{store.storeName}</p>
        </div>
       <div className="flex">
            <h2 className="text-xl font-semibold text-amber-900">
                Address : 
            </h2>
            <p className="font-semibold text-indigo-700 px-1 text-lg">{store.storeAddress}</p>
       </div>
  
        <div className="mt-2 flex items-center gap-2">
          <span className="text-amber-900">⭐</span>
         <div className="flex">
            <span className="text-amber-900">Average Rating : </span>
            <p className="px-2 text-indigo-700">{store.avgRating.toFixed(1)}</p>
         </div>
        </div>
        <span className="text-red-200 text-sm">
            ({store.ratings.length} reviews)
          </span>
      </div>
    );
}