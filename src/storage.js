// ===== storage.js : 9raya o ktaba f LocalStorage =====

// players
export function getplayers(){
    return JSON.parse(localStorage.getItem("players")) || [];
}
export function saveplayers(players){
    localStorage.setItem("players",JSON.stringify(players));
}

// joueur li mkhtar (bach ib9a mor rechargement)
export const getselectedplayer = () => localStorage.getItem("selectedplayer") || "";
export const saveselectedplayer = (playerid) => localStorage.setItem("selectedplayer", playerid);

// historique dial parties
export const getgames = () => JSON.parse(localStorage.getItem("games")) || [];
export const savegames = (games) => localStorage.setItem("games", JSON.stringify(games));
