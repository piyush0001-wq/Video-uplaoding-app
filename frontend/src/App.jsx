import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Footer from "./components/Footer";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}


<div className="min-h-screen w-full relative">
  {/* Dark Horizon Glow */}
  <div
    className="absolute inset-0 z-0"
    style={{
      background: "radial-gradient(125% 125% at 50% 10%, #000000 40%, #0d1a36 100%)",
    }}
  />
  {/* Your Content/Components */}
</div>