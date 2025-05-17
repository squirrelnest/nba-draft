import { getTeamId, getPlayers, getDraftCount } from "../src/nba";

describe("NBA Draft", () => {
  test("should get team ID", async () => {
    const teamId = await getTeamId("Golden State Warriors");
    expect(teamId).toBe(10);
  });

  test("should get players on a team", async () => {
      const players = await getPlayers(10);
      expect(players[0].team.name).toBe("Warriors");
  });

  test("should get draft count", async () => {
    const draft = await getDraftCount("Golden State Warriors");
    console.log(draft)
    expect(typeof draft).toBe("string");
    expect(draft).toContain("Team Name:");
    expect(draft).toContain("Draft Rounds:");
});
});

