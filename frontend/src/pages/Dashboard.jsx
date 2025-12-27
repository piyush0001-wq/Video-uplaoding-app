import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { token, role } = useContext(AuthContext);
  const [videos, setVideos] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:5000/api/videos", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => Array.isArray(data) && setVideos(data))
      .catch(err => console.error("Failed to fetch videos:", err));
  }, [token]);

  const deleteVideo = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    try {
      setDeletingId(id);

      const res = await fetch(`http://localhost:5000/api/videos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setVideos(prev => prev.filter(v => v._id !== id));
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete video");
      }
    } catch {
      alert("Server error while deleting");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen px-6 py-8 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-[#0f172a] dark:via-[#020617] dark:to-[#0f172a] transition-colors">

      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        🎥 Your Videos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map(v => (
          <div
            key={v._id}
            className="group bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-gray-200/60 dark:border-white/10 p-4 transition-all hover:shadow-xl hover:-translate-y-1"
          >
            {/* VIDEO */}
            <div className="relative rounded-xl overflow-hidden mb-4 bg-black">
              <video controls className="w-full h-48 object-cover">
                <source
                  src={`http://localhost:5000/api/videos/stream/${v._id}?token=${token}`}
                  type="video/mp4"
                />
              </video>

              {/* ADMIN DELETE BUTTON */}
              {role === "admin" && (
                <button
                  onClick={() => deleteVideo(v._id)}
                  disabled={deletingId === v._id}
                  className="absolute top-2 right-2 bg-red-600/90 hover:bg-red-700 text-white text-xs px-3 py-1 rounded-full shadow-lg transition"
                >
                  {deletingId === v._id ? "Deleting..." : "Delete"}
                </button>
              )}
            </div>

            {/* TITLE */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
              {v.title}
            </h3>

            {/* META */}
            <div className="flex items-center justify-between mt-3">
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full tracking-wide
                ${v.status === "safe"
                  ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                  : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                }`}
              >
                {v.status.toUpperCase()}
              </span>

              <span className="text-xs text-gray-500 dark:text-gray-400">
                MP4 • Streaming Ready
              </span>
            </div>
          </div>
        ))}
      </div>

      {videos.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-500 dark:text-gray-400">
          <p className="text-lg">No videos uploaded yet</p>
          <p className="text-sm mt-1">Upload a video to get started</p>
        </div>
      )}
    </div>
  );
}
