# TFT MCP Server

This is a Model Context Protocol (MCP) server for Team Fight Tactics (TFT) that provides access to TFT game data through various tools.

## Features

- Get match history for a summoner
- Get detailed information about specific TFT matches

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Riot Games API Key (for accessing TFT data) - Get it from [Riot Games Developer Portal](https://developer.riotgames.com/)
  - Note: For development, you can use a temporary API key that expires in 24 hours
  - For production use, you'll need to apply for a permanent personal API key at [Riot's Application Portal](https://developer.riotgames.com/app-type)
- Your Game Name, accessed from your Riot game console
- Your Name Tagline, accessed from your Riot game console, which is usually followed/shown right after your Game Name. For example: `NA1`

## Usage

1. Configure the MCP server in your Claude Desktop config file:

### MacOS

Location: `~/Library/Application Support/Claude/claude_desktop_config.json`

### Windows

Location: `%APPDATA%/Claude/claude_desktop_config.json`

Add the following configuration:

```json
{
  "mcpServers": {
    "tft-mcp": {
      "command": "npx",
      "args": [
        "mcp-server-tft",
        "--apiKey",
        "<YOUR_RIOT_API_KEY>",
        "--gameName",
        "<YOUR_GAME_NAME>",
        "--tagLine",
        "<YOUR_TAG_LINE>"
      ]
    }
  }
}
```

2. The server will run on stdio and provide the following tools:

### tft_match_history

Get TFT match history for the current player.

Parameters:

- `count` (optional): Number of matches to retrieve. Defaults to 20
- `start` (optional): Start index for pagination. Defaults to 0

### tft_match_details

Get detailed information about a specific TFT match.

Parameters:

- `matchId` (required): The match ID to get details for

## Development

The project is written in TypeScript and uses the Model Context Protocol SDK. To modify the code:

1. Make changes in the `src` directory
2. Run `npm run build` to compile
3. Run `npm start` with the required parameters to test changes

## License

MIT
