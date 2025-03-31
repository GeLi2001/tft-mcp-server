import { RIOT_API_BASE } from "../constants.js";
import { CURRENT_PUUID, fetchWithErrorHandling } from "../utils.js";

// Tool handlers
export async function handleTftMatchHistory(params: any) {
  const { count = 20, start = 0 } = params;
  const url = `${RIOT_API_BASE}/tft/match/v1/matches/by-puuid/${CURRENT_PUUID}/ids?start=${start}&count=${count}`;

  try {
    const response = await fetchWithErrorHandling(url);
    const matchIds = await response.json();
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ matchIds }, null, 2)
        }
      ],
      isError: false
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              error: error instanceof Error ? error.message : String(error)
            },
            null,
            2
          )
        }
      ],
      isError: true
    };
  }
}

export async function handleTftMatchDetails(params: any) {
  const { matchId } = params;
  const url = `${RIOT_API_BASE}/tft/match/v1/matches/${matchId}`;

  try {
    const response = await fetchWithErrorHandling(url);
    const data = await response.json();
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data, null, 2)
        }
      ],
      isError: false
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              error: error instanceof Error ? error.message : String(error)
            },
            null,
            2
          )
        }
      ],
      isError: true
    };
  }
}
