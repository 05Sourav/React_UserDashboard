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
    // Try to find user in local state first
    const localUser = users.find(u => String(u.id) === String(id));
    if (localUser) {
      setUser(localUser);
      setLoading(false);
      setError(null);
    } else {
      // Fallback: fetch from API
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
    <div className="container mx-auto p-4">
      <Link to="/" className="underline">← Back to Dashboard</Link>
      <h1 className="text-2xl font-semibold mt-2">{user.name || "No Name"}</h1>

      <div className="mt-3 grid gap-1 text-sm">
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
            <a className="ml-2 underline" href={mapLink} target="_blank" rel="noreferrer">
              View on Map
            </a>
          )}
        </div>
      </div>
    </div>
  );
}