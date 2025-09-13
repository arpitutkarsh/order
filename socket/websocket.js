import { WebSocketServer } from "ws";
import { Order } from "../models/order.model.js";

export function realTime(server) {
    const socketServer = new WebSocketServer({ server });
    const clients = new Set(); // use Set for easier add/remove

    socketServer.on("connection", (ws) => {
        console.log("Client connected");
        clients.add(ws);

        ws.on("close", () => {
            console.log("Client disconnected");
            clients.delete(ws);
        });
    });

    const changeStream = Order.watch();

    changeStream.on("change", async (change) => {
        console.log("Database Change:", change.operationType);

        try {
            const orders = await Order.find().sort({ createdAt: -1 });
            const data = JSON.stringify({
                type: "orders_update",
                payload: orders
            });

            for (const client of clients) {
                if (client.readyState === 1) {
                    client.send(data);
                }
            }
        } catch (error) {
            console.error("Error broadcasting update:", error);
        }
    });
}
