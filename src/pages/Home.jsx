import { toast } from "sonner";
import useLogout from "../hooks/useLogout";
import { useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";

export default function Home() {
  const { _logout, error, isPending } = useLogout();
  const { user } = useSelector((store) => store.userList);
  const { data } = useCollection("users");

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <header className="w-full md:w-1/4 bg-base-100 shadow-sm flex flex-col items-center p-6">
        <div className="flex flex-col items-center space-y-3">
          <img
            src={user.photoURL}
            alt="avatar"
            className="w-20 h-20 rounded-full shadow-md"
          />
          <h2 className="text-xl font-semibold">{user.displayName}</h2>
        </div>

        <div className="mt-6">
          {!isPending && (
            <button className="btn btn-neutral w-full" onClick={_logout}>
              Log Out
            </button>
          )}
          {isPending && (
            <button className="btn btn-neutral w-full" disabled>
              Loading...
            </button>
          )}
        </div>

        {error && toast.error(error)}
      </header>

      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Users</h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data &&
            data.map((u) => (
              <div
                key={u.uid}
                className="p-4 bg-white rounded-2xl shadow hover:shadow-md transition"
              >
                <h4 className="text-lg font-medium">{u.displayName}</h4>
                <p
                  className={`mt-2 text-sm font-semibold ${
                    u.online ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {u.online ? "Online" : "Offline"}
                </p>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
