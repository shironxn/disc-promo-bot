# DISCORD PROMOTION SELFBOT

<img src="https://i.pinimg.com/originals/b2/2a/a2/b22aa22b2f3f55b6468361158d52e2e7.gif" width="100%"></img>

This project is a Discord selfbot designed to automatically manage promotions and advertising within Discord servers.

## Warning

Using selfbots is against Discord's Terms of Service and may result in the termination of your Discord account. Proceed with caution and ensure that you fully understand the risks involved before using this selfbot.

## Installation

1. Clone this repository

   ```bash
   git clone <repository URL>
   ```

2. Navigate to the project directory

   ```bash
   cd disc-promo-bot
   ```

3. Install dependencies
   ```bash
   npm install
   ```

## Configuration

Copy or rename `.env.example` to `.env`

```
BOT_TOKEN=
BOT_PREFIX=
USER_ID=

SUPABASE_URL=
SUPABASE_ANON_KEY=
```

1. Bot Token
   To obtain the bot token, follow the instructions in the [discord.js-selfbot-v13](https://github.com/aiko-chan-ai/discord.js-selfbot-v13?tab=readme-ov-file#get-token-) repository.

2. Bot Prefix
   Set your desired prefix for bot commands.

3. User ID
   Your Discord user ID, which is used to control the bot.

4. Supabase URL and Supabase Anon Key
   For information on how to obtain the Supabase URL and Supabase Anon Key, refer to the [Supabase](https://supabase.com/docs/guides/api/creating-routes#api-url-and-keys).

5. Database Schema
   Copy and run `schema.sql` in your Supabase SQL editor to initialize the database schema.

## Usage

1. Run

   ```bash
   npm start
   ```

2. Development

   ```bash
   npm run dev
   ```

3. Get all commands
   ```bash
   {prefix}help
   ```

## Screenshots

![App Screenshot](https://media.discordapp.net/attachments/1110015781711904848/1207704587398676520/image.png?ex=65e09d8b&is=65ce288b&hm=d5180d2e5f70a9695013da698e5966822a75eff0b0ca1c860a65de4974be6a79&=&format=webp&quality=lossless&width=756&height=486)
