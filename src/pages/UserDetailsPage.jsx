import { useParams, Link } from "react-router-dom";
import { useUsers } from "../context/UserContext.jsx";
import { fetchUserById } from "../api/users.js";
import { useEffect, useState } from "react";

export default function UserDetailsPage() {
  const { id } = useParams();
  const { users } = useUsers();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const localUser = users.find(u => String(u.id) === String(id));
    if (localUser) {
      setUser(localUser);
      setLoading(false);
      setError(null);
    } else {
      setLoading(true);
      fetchUserById(id)
        .then(data => {
          setUser(data);
          setError(null);
        })
        .catch(() => setError("Failed to load"))
        .finally(() => setLoading(false));
    }
  }, [id, users]);

  if (loading) return <div className="p-4">Loading…</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!user) return (
    <div className="p-4">
      <p>User not found.</p>
      <Link to="/" className="underline">Back</Link>
    </div>
  );

  const { address = {}, company = {}, email = "", phone = "", website = "" } = user || {};
  const { street = "", suite = "", city = "", zipcode = "", geo = {} } = address;
  const { lat = "", lng = "" } = geo;

  const mapLink = lat && lng
    ? `https://maps.google.com/?q=${lat},${lng}`
    : null;

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <div className="w-full max-w-md bg-white border rounded-2xl p-6 shadow-lg flex flex-col items-center">
        {/* Profile Icon */}
        <div className="w-20 h-20 mb-4 rounded-full bg-blue-100 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-blue-400"
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
        <h1 className="text-2xl font-semibold mb-2 text-center">{user.name || "No Name"}</h1>
        <div className="mt-2 grid gap-2 text-sm w-full">
          <div><span className="font-medium">Email:</span> {email || "N/A"}</div>
          <div><span className="font-medium">Phone:</span> {phone || "N/A"}</div>
          <div><span className="font-medium">Company:</span> {company?.name || "N/A"}</div>
          <div><span className="font-medium">Website:</span> {website || "N/A"}</div>
          <div>
            <span className="font-medium">Address:</span>{" "}
            {[street, suite, city, zipcode].filter(Boolean).join(", ") || "N/A"}
          </div>
          <div>
            <span className="font-medium">Geo:</span>{" "}
            {lat && lng ? `${lat}, ${lng}` : "N/A"}
            {mapLink && (
              <a className="ml-2 underline text-blue-600" href={mapLink} target="_blank" rel="noreferrer">
                View on Map
              </a>
            )}
          </div>
        </div>
        <Link to="/" className="mt-6 underline text-blue-600">← Back to Dashboard</Link>
      </div>
    </div>
  );
}