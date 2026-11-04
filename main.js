  import { showplayer,showplayerinselect } from "./ui.js";
  import { deleteplayer,updateplayerinfo } from "./players.js";
   import {getplayers, saveplayers} from "./storage.js";

const form = document.getElementById("profile-form");
const playersList = document.getElementById("players-list");
const playerSelect = document.getElementById("selected-player");
showplayerinselect(players,playerSelect);
playerSelect.value = localStorage.getItem("selectedplayer") || "" ; 

             ////// hna bdina event delegation 
let players = getplayers();
let editingid = null;
 
      playersList.addEventListener("click",(event)=>{
 const button = event.target.closest("button[data-action]");
    if(!button) return;
 const action = button.dataset.action;
 const card = button.closest("[data-id]");
    if (!card) return;
const playerid = card.dataset.id;
const player = players.find((p) => p.id === playerid);
 if(!player)return; 
////change the player info
if(action==="edit"){
      editingid = player.id;
      document.getElementById("nickname").value = player.nickname;
      document.getElementById("avatar").value = player.avatar;

}
    
     ////////delete
     if(action === "delete"){
        const confirmed = confirm("delete this profile ?");
        if(!confirmed)return;
       players = deleteplayer(players, playerid);
        saveplayers(players)
        card.remove();
     }
  })
const nicknameError = document.getElementById("nickname-error");

  players.forEach(p => showplayer(p, playersList));
             ////////SUBMIT
        form.addEventListener("submit", (event) => {
    event.preventDefault();
    nicknameError.textContent = "";
 const nickname = document.getElementById("nickname").value;
    console.log(nickname);
const avatar = document.getElementById("avatar").value;
    console.log(avatar);

    //////// hadi dial name ila kan already
    const nicknamevalid =  /^[A-Za-z0-9*]{3,15}$/.test(nickname);

    if(!nicknamevalid){
        nicknameError.textContent = "use 3-15 letters, numbers or * only";
        return;
    }
    const exists = players.some((player) => {
           return player.id !== editingid &&
                     player.nickname.toLowerCase() === nickname.toLowerCase();
        });
    if (exists) {
        nicknameError.textContent = "This nickname already exists!";
        return;
    }

    if (editingid !== null) {
const player = players.find(p => p.id === editingid);
 if(!player)return;
      players = updateplayerinfo(players, editingid, nickname, avatar);
        saveplayers(players);

        playersList.textContent = "";
        players.forEach(p => showplayer(p,playersList));

        editingid = null;
        form.reset();
        return;

    }

    const player = {
        id: `p_${Date.now()}`,
        nickname: nickname,
        avatar: avatar,
        createdAt: new Date().toISOString().split("T")[0]
    };
    players.push(player);
  saveplayers(players);
    showplayer(player,playersList);
    
});
