import { useEffect, useMemo, useState } from "react";
import { useUsers, useUsersDispatch } from "../context/UserContext.jsx";
import useDebouncedValue from "../hooks/useDebouncedValue.js";
import CreateUserForm from "../components/CreateUserForm.jsx";
import UserCard from "../components/UserCard.jsx";

function DashboardPage() {
  const { users, query, loading, error } = useUsers();
  const dispatch = useUsersDispatch();
  const [localQuery, setLocalQuery] = useState(query);
  const debounced = useDebouncedValue(localQuery);

  useEffect(() => {
    dispatch({ type: "SET_QUERY", payload: debounced });
  }, [debounced, dispatch]);

  const filtered = useMemo(
    () =>
      (users || []).filter((u) =>
        u.name.toLowerCase().includes(query.toLowerCase())
      ),
    [users, query]
  );

  return (
    <div className="container mx-auto p-4">
      <header className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">Search or add a new user</p>
        </div>
        <input
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder="Search by name"
          className="border rounded-xl px-3 py-2 w-full sm:w-72"
        />
      </header>

      <div className="mb-6">
        <div className="bg-white border rounded-2xl p-6 shadow-sm w-full">
          <CreateUserForm />
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-4 mt-8">Existing Users</h2>

      {loading && (
        <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-28 border rounded-2xl p-4 bg-white animate-pulse"
            />
          ))}
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 border rounded-xl bg-red-50 text-red-700 flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={() => window.location.reload()}
            className="px-3 py-1 border rounded-lg hover:bg-red-100"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <section className="grid gap-4 mt-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((u) => (
            <UserCard key={u.id} user={u} />
          ))}
        </section>
      )}
    </div>
  );
}

export default DashboardPage;