import { db } from "@repo/database";

async function cleanupOldMessages() {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 30); // Customize as needed

    await db.message.deleteMany({
      where: {
        timestamp: {
          lt: cutoffDate,
        },
      },
    });

    console.log("Old messages cleaned up successfully");
  } catch (error) {
    console.error("Error cleaning up old messages:", error);
  } finally {
    await db.$disconnect();
  }
}

cleanupOldMessages();
