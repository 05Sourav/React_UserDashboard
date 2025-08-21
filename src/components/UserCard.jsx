import { Link } from "react-router-dom";

export default function UserCard({ user }) {
  const { id, name, email, phone, company } = user;
  return (
    <div
      className="bg-white border rounded-2xl p-4 shadow-sm transition-all duration-200
                 hover:shadow-lg hover:border-blue-400 hover:scale-[1.03] cursor-pointer flex flex-col items-center"
      onClick={() => (window.location.href = `/users/${id}`)}
    >
      {/* Profile Icon */}
      <div className="w-14 h-14 mb-3 rounded-full bg-blue-100 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-blue-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="8" r="4" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 20c0-3.333 3.333-6 8-6s8 2.667 8 6"
          />
        </svg>
      </div>
      <h2 className="text-lg font-semibold mb-1">{name}</h2>
      <div className="text-sm text-gray-600 mb-1">{email}</div>
      <div className="text-sm text-gray-600 mb-1">{phone}</div>
      <div className="text-sm text-gray-500">{company?.name || "N/A"}</div>
    </div>
  );
}
