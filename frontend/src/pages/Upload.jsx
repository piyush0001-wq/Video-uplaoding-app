import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Upload() {
  const { token } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async () => {
    setError("");
    setSuccess("");

    if (!file) {
      setError("Please select a video file");
      return;
    }

    const form = new FormData();
    form.append("video", file);

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/videos/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Upload failed");
      } else {
        setSuccess("🎉 Video upload started successfully!");
        setFile(null);
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
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-10 shadow-2xl">

        {/* HEADER */}
        <h2 className="text-3xl font-extrabold text-white text-center mb-2">
          Upload Video
        </h2>
        <p className="text-gray-300 text-center mb-8 text-sm">
          Upload your video for analysis & streaming
        </p>

        {/* ERROR */}
        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
            {error}
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div className="mb-4 text-sm text-green-400 bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
            {success}
          </div>
        )}

        {/* FILE INPUT */}
        <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-white/30 rounded-xl cursor-pointer hover:border-blue-400 transition bg-white/5">
          <svg
            className="w-10 h-10 text-blue-400 mb-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5V19.5A2.25 2.25 0 005.25 21.75H18.75A2.25 2.25 0 0021 19.5V16.5M12 3V15M12 15L8.25 11.25M12 15L15.75 11.25"
            />
          </svg>

          <p className="text-sm text-gray-300">
            {file ? file.name : "Click to select a video"}
          </p>
          <p className="text-xs text-gray-400 mt-1">MP4, WebM supported</p>

          <input
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        {/* BUTTON */}
        <button
          onClick={submit}
          disabled={loading}
          className="w-full mt-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold transition shadow-lg hover:shadow-xl"
        >
          {loading ? "Uploading..." : "Upload Video"}
        </button>

      </div>
    </div>
  );
}
