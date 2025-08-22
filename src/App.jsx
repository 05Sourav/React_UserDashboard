import { Routes, Route, NavLink } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import UserDetailsPage from "./pages/UserDetailsPage.jsx";

export default function App() {
  return (
    <UserProvider>
      <div className="min-h-screen flex flex-col">
        <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <NavLink to="/" className="text-xl font-semibold">
              User Dashboard
            </NavLink>
            {/* Profile Icon */}
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-blue-400"
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
          </div>
        </nav>
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/users/:id" element={<UserDetailsPage />} />
          </Routes>
        </main>
        <footer className="border-t text-center text-xs text-gray-500 py-4">
          Built with React + Tailwind
        </footer>
      </div>
    </UserProvider>
  );
}
