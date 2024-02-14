import { createClient } from "@supabase/supabase-js";
import { Client } from "discord.js-selfbot-v13";
import "dotenv/config";

class Config {
  constructor() {
    this.supabaseUrl = process.env.SUPABASE_URL;
    this.supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
    this.botToken = process.env.BOT_TOKEN;
    this.botPrefix = process.env.BOT_PREFIX;
    this.userId = process.env.USER_ID;
  }

  db() {
    return createClient(this.supabaseUrl, this.supabaseAnonKey);
  }

  bot() {
    const token = this.botToken;
    const prefix = this.botPrefix;
    const userId = this.userId;

    if (!token || !prefix || !userId) {
      throw new Error("Bot configuration is incomplete.");
    }

    const client = new Client();

    return { token, client, prefix, userId };
  }
}

export default Config;
