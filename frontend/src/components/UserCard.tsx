
interface User {
    id: number;
    name: string;
    address: string;
    email : string;
}
  
interface UserCardProps {
    user: User;
}

export default function UserCard({ user }: UserCardProps) {
    return (
      <div className="rounded-xl p-8 w-auto shadow-sm hover:shadow-md transition bg-white">
        <div className="">
            <div className="flex">
                <span className="text-xl font-semibold text-amber-900">Role :</span>
                <p className="font-semibold px-1 text-indigo-700 text-lg">User</p>
            </div>
            
        </div>
        <div className="flex">
            <h2 className="text-xl font-semibold text-amber-900">
                    Name : 
            </h2>
            <p className="font-semibold px-1 text-indigo-700 text-lg">{user.name}</p>
        </div>
       <div className="flex">
            <h2 className="text-xl font-semibold text-amber-900">
                Address :
            </h2>
            <p className="font-semibold text-indigo-700 px-1 text-lg">{user.address}</p>
       </div>
  
      </div>
    );
}