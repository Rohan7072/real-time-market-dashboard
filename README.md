# Real-Time Market Data Dashboard

A full-stack real-time web application that allows authenticated users to subscribe to financial instruments and view live market data updates using REST APIs, WebSockets, JWT authentication, and Redis.

---

## 🚀 Features

### Backend
- JWT-based authentication (hardcoded credentials)
- Secure REST APIs
- Real-time market data streaming using WebSockets
- Redis (Docker) for persistent user subscriptions
- Mock market data simulation (price, quantity, high/low)
- Proper error handling and CORS configuration

### Frontend
- Login & Dashboard views
- Subscribe / Unsubscribe instruments
- Real-time market data grid
- Dynamic price color indication (Green / Red / Gray)
- Print functionality for market data
- Clean and minimal UI (assignment-aligned)

---

## 🧱 Tech Stack

### Backend
- Node.js
- Express.js
- JWT (jsonwebtoken)
- WebSocket (`ws`)
- Redis
- Docker

### Frontend
- React (Vite)
- Tailwind CSS
- WebSocket (native browser API)

---

## 📂 Project Structure

    Real-Time Market Data Dashboard/
    │
    ├── backend/
    │ ├── src/
    │ │ ├── config/ # env, jwt, redis config
    │ │ ├── controllers/ # auth & instrument controllers
    │ │ ├── middlewares/ # auth, validation, error handler
    │ │ ├── repositories/ # Redis subscription logic
    │ │ ├── routes/ # API routes
    │ │ ├── services/ # market data generator
    │ │ ├── websocket/ # WebSocket server
    │ │ ├── app.js
    │ │ └── server.js
    │ ├── docker-compose.yml
    │ └── package.json
    │
    ├── frontend/
    │ ├── src/
    │ │ ├── api/ # REST API calls
    │ │ ├── components/ # UI components
    │ │ ├── context/ # Auth context
    │ │ ├── pages/ # Login & Dashboard
    │ │ ├── services/ # token & websocket service
    │ │ ├── index.css
    │ │ └── main.jsx
    │ └── package.json
    │
    └── README.md


---

## 🔐 Authentication Details

For this assignment, authentication is implemented using **hardcoded credentials**:

Username: demo
Password: password


On successful login, a JWT access token is returned and used for:
- Protected REST APIs
- WebSocket authentication

---

## 🛠️ Backend Setup

### 1️⃣ Prerequisites
- Node.js (v18+ recommended)
- Docker & Docker Desktop

---

### 2️⃣ Start Redis using Docker

Navigate to backend folder:

```bash
cd backend
Run Redis container:

docker-compose up -d
Verify Redis is running:

docker ps
3️⃣ Environment Variables
Create .env file inside backend/:

PORT=8082
JWT_SECRET=ACCESS_SECRET
JWT_REFRESH_SECRET=REFRESH_SECRET
4️⃣ Install Backend Dependencies
npm install
5️⃣ Start Backend Server
npm start
Backend will run on:

http://localhost:8082
🌐 Backend API Endpoints
🔑 Login
POST /api/auth/login
Body:
{
  "username": "demo",
  "password": "password"
}
📈 Subscribe Instrument (Protected)
POST /api/instruments/subscribe
Headers:
Authorization: Bearer <JWT_TOKEN>

Body:
{
  "instrumentName": "AAPL"
}
📉 Unsubscribe Instrument (Protected)
POST /api/instruments/unsubscribe
Headers:
Authorization: Bearer <JWT_TOKEN>

Body:
{
  "instrumentName": "AAPL"
}
🔄 WebSocket Stream
ws://localhost:8082/stream?token=<JWT_TOKEN>
Streams market data only for subscribed instruments.

📊 Market Data Format
{
  "instrumentName": "AAPL",
  "lastTradedPrice": 150.25,
  "lastTradedQuantity": 100,
  "lastTradedDateTime": "2023-10-05T14:30:00Z",
  "high": 151.80,
  "low": 149.50
}
🎨 Frontend Setup
1️⃣ Navigate to frontend
cd frontend
2️⃣ Install Dependencies
npm install
3️⃣ Start Frontend Dev Server
npm run dev
Frontend will run on:

http://localhost:5173
🖥️ Application Flow
Open frontend in browser

Login using demo credentials

Redirect to Dashboard

Subscribe instruments (e.g. AAPL, TSLA)

View real-time market updates

Observe LTP color changes:

Green → Price Increased

Red → Price Decreased

Gray → No Change

Unsubscribe instruments

Print market data using Print button

🖨️ Print Feature
Prints complete market data table

Buttons & inputs are hidden in print mode

Uses native browser print (window.print())

🔐 Security Notes
JWT validation applied to:

All protected REST APIs

WebSocket connections

Subscriptions stored in Redis per user

CORS configured on backend

No sensitive data exposed on frontend

🧪 Redis Verification (Optional)
Access Redis CLI:

docker exec -it market-redis redis-cli
Check subscriptions:

KEYS *
SMEMBERS subs:<userId>
