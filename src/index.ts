#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError
} from "@modelcontextprotocol/sdk/types.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { TFT_TOOLS } from "./tools/index.js";
import { handleTftMatchDetails, handleTftMatchHistory } from "./tools/match.js";
import { setArgs } from "./types.js";
import { initializePUUID } from "./utils.js";

// Parse command line arguments
interface Arguments {
  apiKey: string;
  gameName: string;
  tagLine: string;
  [x: string]: unknown;
}

const getArgs = async (): Promise<Arguments> => {
  return yargs(hideBin(process.argv))
    .option("apiKey", {
      alias: "k",
      type: "string",
      description: "Riot API Key",
      demandOption: true
    })
    .option("gameName", {
      alias: "n",
      type: "string",
      description: "Summoner Name",
      demandOption: true
    })
    .option("tagLine", {
      alias: "t",
      type: "string",
      description: "Name Tagline",
      demandOption: true
    })
    .help()
    .parseAsync();
};

// Server setup
const server = new Server(
  {
    name: "tft",
    version: "0.1.0"
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

// Set up request handlers
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TFT_TOOLS
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    switch (request.params.name) {
      case "tft_match_history": {
        return await handleTftMatchHistory(request.params.arguments);
      }
      case "tft_match_details": {
        return await handleTftMatchDetails(request.params.arguments);
      }
      default:
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Unknown tool: ${request.params.name}`
        );
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${
            error instanceof Error ? error.message : String(error)
          }`
        }
      ],
      isError: true
    };
  }
});

// Modify runServer to initialize args and PUUID first
async function runServer() {
  const parsedArgs = await getArgs();
  setArgs(parsedArgs);
  await initializePUUID();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("TFT MCP Server running on stdio");
}

runServer().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});
