import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { token, logout, role } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/10 dark:bg-black/20 backdrop-blur-xl border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* LOGO */}
        <a
          href="/"
          className="text-2xl font-extrabold tracking-wide text-white"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          🎬 Video<span className="text-blue-400">Sense</span>
        </a>
      <p>Role is {role}</p>
        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-200">
          {token ? (
            <>
              <a className="hover:text-white transition" href="/dashboard">Dashboard</a>
              <a className="hover:text-white transition" href="/upload">Upload</a>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-xl border border-white/30 hover:bg-white/10 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a className="hover:text-white transition" href="/login">Login</a>
              <a
                href="/register"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white shadow-md"
              >
                Get Started
              </a>
            </>
          )}
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-2xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6">
          <div className="bg-white/10 dark:bg-black/30 backdrop-blur-xl rounded-2xl border border-white/20 p-5 space-y-4 text-gray-200">
            {token ? (
              <>
                <a href="/" className="block hover:text-white">Dashboard</a>
                <a href="/upload" className="block hover:text-white">Upload</a>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 rounded-xl border border-white/30 hover:bg-white/10"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="block hover:text-white">Login</a>
                <a
                  href="/register"
                  className="block text-center px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Get Started
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
