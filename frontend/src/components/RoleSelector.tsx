export default function RoleSelector({ onSelect } : any) {
    const roles = [
      { id: "USER", label: "User", desc: "Browse & order products" },
      { id: "OWNER", label: "Store Owner", desc: "Manage your store" },
      { id: "ADMIN", label: "Admin", desc: "Platform control" },
    ];
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="bg-white p-8 rounded-xl shadow-lg w-105">
          <h2 className="text-2xl font-bold text-center mb-6">
            Select Your Role
          </h2>
  
          <div className="space-y-4">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => onSelect(role.id)}
                className="w-full border rounded-lg p-4 text-left hover:border-blue-500 hover:bg-blue-50 transition"
              >
                <p className="text-lg font-semibold">{role.label}</p>
                <p className="text-sm text-gray-500">{role.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }