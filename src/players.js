// ===== players.js : ajouter, modifier, supprimer les profils =====

// 3 7tal 15 : 7rouf, ar9am o _ bo7dhom
const nicknameregex = /^[A-Za-z0-9_]{3,15}$/;

export const isvalidnickname = (nickname) => nicknameregex.test(nickname);

// wach pseudo deja kayn (bla majuscules/minuscules)
// editingid : bach ma n9arnouch l'profil m3a rasso f l'modification
export const nicknameexists = (players, nickname, editingid = null) =>
    players.some((player) => {
        return player.id !== editingid &&
               player.nickname.toLowerCase() === nickname.toLowerCase();
    });

export const createplayer = (nickname, avatar) => ({
    id: `p_${Date.now()}`,
    nickname,
    avatar,
    createdAt: new Date().toISOString().split("T")[0]
});

export const addplayer = (players, player) => [...players, player];

export function deleteplayer(players,playerid){
     return players.filter((p) => p.id !== playerid);

}

// kanrj3o tableau jdid (map + spread) bla manbdlo l'original
export function updateplayerinfo(players,playerid,nickname,avatar){
    return players.map((p) => p.id === playerid ? { ...p, nickname, avatar } : p);
}
