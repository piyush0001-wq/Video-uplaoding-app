import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { token } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-6 py-20">
      <div className="max-w-6xl mx-auto">

        {/* MAIN HEADER BOX */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-10 shadow-lg max-w-4xl">

          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Intelligent Video Processing Platform
          </h1>

          <p className="text-gray-300 text-lg max-w-2xl">
            Upload videos, analyze content sensitivity, and stream securely with
            real-time updates using AI-powered moderation.
          </p>

          {/* CTA */}
          {!token && (
            <div className="mt-8 flex gap-4">
              <a
                href="/login"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold shadow-md"
              >
                Get Started
              </a>
              <a
                href="/register"
                className="px-6 py-3 rounded-xl border border-white/30 hover:bg-white/10 transition font-semibold"
              >
                Create Account
              </a>
            </div>
          )}
        </div>

        {/* PUBLIC / LOGGED-IN CONTENT */}
        {!token ? (
          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {[
              {
                title: "AI Content Analysis",
                desc: "Automatically detect sensitive or unsafe video content using AI."
              },
              {
                title: "Secure Video Streaming",
                desc: "Token-based protected streaming with role-based access control."
              },
              {
                title: "Admin Moderation",
                desc: "Admins can manage, review, and delete videos securely."
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-14 bg-green-500/10 border border-green-500/30 rounded-xl p-6 max-w-3xl">
            <p className="text-green-400 font-medium mb-5">
              ✅ You are logged in. Go to the Dashboard to manage and stream your videos.
            </p>
            <a
              href="/dashboard"
              className="px-5 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm font-semibold
               hover:bg-white/20 transition shadow-sm backdrop-blur-md"
            >
              Open Dashboard →
            </a>

          </div>

        )}

      </div>
    </div>
  );
}
