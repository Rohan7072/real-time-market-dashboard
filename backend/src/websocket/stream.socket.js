const { WebSocketServer } = require("ws");
const jwt = require("jsonwebtoken");
const { accessTokenSecret } = require("../config/jwt.config");
const { getSubscriptions } = require("../repositories/subscription.repository");
const { generateMarketData } = require("../services/market.service");

const initSocket = (server) => {
  const wss = new WebSocketServer({ server, path: "/stream" });

  wss.on("connection", async (ws, req) => {
    try {
      const url = new URL(req.url, "http://localhost");
      const token = url.searchParams.get("token");

      if (!token) {
        ws.close();
        return;
      }

      const decoded = jwt.verify(token, accessTokenSecret);
      const userId = decoded.userId;

      console.log("✅ WS CONNECTED for user:", userId);

      const interval = setInterval(async () => {
        try {
          // 🔁 FETCH LATEST SUBSCRIPTIONS EVERY TIME
          const instruments = await getSubscriptions(userId);

          if (!instruments.length) {
            return;
          }

          instruments.forEach((inst) => {
            const data = generateMarketData(inst);
            ws.send(JSON.stringify(data));
          });
        } catch (err) {
          console.error("WS interval error:", err.message);
        }
      }, 2000);

      ws.on("close", () => {
        console.log("❌ WS CLOSED for user:", userId);
        clearInterval(interval);
      });
    } catch (err) {
      console.error("WS Auth Error:", err.message);
      ws.close();
    }
  });
};

module.exports = initSocket;
