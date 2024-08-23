import { db } from "@repo/database";
import express from "express";
import http from "http";
import { WebSocket } from "ws";

const app = express();
const port = 3001 || process.env.WSPORT;

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

const userConnections = new Map<string, WebSocket>();

wss.on("connection", (ws) => {
  console.log("NEW CLIENT CONNECTED");
  let CurrUser: string;
  ws.on("message", async (message) => {
    console.log(`Received message: ${message}`);

    // Example: Parsing JSON messages
    try {
      const {
        type,
        content,
        from: targetUserID,
        to: userId,
      } = JSON.parse(message.toString());
      console.log(type);
      if (type == "register") {
        CurrUser = userId;
        userConnections.set(userId, ws);

        console.log(`The connection has been build ${userId}`);
        console.log(targetUserID);
        const CheckIfUnSendMessage = await db.message.findMany({
          where: {
            OR: [
              {
                from: targetUserID,
                to: userId,
              },
              {
                from: userId,
                to: targetUserID,
              },
            ],
          },
        });

        console.log(CheckIfUnSendMessage);
        for (const msg of CheckIfUnSendMessage) {
          ws.send(JSON.stringify({ from: msg.from, content: msg.content }));
          await db.message.update({
            where: { id: msg.id },
            data: { delivered: true },
          });
        }
      }
      if (type == "message" && userId && targetUserID && content) {
        console.log("online");
        const targetWs = userConnections.get(targetUserID);

        if (targetWs && targetWs.readyState === WebSocket.OPEN) {
          // User is online, send message directly

          targetWs.send(JSON.stringify({ from: userId, content }));
          console.log("message sent");
          await db.message.create({
            data: { from: userId, to: targetUserID, content, delivered: true },
          });
        } else {
          await db.message.create({
            data: {
              from: userId,
              to: targetUserID,
              content: content,
              delivered: false,
            },
          });
          console.log(`Message stored for user ${targetUserID}: ${content}`);
        }
      }
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
  wss.on("error", (error) => {
    console.error("WebSocket server error:", error);
  });
});
// Serve static files
app.use(express.static("public"));

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
