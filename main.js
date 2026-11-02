const form = document.getElementById("profile-form");
const playersList = document.getElementById("players-list");
const nicknameError = document.getElementById("nickname-error");
let players = JSON.parse(localStorage.getItem("players")) || [];
let editingid = null;
function showplayer(player){
     /// kansaybo card jdida l each player
    const card = document.createElement("div");
   card.textContent = `${player.avatar} - ${player.nickname} - 0 Games`;
   const deleteBtn = document.createElement("button");
   deleteBtn.textContent = "Delete";
   card.appendChild(deleteBtn);
   //// button dial editing 
   const editbtn = document.createElement("button");
   editbtn.textContent = "Edit";
   card.appendChild(editbtn);
   editbtn.addEventListener("click", () => {
    document.getElementById("nickname").value = player.nickname ;
    document.getElementById("avatar").value = player.avatar ;
    editingid = player.id;

});
   deleteBtn.addEventListener("click", () => {
    const confirmed = confirm("Delete this profile?");
       if(!confirmed) return;

/////function dial delete 
players = players.filter((p) => p.id !== player.id);
localStorage.setItem("players", JSON.stringify(players));
card.remove();
});
    playersList.appendChild(card);

}
players.forEach((player) => {
    showplayer(player)
});

form.addEventListener("submit",(event) => {
event.preventDefault();
nicknameError.textContent = "";
const nickname = document.getElementById("nickname").value;
console.log(nickname);
const avatar = document.getElementById("avatar").value;
console.log(avatar);
if(editingid !== null){
 const player = player.find(p => p.id === editingid);
  
 if(!player)return;

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
  id : `p_${Date.now()}`,
  nickname : nickname ,
  avatar : avatar ,
  createdAt : new Date().toISOString().split("T")[0]
};
players.push(player);
localStorage.setItem("players", JSON.stringify(players));
showplayer(player);
console.log("form submitted");
console.log(players);
});
 