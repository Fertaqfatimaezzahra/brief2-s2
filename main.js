  import { showplayer,showplayerinselect } from "./ui.js";
  import { deleteplayer,updateplayerinfo } from "./players.js";
  import {getplayers, saveplayers} from "./storage.js";
  import {duel,creategame, playround} from "./game.js";

const form = document.getElementById("profile-form");
const playersList = document.getElementById("players-list");
 

             ////// hna bdina event delegation 
let players = getplayers();
let editingid = null;
                     // GAME
const gamecards = document.getElementById("game-cards");
const roundtext = document.getElementById("round");
const camptext = document.getElementById("camp");
const scoretext = document.getElementById("score");
const resulttext = document.getElementById("game-result");
let game = null;
const startgamebutton = document.getElementById("start-game");
 startgamebutton.addEventListener("click",() => {
      const selectedplayerid = document.getElementById("selected-player").value;
      if(selectedplayerid===""){
        resulttext.textContent = "Please select a player first!";
        return;
      }
      game = creategame(selectedplayerid);
      resulttext.textContent="Game started";
      updategameui();
      
 });
function updategameui(){
  if(game===null)return;

  roundtext.textContent= `Round : ${game.round} / 12 `;
  camptext.textContent= `Camp: ${game.camp} `;
  scoretext.textContent= `Player : ${game.playerscore} | Computer : ${game.computerscore} `;

}

//**showing game cards */
gamecards.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-card]");
    if(!button)return;
    if(game===null || game.finished) return;
    const playercard = button.dataset.card;
    const cards=["empereur", "citoyen", "esclave"];
   const computercard = cards[Math.floor(Math.random() * cards.length)];
    const result = duel(playercard,computercard);
    playround(game, playercard, computercard);
    resulttext.textContent = `You: ${playercard} | Computer: ${computercard} | Result: ${result}`;
    updategameui();
    if(game.finished){
        const winner=
         game.playerscore > game.computerscore ? "Player wins!" :
            game.playerscore < game.computerscore ? "Computer wins!" :
            "Draw!";
            resulttext.textContent+= `Game over ${winner}`    
    }
});




const playerSelect = document.getElementById("selected-player");
showplayerinselect(players,playerSelect);
playerSelect.value = localStorage.getItem("selectedplayer") || "" ;
 
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
