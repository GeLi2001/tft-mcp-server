import fetch from "node-fetch";
import { RIOT_ACCOUNT_API } from "./constants.js";
import { getArgs } from "./types.js";

export let CURRENT_PUUID: string | null = null;

export async function fetchWithErrorHandling(url: string, options: any = {}) {
  try {
    const headers = {
      "X-Riot-Token": getArgs().apiKey,
      ...options.headers
    };

    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    throw new Error(
      `Failed to fetch: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

export async function initializePUUID() {
  try {
    const args = getArgs();
    const url = `${RIOT_ACCOUNT_API}/accounts/by-riot-id/${encodeURIComponent(
      args.gameName
    )}/${encodeURIComponent(args.tagLine)}`;
    const response = await fetchWithErrorHandling(url);
    const data = (await response.json()) as { puuid: string };
    CURRENT_PUUID = data.puuid;
  } catch (error) {
    console.error("Failed to initialize PUUID:", error);
    process.exit(1);
  }
}
