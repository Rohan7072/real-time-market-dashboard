export const connectWebSocket = (token, onMessage, onDisconnect) => {
  console.log("🌐 Creating WebSocket connection");

  const ws = new WebSocket(
    `ws://localhost:8082/stream?token=${token}`
  );

  ws.onopen = () => {
    console.log("✅ WebSocket connected");
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch (err) {
      console.error("❌ WS message parse error", err);
    }
  };

  ws.onerror = () => {
    console.error("❌ WebSocket error");
    onDisconnect();
  };

  ws.onclose = () => {
    console.warn("❌ WebSocket closed");
    onDisconnect();
  };

  return ws;
};
