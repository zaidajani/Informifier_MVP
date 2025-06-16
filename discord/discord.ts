// /discord/discord.ts

import { Client, GatewayIntentBits } from "discord.js";

// Initialize the Discord client with necessary intents
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

let isReady = false;

// Login only once (important in Next.js API context)
async function initClient() {
  if (!isReady) {
    await client.login(process.env.DISCORD_BOT_TOKEN);
    isReady = true;
    console.log("✅ Discord bot logged in.");
  }
}

// Function to send a DM to a user by ID
export async function sendDiscordDM(userId: string, message: string) {
  await initClient();

  try {
    const user = await client.users.fetch(userId);
    await user.send(message);
    return { success: true };
  } catch (error: any) {
    console.error("❌ Failed to send Discord DM:", error);
    return { success: false, error: error.message };
  }
}
