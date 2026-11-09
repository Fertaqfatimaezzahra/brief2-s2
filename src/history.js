// ===== history.js : tsjil parties, recherche o filtres =====
import { getgameresult } from "./game.js";

const pad = (number) => String(number).padStart(2, "0");

// "2026-10-28T14:20" (b lwe9t local)
export const formatdate = (date) =>
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;

export function creategamerecord(game){
    const { playerid, playerscore, computerscore } = game;
    return {
        id: `g_${Date.now()}`,
        playerId: playerid,
        date: formatdate(new Date()),
        playerScore: playerscore,
        computerScore: computerscore,
        result: getgameresult(game)
    };
}

export const addgame = (games, record) => [...games, record];

export const deletegame = (games, gameid) => games.filter((g) => g.id !== gameid);

export const countplayergames = (games, playerid) => games.filter((g) => g.playerId === playerid).length;

// ila l'joueur tmse7, parties dyalo kayb9aw b smiya "Joueur supprimé"
export function getplayername(players, playerid){
    const player = players.find((p) => p.id === playerid);
    return player ? player.nickname : "Joueur supprimé";
}

// recherche + filtres kaykhdmo m3a b3d, mn jdida l 9dima
export function filtergames(games, players, { search = "", result = "all", period = "all" } = {}){
    const text = search.trim().toLowerCase();
    const now = new Date();
    const today = formatdate(now).slice(0, 10);
    const weekago = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    return games
        .map((g) => ({ ...g, nickname: getplayername(players, g.playerId) }))
        .filter((g) => g.nickname.toLowerCase().includes(text))
        .filter((g) => result === "all" || g.result === result)
        .filter((g) => {
            if(period === "today") return g.date.slice(0, 10) === today;
            if(period === "week") return new Date(g.date) >= weekago;
            return true;
        })
        .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
}
