  import { showplayers, showplayerinselect, showcurrentplayer, showfielderror, showformmode, showmessage,
           showstartbutton, showgamecards, showcomputercards, setcardsdisabled, showgamestatus,
           showplayedcards, resetplayedcards, showgameover, hidegameover, showhistory } from "./ui.js";
  import { createplayer, addplayer, deleteplayer, updateplayerinfo, isvalidnickname, nicknameexists } from "./players.js";
  import { getplayers, saveplayers, getselectedplayer, saveselectedplayer, getgames, savegames } from "./storage.js";
  import { duel, creategame, playround, getgroup, getfirstcamp, getcomputercard } from "./game.js";
  import { creategamerecord, addgame, deletegame, countplayergames, filtergames } from "./history.js";

// ===================== STATE =====================
let players = getplayers();
let games = getgames();
let selectedplayerid = getselectedplayer();
let editingid = null;
let game = null;
let isflipping = false; // true mli kaytl3bo cartes (setTimeout)

// ila joueur li kan mkhtar ma b9ach (tmse7), nkhwiw l'choix
if(!players.some((p) => p.id === selectedplayerid)){
    selectedplayerid = "";
    saveselectedplayer("");
}

// ===================== ELEMENTS =====================
// (kol page fiha ghir chi elements, dakchi 3lach kandiro if(...) 9bel ma nst3mlohom)
const currentplayertext = document.getElementById("current-player");
const playerSelect = document.getElementById("selected-player");

// profils
const form = document.getElementById("profile-form");
const playersList = document.getElementById("players-list");
const nicknameinput = document.getElementById("nickname");
const avatarinput = document.getElementById("avatar");
const nicknameError = document.getElementById("nickname-error");
const avatarError = document.getElementById("avatar-error");
const formelements = {
    formtitle: document.getElementById("form-title"),
    submitbutton: document.getElementById("submit-profile"),
    cancelbutton: document.getElementById("cancel-edit")
};

                     // GAME
const gamecards = document.getElementById("player-cards");
const computercardcontainer = document.getElementById("computer-cards");
const playerplayedcard = document.getElementById("player-played-card");
const computerplayedcard = document.getElementById("computer-played-card");
const resulttext = document.getElementById("game-result");
const startgamebutton = document.getElementById("start-game");
const gameoverbox = document.getElementById("game-over");
const replaybutton = document.getElementById("replay-button");
const statuselements = {
    round: document.getElementById("round"),
    group: document.getElementById("group"),
    camp: document.getElementById("camp"),
    first: document.getElementById("first-player"),
    score: document.getElementById("score")
};

// historique
const historyelements = {
    list: document.getElementById("history-list"),
    empty: document.getElementById("history-empty"),
    count: document.getElementById("history-count")
};
const searchinput = document.getElementById("search");
const resultfilter = document.getElementById("result-filter");
const periodfilter = document.getElementById("period-filter");

// ===================== JOUEUR CHOISI =====================
function renderselectedplayer(){
    const player = players.find((p) => p.id === selectedplayerid);
    showcurrentplayer(player, currentplayertext);
    if(playerSelect) showplayerinselect(players, playerSelect, selectedplayerid);
    // bla joueur ma ymknch nbdaw partie
    if(game === null || game.finished){
        showstartbutton(startgamebutton, { disabled: selectedplayerid === "" });
    }
}

if(playerSelect){
  playerSelect.addEventListener("change", () => {
     selectedplayerid = playerSelect.value;
     saveselectedplayer(selectedplayerid);
     // ila tbdel joueur f west partie, kanw9foha
     if(game !== null && !game.finished){
        game = null;
        resetgameboard();
        showmessage(resulttext, "Player changed: start a new game.");
     }
     renderselectedplayer();
  });
}

// ===================== PROFILS =====================
function renderplayers(){
    if(!playersList) return;
    // n3tiw l kol joueur ch7al mn partie l3eb (map + spread)
    showplayers(players.map((p) => ({ ...p, games: countplayergames(games, p.id) })), playersList);
}

function resetform(){
    editingid = null;
    form.reset();
    showfielderror(nicknameinput, nicknameError, "");
    showfielderror(avatarinput, avatarError, "");
    showformmode(false, formelements);
}

if (playersList) {
             ////// hna bdina event delegation
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
      const { nickname, avatar } = player;
      nicknameinput.value = nickname;
      avatarinput.value = avatar;
      showfielderror(nicknameinput, nicknameError, "");
      showfielderror(avatarinput, avatarError, "");
      showformmode(true, formelements);
      form.scrollIntoView({ behavior: "smooth", block: "start" });
      nicknameinput.focus();
}

     ////////delete
     if(action === "delete"){
        const confirmed = confirm(`Delete the profile "${player.nickname}"? Their games stay in the history as "Joueur supprimé".`);
        if(!confirmed)return;
       players = deleteplayer(players, playerid);
        saveplayers(players);
        if(selectedplayerid === playerid){
            selectedplayerid = "";
            saveselectedplayer("");
        }
        if(editingid === playerid) resetform();
        renderplayers();
        renderselectedplayer();
     }
  })
}

             ////////SUBMIT
             if(form){
        form.addEventListener("submit", (event) => {
    event.preventDefault();
    showfielderror(nicknameinput, nicknameError, "");
    showfielderror(avatarinput, avatarError, "");
 const nickname = nicknameinput.value.trim();
const avatar = avatarinput.value;
    let haserror = false;

    if(!isvalidnickname(nickname)){
        showfielderror(nicknameinput, nicknameError, "Use 3-15 characters: letters, numbers or _ only.");
        haserror = true;
    //////// hadi dial name ila kan already
    } else if (nicknameexists(players, nickname, editingid)) {
        showfielderror(nicknameinput, nicknameError, "This nickname already exists!");
        haserror = true;
    }
    if(avatar === ""){
        showfielderror(avatarinput, avatarError, "Please choose an avatar.");
        haserror = true;
    }
    if(haserror) return;

    if (editingid !== null) {
      players = updateplayerinfo(players, editingid, nickname, avatar);
    } else {
      players = addplayer(players, createplayer(nickname, avatar));
    }
    saveplayers(players);
    resetform();
    renderplayers();
    renderselectedplayer();
});

  formelements.cancelbutton.addEventListener("click", resetform);
 }

// ===================== GAME =====================
function resetgameboard(){
    showgamecards([], gamecards);
    showcomputercards([], computercardcontainer);
    resetplayedcards(playerplayedcard, computerplayedcard);
    hidegameover(gameoverbox);
}

function updategameui(){
  if(game===null)return;

  showgamestatus({
      round: game.round,
      group: getgroup(game.round),
      camp: game.camp,
      first: getfirstcamp(game),
      playerscore: game.playerscore,
      computerscore: game.computerscore,
      finished: game.finished
  }, statuselements);

  if (game.finished) {
    showgamecards([], gamecards);
    showcomputercards([], computercardcontainer);
} else {
    showgamecards(game.playercards, gamecards);
    showcomputercards(game.computercards, computercardcontainer);
}
}

function startgame(){
      if(selectedplayerid===""){
        showmessage(resulttext, "Please select a player first!");
        return;
      }
      game = creategame(selectedplayerid);
      isflipping = false;
      resetgameboard();
      showmessage(resulttext, "Game started! Pick one of your cards.");
      showstartbutton(startgamebutton, { disabled: false, label: "Restart game" });
      updategameui();
}

// message dial kol duel
function getduelmessage(result, before){
    if(result === "égalité"){
        return "Égalité! Both citizens are removed, play again with the cards left.";
    }
    let message = result === "victoire"
        ? `Victoire! You win round ${before.round} (+${game.playerscore - before.playerscore}).`
        : `Défaite... The computer wins round ${before.round} (+${game.computerscore - before.computerscore}).`;
    if(game.camp !== before.camp){
        message += ` Camps switch: you are now ${game.camp === "empereur" ? "Empereur" : "Esclave"}!`;
    }
    return message;
}

// fin de partie : nsjlo f l'historique o n9trho n3awdo
function endgame(){
    const record = creategamerecord(game);
    games = addgame(games, record);
    savegames(games);
    showgameover(gameoverbox, record);
    showmessage(resulttext, "Game over! The game is saved in the history.");
    showstartbutton(startgamebutton, { disabled: false, label: "Play again" });
}

  if(startgamebutton){
   startgamebutton.addEventListener("click", startgame);
   replaybutton.addEventListener("click", startgame);
}

//**showing game cards */
if(gamecards){
gamecards.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-card]");
    if(!button)return;
    if(game===null || game.finished || isflipping) return;
    const playercard = button.dataset.card;
    if(!game.playercards.includes(playercard)){
        return;
    }

    // ma ymknch nl3bo jouj merrat 7ta ytl3bo cartes
    isflipping = true;
    setcardsdisabled(gamecards, true);
   const computercard = getcomputercard(game.computercards);
    showplayedcards(playercard, computercard, playerplayedcard, computerplayedcard);
    showmessage(resulttext, "Flipping the cards...");

    const currentgame = game;
    setTimeout(() => {
        if(game !== currentgame) return; // partie jdida tbdat f had lwe9t
        const before = { ...game };  // copie 9bel duel
        const result = duel(playercard,computercard);
        playround(game, playercard, computercard);
        showmessage(resulttext, getduelmessage(result, before));
        isflipping = false;
        updategameui();
        if(game.finished===true){
            endgame();
        }
    }, 900);
});
}

// ===================== HISTORIQUE =====================
function renderhistory(){
    if(!historyelements.list) return;
    const filtered = filtergames(games, players, {
        search: searchinput.value,
        result: resultfilter.value,
        period: periodfilter.value
    });
    const emptytext = games.length === 0
        ? "No game played yet. Play a game and it will show up here."
        : "No game matches your search and filters.";
    showhistory(filtered, historyelements, emptytext);
}

if(historyelements.list){
    searchinput.addEventListener("input", renderhistory);
    resultfilter.addEventListener("change", renderhistory);
    periodfilter.addEventListener("change", renderhistory);

    historyelements.list.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-action='delete-game']");
        if(!button) return;
        const row = button.closest("[data-id]");
        if(!row) return;
        const confirmed = confirm("Delete this game from the history?");
        if(!confirmed) return;
        games = deletegame(games, row.dataset.id);
        savegames(games);
        renderhistory();
    });
}

// ===================== INIT =====================
renderselectedplayer();
renderplayers();
renderhistory();
