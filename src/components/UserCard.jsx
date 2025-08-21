import { Link } from "react-router-dom";

export default function UserCard({ user }) {
  return (
    <Link
      to={`/users/${user.id}`}
      className="block border rounded-2xl p-4 bg-white hover:shadow transition"
    >
      <h2 className="font-semibold text-lg">{user.name}</h2>
      <p className="text-sm text-gray-600">{user.email}</p>
      <p className="text-sm text-gray-600">{user.phone}</p>
      <p className="text-sm text-gray-600">{user.company?.name}</p>
    </Link>
  );
}
