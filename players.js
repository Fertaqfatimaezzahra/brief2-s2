export function deleteplayer(players,playerid){
     return players.filter((p) => p.id !== playerid);

}

export function updateplayerinfo(players,playerid,nickname,avatar){
    for(let i = 0 ; i < players.length;i++){
        if(players[i].id === playerid){
           players[i].nickname = nickname;
           players[i].avatar = avatar;
           break;
        }
    }
return players ; 
}