import { BalldontlieAPI } from "@balldontlie/sdk";

const api = new BalldontlieAPI({ apiKey: "06e32978-bbf0-42e1-98a4-88d22171e81e" });

export async function getTeamId(team: string): Promise<number|Error> {
  try {
    const teams = await api.nba.getTeams();
    return teams.data.filter((NBATeam) => {
      return NBATeam.full_name === team
    })[0].id
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getPlayers(teamId: number):  Promise<any> {
  try {
    const players = await api.nba.getPlayers({
      team_ids: [teamId]
    });
    return players.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getDraftCount(fullTeamName: string): Promise<string> {
  let draftRounds = {
    "1": 0,
    "2": 0,
    "null": 0,
  }
  try {
    let team = await getTeamId(fullTeamName);
    let players = typeof team === "number" ? await getPlayers(team) : [];
    players.forEach((player) => {
      if (player.draft_round == 1) {
        draftRounds["1"]++
      }
      if (player.draft_round == 2) {
        draftRounds["2"]++
      }
      if (player.draft_round == null) {
        draftRounds["null"]++
      }
    })
  } catch (error) {
    console.error(error);
    return error;
  }
  console.log(`Team Name: ${fullTeamName} \nDraft Rounds: ${JSON.stringify(draftRounds)}`)
  return `Team Name: ${fullTeamName} \nDraft Rounds: ${JSON.stringify(draftRounds)}`
}

getDraftCount(process.argv[3]);

