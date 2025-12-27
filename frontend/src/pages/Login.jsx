import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // ONLY login if API success
      if (res.status === 200) {
        login(data.token, data.user.role);
        
        window.location.href = "/";
       
        
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-6">

      {/* GLASS CARD */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-10 shadow-2xl">

        <h2 className="text-3xl font-extrabold text-white text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-300 text-center mb-8 text-sm">
          Login to continue to VideoSense
        </p>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
            {error}
          </div>
        )}

        {/* EMAIL */}
        <div className="mb-5">
          <label className="block text-sm text-gray-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="block text-sm text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={submit}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold transition shadow-lg hover:shadow-xl"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* FOOTER */}
        <p className="mt-6 text-sm text-gray-300 text-center">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-blue-400 hover:text-blue-300 font-medium transition"
          >
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}
