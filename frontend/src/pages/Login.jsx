import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { loginApi } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    try {
      setLoading(true);
      const res = await loginApi({ username, password });
      login(res.data.accessToken);
      navigate("/");
    } catch {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1950&q=80)",
      }}
    >
      <div className="absolute inset-0 bg-white/30" />

      <div className="relative z-10 bg-white rounded-xl shadow-lg w-full max-w-sm p-8">
        <h2 className="text-xl font-semibold text-slate-900 text-center">
          Market Dashboard
        </h2>

        <p className="text-sm text-slate-500 text-center mt-1 mb-6">
          Sign in to continue
        </p>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full h-10 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Password with show/hide */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full h-10 px-3 pr-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center text-xs text-slate-500 hover:text-slate-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Login"}
          </button>
        </form>

        <p className="text-xs text-slate-500 text-center mt-6">
          Secure • Real-time • Professional
        </p>
      </div>
    </div>
  );
}
