import { useEffect, useRef, useState } from "react";
import { connectWebSocket } from "../services/websocket";
import { useAuth } from "../context/AuthContext";
import SubscribeForm from "../components/SubscribeForm";
import MarketTable from "../components/MarketTable";

export default function Dashboard() {
  const [marketData, setMarketData] = useState({});
  const [wsDisconnected, setWsDisconnected] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  const wsRef = useRef(null);
  const { logout } = useAuth();

  // WebSocket connection
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token || wsRef.current) return;

    wsRef.current = connectWebSocket(
      token,
      (msg) => {
        if (!msg?.instrumentName) return;
        setWsDisconnected(false);

        setMarketData((prev) => ({
          ...prev,
          [msg.instrumentName]: msg,
        }));
      },
      () => setWsDisconnected(true)
    );

    return () => {
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, []);

  // Header shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Clock update
  useEffect(() => {
    const t = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 60000);
    return () => clearInterval(t);
  }, []);

  const handleLogout = () => {
    wsRef.current?.close();
    logout();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* Header */}
      <header
        className={`sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200 ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">

          {/* Left */}
          <div className="flex items-center gap-6">
            <span className="text-sm font-semibold tracking-wide">
              Market Dashboard
            </span>

            <div
              className={`flex items-center gap-2 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                wsDisconnected
                  ? "bg-red-50 text-red-600"
                  : "bg-green-50 text-green-700"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  wsDisconnected ? "bg-red-500" : "bg-green-500"
                }`}
              />
              {wsDisconnected ? "Disconnected" : "Live Feed"}
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-6 text-xs text-slate-600">
            <span className="text-slate-500">{time}</span>

            <button
              onClick={() => window.print()}
              className="hover:text-slate-900 transition"
            >
              Print
            </button>

            <div className="h-4 w-px bg-gray-300" />

            <button
              onClick={handleLogout}
              className="hover:text-red-600 transition font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {wsDisconnected && (
          <div className="rounded-md bg-yellow-50 border border-yellow-200 px-4 py-2 text-sm text-yellow-700">
            Connection lost. Reconnecting…
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Subscribe */}
          <section className="lg:col-span-1 bg-white border border-gray-200 rounded-lg p-4">
            <h2 className="text-sm font-medium mb-3">
              Subscribe Instrument
            </h2>

            <SubscribeForm
              onSubscribed={(instrument) => {
                setMarketData((prev) => ({
                  ...prev,
                  [instrument]: {
                    instrumentName: instrument,
                    _pending: true,
                  },
                }));
              }}
            />
          </section>

          {/* Market Table */}
          <section className="lg:col-span-3 bg-white border border-gray-200 rounded-lg p-4 overflow-x-auto">
            <h2 className="text-sm font-medium mb-3">
              Live Market Data
            </h2>

            <MarketTable data={marketData} />
          </section>
        </div>
      </main>
    </div>
  );
}
