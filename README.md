# TFT MCP Server

This is a Model Context Protocol (MCP) server for Team Fight Tactics (TFT) that provides access to TFT game data through various tools.

## Features

- Get match history for a summoner
- Get detailed information about specific TFT matches

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Riot Games API Key (for accessing TFT data)

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

## Usage

1. Start the server with required parameters:

```bash
npm start -- --apiKey "YOUR_RIOT_API_KEY" --gameName "SUMMONER_NAME" --tagLine "TAG_LINE"
```

Or using short options:

```bash
npm start -- -k "YOUR_RIOT_API_KEY" -n "SUMMONER_NAME" -t "TAG_LINE"
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
