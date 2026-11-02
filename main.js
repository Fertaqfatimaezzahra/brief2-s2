  import { showplayer } from "./ui";
const form = document.getElementById("profile-form");
const playersList = document.getElementById("players-list");
////////// hna bdina event delegation 
      playersList.addEventListener("click",(event)=>{
 const button = event.target.closest("button[data-action]");
    if(!button) return;
 const action = button.dataset.action;
 const card = button.closest("[data-id]");
    if (!card) return;
const playerid = card.dataset.id;
const player = player.find((p) => p.id === playerid);
     if(!player)return; 
     if(action === "delete"){
        const confirmed = confirm("delete this profile ?");
        if(!confirmed)return;
     }
  })
const nicknameError = document.getElementById("nickname-error");
let players = JSON.parse(localStorage.getItem("players")) || [];
let editingid = null;

   players.forEach((player,playersList) => {
    showplayer(player)
});

 form.addEventListener("submit", (event) => {
    event.preventDefault();
    nicknameError.textContent = "";
 const nickname = document.getElementById("nickname").value;
    console.log(nickname);
const avatar = document.getElementById("avatar").value;
    console.log(avatar);
    if (editingid !== null) {
const player = player.find(p => p.id === editingid);

        if (!player) return;
        player.nickname = nickname;
    player.avatar = avatar;
     localStorage.setItem("players", JSON.stringify(players));

        playersList.textContent = "";
        players.forEach(p => showplayer(p));

        editingid = null;
        form.requestFullscreen();
        return;

    }
    //////// hadi dial name ila kan already
    const exists = players.some(
        (player) => player.nickname.toLowerCase() === nickname.toLowerCase()
    );
    if (exists) {
        nicknameError.textContent = "This nickname already exists!";
        return;
    }

    const player = {
        id: `p_${Date.now()}`,
        nickname: nickname,
        avatar: avatar,
        createdAt: new Date().toISOString().split("T")[0]
    };
    players.push(player);
    localStorage.setItem("players", JSON.stringify(players));
    showplayer(player,playersList);
    
});
