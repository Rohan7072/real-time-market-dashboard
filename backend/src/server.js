const http = require("http");
const app = require("./app");
const { port } = require("./config/env.config");
const initSocket = require("./websocket/stream.socket");

const server = http.createServer(app);
initSocket(server)

server.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});
