/*eslint-env node*/
import "./init";
import http from "http";
import allApp from "./_globalRoutes";
import db from "../configs/db";
import logger1 from "../utils/logger";

const server = http.createServer(allApp);
const port = normalizePort(process.env.PORT || "8080");

server.listen(port);

server.on("listening", onListenning);
server.on("clientError", onError);
server.on("close", onClose);

function normalizePort(val: string) {
	const port = parseInt(val, 10);
	if (isNaN(port)) {
		return val;
	}
	if (port >= 0) {
		return port;
	}
	return false;
}

function onError(error: any) {
	if (error.syscall !== "listen") {
		console.log("error de edy");
		throw error;
	}
	const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
	switch (error.code) {
		case "EACCES":
			logger1.emit("test", { level: "error", type: "SYSTEM", message: bind + " requires elevated privileges" });
			break;

		case "EADDRINUSE":
			logger1.emit("test", { level: "error", type: "SYSTEM", message: bind + " is already in use" });
			break;

		case "ECONNRESET":
			logger1.emit("test", { level: "error", type: "SYSTEM", message: "pipe broken" });
			break;

		default:
			throw error;
	}

	process.exit(1);
}

function onClose() {
	db.$disconnect();
	process.exit(0);
}

function onListenning() {
	db.$connect()
		.then(() => {
			logger1.emit("test", { level: "debug", type: "SYSTEM", message: "Database Connected" });
		})
		.catch((err: Error) => {
			logger1.emit("test", { level: "error", type: "SYSTEM", message: `${err.name}: ${err.message}` });
		});
}

logger1.emit("test", { level: "error", type: "SYSTEM", message: `Docs on http://localhost:${port}/docs` });
logger1.emit("test", { level: "error", type: "SYSTEM	", message: `Prometheus metrics on http://localhost:${port}/metrics` });

export default server;
