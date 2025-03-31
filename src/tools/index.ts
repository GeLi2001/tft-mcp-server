import type { Tool } from "@modelcontextprotocol/sdk/types.js";

// Define tools using the Zod schemas
export const TFT_TOOLS: Tool[] = [
  {
    name: "tft_match_history",
    description: "Get TFT match history for the current player",
    inputSchema: {
      type: "object",
      properties: {
        count: {
          type: "number",
          default: 20,
          description: "Number of matches to retrieve (default: 20)"
        },
        start: {
          type: "number",
          default: 0,
          description: "Start index (default: 0)"
        }
      }
    }
  },
  {
    name: "tft_match_details",
    description: "Get detailed information about a specific TFT match",
    inputSchema: {
      type: "object",
      properties: {
        matchId: {
          type: "string",
          description: "The match ID to get details for"
        }
      },
      required: ["matchId"]
    }
  }
];
