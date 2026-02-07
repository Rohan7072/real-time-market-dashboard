export default function MarketRow({ data, onUnsubscribe }) {
  const {
    instrumentName,
    lastTradedPrice,
    lastTradedQuantity,
    lastTradedDateTime,
    high,
    low,
    changeType,
    _pending,
  } = data;

  const priceColor =
    changeType === "UP"
      ? "text-green-600"
      : changeType === "DOWN"
      ? "text-red-600"
      : "text-gray-800";

  const rowFlash =
    changeType === "UP"
      ? "price-up"
      : changeType === "DOWN"
      ? "price-down"
      : "";

  return (
    <tr className={`hover:bg-gray-50 transition-colors ${rowFlash}`}>

      {/* Instrument */}
      <td className="px-3 py-2 font-medium text-left whitespace-nowrap">
        {instrumentName}
      </td>

      {/* LTP */}
      <td className={`px-3 py-2 text-right tabular-nums font-semibold ${priceColor}`}>
        {!_pending && changeType === "UP" && (
          <svg
            className="inline-block w-3 h-3 mr-1 text-green-600 align-middle"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 3l-6 6h4v8h4V9h4l-6-6z" />
          </svg>
        )}

        {!_pending && changeType === "DOWN" && (
          <svg
            className="inline-block w-3 h-3 mr-1 text-red-600 align-middle"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 17l6-6h-4V3h-4v8H4l6 6z" />
          </svg>
        )}

        {_pending || lastTradedPrice == null
          ? "--"
          : lastTradedPrice.toFixed(2)}
      </td>

      {/* LTQ */}
      <td className="px-3 py-2 text-right tabular-nums">
        {_pending ? "--" : lastTradedQuantity}
      </td>

      {/* LTD */}
      <td className="px-3 py-2 text-left text-xs text-gray-700 whitespace-nowrap">
        {_pending || !lastTradedDateTime
          ? "--"
          : new Date(lastTradedDateTime).toLocaleTimeString()}
      </td>

      {/* Day High */}
      <td className="px-3 py-2 text-right tabular-nums text-green-600">
        {_pending ? "--" : high}
      </td>

      {/* Day Low */}
      <td className="px-3 py-2 text-right tabular-nums text-red-600">
        {_pending ? "--" : low}
      </td>

      {/* Action */}
      <td className="px-3 py-2 text-right">
        <button
          onClick={() => onUnsubscribe(instrumentName)}
          className="text-xs text-gray-700 hover:text-red-600 transition"
        >
          Remove
        </button>
      </td>
    </tr>
  );
}
