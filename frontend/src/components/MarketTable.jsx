import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import MarketRow from "./MarketRow";
import { unsubscribeInstrument } from "../api/instrument.api";
import { getToken } from "../services/token.service";

const PAGE_SIZE = 10;

export default function MarketTable({ data }) {
  const [rows, setRows] = useState({});
  const [page, setPage] = useState(1);

  const prevPricesRef = useRef({});
  const removedRef = useRef(new Set());

  useEffect(() => {
    const updated = {};

    Object.values(data).forEach((item) => {
      if (removedRef.current.has(item.instrumentName)) return;

      const prev = prevPricesRef.current[item.instrumentName];
      let changeType = "SAME";

      if (prev != null && item.lastTradedPrice != null) {
        if (item.lastTradedPrice > prev) changeType = "UP";
        else if (item.lastTradedPrice < prev) changeType = "DOWN";
      }

      prevPricesRef.current[item.instrumentName] =
        item.lastTradedPrice;

      updated[item.instrumentName] = {
        ...item,
        changeType,
      };
    });

    setRows(updated);
  }, [data]);

  const handleUnsubscribe = async (instrumentName) => {
    removedRef.current.add(instrumentName);

    setRows((prev) => {
      const copy = { ...prev };
      delete copy[instrumentName];
      return copy;
    });

    try {
      await unsubscribeInstrument(
        { instrumentName },
        getToken()
      );
      toast.error(`${instrumentName} removed`);
    } catch {
      toast.error("Unsubscribe failed");
    }
  };

  const list = Object.values(rows);

  if (!list.length) {
    return (
      <div className="py-10 text-center text-sm text-gray-500">
        No instruments subscribed
      </div>
    );
  }

  // 🔹 Pagination logic
  const totalPages = Math.ceil(list.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const paginated = list.slice(start, start + PAGE_SIZE);

  return (
    <div className="space-y-3">

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-md">
        <table className="w-full text-sm border-collapse">

          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-gray-600">
              <th className="px-3 py-2 font-medium text-left">
                Instrument
              </th>
              <th className="px-3 py-2 font-medium text-right tabular-nums">
                LTP
              </th>
              <th className="px-3 py-2 font-medium text-right tabular-nums">
                LTQ
              </th>
              <th className="px-3 py-2 font-medium text-left">
                LTD
              </th>
              <th className="px-3 py-2 font-medium text-right tabular-nums">
                Day High
              </th>
              <th className="px-3 py-2 font-medium text-right tabular-nums">
                Day Low
              </th>
              <th className="px-3 py-2 font-medium text-right">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {paginated.map((item) => (
              <MarketRow
                key={item.instrumentName}
                data={item}
                onUnsubscribe={handleUnsubscribe}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-xs text-slate-600">

          <span>
            Page {page} of {totalPages}
          </span>

          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-2 py-1 border rounded disabled:opacity-40"
            >
              Prev
            </button>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-2 py-1 border rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
