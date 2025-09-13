import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/config.js";
import { realTime } from "./socket/websocket.js";

dotenv.config();

connectDB()
    .then(() => {
        console.log("Database Connected");
        const server = app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running on port ${process.env.PORT || 5000}`);
        });

        realTime(server)
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
    });

app.get('/', (req, res) => {
    res.send('Server is running');
});
