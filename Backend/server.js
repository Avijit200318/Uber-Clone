import http from "http";
import app from "./app.js";
import { initializeSocket } from "./socket.js";

const port = process.env.PORT || 3000;

const server = http.createServer(app);

initializeSocket(server);

server.listen(port, () => {
    console.log("server is running at port", port);
});