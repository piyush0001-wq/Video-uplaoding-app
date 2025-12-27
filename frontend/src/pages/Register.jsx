import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError(""); // reset error
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      //  USER ALREADY EXISTS
      if (!res.ok) {
        setError(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      // SUCCESS
      window.location.href = "/login";

    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-6">

      {/* GLASS CARD */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-10 shadow-2xl">

        {/* HEADER */}
        <h2 className="text-3xl font-extrabold text-white text-center mb-2">
          Create Account
        </h2>
        <p className="text-gray-300 text-center mb-6 text-sm">
          Join VideoSense and start analyzing videos intelligently
        </p>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-5 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
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
            value={email}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={submit}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold transition shadow-lg
            ${loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 hover:shadow-xl"}
            text-white`}
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        {/* FOOTER */}
        <p className="mt-6 text-sm text-gray-300 text-center">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-400 hover:text-blue-300 font-medium transition"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
