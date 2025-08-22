import { useUsersDispatch } from "../context/UserContext.jsx";

export default function CreateUserForm() {
  const dispatch = useUsersDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const user = {
      id: Date.now(),
      name: form.get("name")?.trim(),
      email: form.get("email")?.trim(),
      phone: form.get("phone")?.trim(),
      company: { name: form.get("company")?.trim() },
      website: "",
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: { lat: "", lng: "" },
      },
    };
    dispatch({ type: "ADD_USER", payload: user });
    e.currentTarget.reset();
  }

  return (
    <>
      <h2 className="text-lg font-semibold mb-2">Add User</h2>
      <form onSubmit={handleSubmit} className="mt-4 grid gap-3 sm:grid-cols-2">
        <input
          name="name"
          placeholder="Name"
          required
          className="border rounded-xl px-3 py-2"
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          required
          className="border rounded-xl px-3 py-2"
        />
        <input
          name="phone"
          placeholder="Phone"
          className="border rounded-xl px-3 py-2"
        />
        <input
          name="company"
          placeholder="Company"
          className="border rounded-xl px-3 py-2"
        />
        <button className="sm:col-span-2 bg-black text-white rounded-xl px-4 py-2 hover:opacity-90">
          Create User
        </button>
      </form>
    </>
  );
}
