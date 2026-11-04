export function showplayer(player,playersList){

     const buttons = document.createElement("div");
    buttons.className = "flex flex-wrap gap-2 mt-4"
    /// kansaybo card jdida l each player
    const card = document.createElement("div");
    card.dataset.id = player.id;
    ///decoration dial cards
    card.className = "bg-slate-900 rounded-xl p-4 border border-slate-700"

    /////avatar
    const avatar=document.createElement("div")
    avatar.textContent = player.avatar;
   avatar.className = "w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center text-amber-400";  
    card.appendChild(avatar);
    //////NICKNAME
    const name = document.createElement("h3");
name.textContent = player.nickname;
name.className = "text-lg font-semibold text-amber-400 mt-3";
card.appendChild(name);
////GAMES
const games = document.createElement("p");
games.textContent = "0 Games";
games.className = "text-sm text-slate-400 mt-1";
card.appendChild(games);
///// delete button
    const deletebtn = document.createElement("button");
    deletebtn.className = "bg-red-600 text-white px-4 py-2 rounded-lg font-semibold";
    deletebtn.textContent = "Delete";
    deletebtn.dataset.action = "delete";
    buttons.appendChild(deletebtn);
    //// button dial editing 
    const editbtn = document.createElement("button");
    editbtn.className = "bg-amber-400 text-slate-950 px-4 py-2 rounded-lg font-semibold";
    editbtn.textContent = "Edit";
    editbtn.dataset.action = "edit";
    buttons.appendChild(editbtn);
    card.appendChild(buttons);
    playersList.appendChild(card);


}
    export function showplayerinselect(players,playerselect){
        playerselect.innerHTML = '<option value="">Select a player </option>';
         players.forEach((player) => {
            const option = document.createElement("option");
             option.value = player.id;
             option.textContent = player.nickname;

             playerselect.appendChild(option);
         });

    }