import { useState } from "react";
import toast from "react-hot-toast";
import { subscribeInstrument } from "../api/instrument.api";
import { getToken } from "../services/token.service";

export default function SubscribeForm({ onSubscribed }) {
  const [instrument, setInstrument] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!instrument.trim()) {
      toast.error("Instrument name required");
      return;
    }

    try {
      setLoading(true);

      await subscribeInstrument(
        { instrumentName: instrument.trim().toUpperCase() },
        getToken()
      );

      toast.success(`${instrument.toUpperCase()} subscribed`);

      if (typeof onSubscribed === "function") {
        onSubscribed(instrument.trim().toUpperCase());
      }

      setInstrument("");
    } catch (err) {
      toast.error("Subscribe failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      
      <input
        value={instrument}
        onChange={(e) => setInstrument(e.target.value)}
        placeholder="Instrument (e.g. AAPL)"
        className="
          w-full
          h-10
          px-3
          text-sm
          border
          border-gray-300
          rounded-md
          focus:outline-none
          focus:ring-1
          focus:ring-blue-600
        "
      />

      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          h-10
          text-sm
          font-medium
          rounded-md
          bg-blue-600
          text-white
          hover:bg-blue-700
          transition
          disabled:opacity-50
        "
      >
        {loading ? "Subscribing..." : "Subscribe"}
      </button>
    </form>
  );
}
