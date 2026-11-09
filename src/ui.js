// ===== ui.js : kolchi li kayban f l'écran =====

const avataricons = { dragon: "🐉", knight: "🛡️", wizard: "🧙", shadow: "🥷" };
const cardicons = { empereur: "👑", citoyen: "🧑", esclave: "⛓️" };
// tsawr dial cartes (wjeh) + dahr dial carte
const cardimages = {
    empereur: "images/cards/empereur.png",
    citoyen: "images/cards/citoyen.png",
    esclave: "images/cards/esclave.png"
};
const cardback = "images/cards/back.webp";
const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

export const getavataricon = (avatar) => avataricons[avatar] || "👤";

export const showmessage = (element, text) => {
    if(element) element.textContent = text;
};

// ===================== PLAYERS =====================

export function showplayer(player,playersList){
    const { id, nickname, avatar, games = 0 } = player;

     const buttons = document.createElement("div");
    buttons.className = "flex flex-wrap gap-2 mt-4"
    /// kansaybo card jdida l each player
    const card = document.createElement("div");
    card.dataset.id = id;
    ///decoration dial cards
    card.className = "bg-slate-900 rounded-xl p-4 border border-slate-700 hover:border-amber-400/60 transition"

    /////avatar
    const avatarbox=document.createElement("div")
    avatarbox.textContent = getavataricon(avatar);
    avatarbox.title = avatar;
   avatarbox.className = "w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center text-3xl";
    card.appendChild(avatarbox);
    //////NICKNAME
    const name = document.createElement("h3");
name.textContent = nickname;
name.className = "text-lg font-semibold text-amber-400 mt-3 break-all";
card.appendChild(name);
////GAMES
const gamestext = document.createElement("p");
gamestext.textContent = `${games} ${games === 1 ? "game" : "games"} played`;
gamestext.className = "text-sm text-slate-400 mt-1";
card.appendChild(gamestext);
///// delete button
    const deletebtn = document.createElement("button");
    deletebtn.type = "button";
    deletebtn.className = "bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300 transition";
    deletebtn.textContent = "Delete";
    deletebtn.dataset.action = "delete";
    buttons.appendChild(deletebtn);
    //// button dial editing
    const editbtn = document.createElement("button");
    editbtn.type = "button";
    editbtn.className = "bg-amber-400 text-slate-950 px-4 py-2 rounded-lg font-semibold hover:bg-amber-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 transition";
    editbtn.textContent = "Edit";
    editbtn.dataset.action = "edit";
    buttons.appendChild(editbtn);
    card.appendChild(buttons);
    playersList.appendChild(card);


}

// lista kamla dial players (ola message ila khawya)
export function showplayers(players, playersList){
    playersList.textContent = "";
    if(players.length === 0){
        const empty = document.createElement("p");
        empty.textContent = "No profile yet. Create the first player with the form.";
        empty.className = "col-span-full rounded-xl border border-dashed border-slate-700 p-6 text-center text-slate-400";
        playersList.appendChild(empty);
        return;
    }
    players.forEach((player) => showplayer(player, playersList));
}

    export function showplayerinselect(players,playerselect,selectedid = ""){
        playerselect.innerHTML = '<option value="">Select a player </option>';
         players.forEach((player) => {
            const option = document.createElement("option");
             option.value = player.id;
             option.textContent = `${getavataricon(player.avatar)} ${player.nickname}`;

             playerselect.appendChild(option);
         });
        playerselect.value = selectedid;

    }

// pseudo dial joueur li kayl3b f l'header
export function showcurrentplayer(player, element){
    if(!element) return;
    element.textContent = player
        ? `${getavataricon(player.avatar)} ${player.nickname}`
        : "No player selected";
}

// état erreur dial input (border 7mer + message)
export function showfielderror(input, errorelement, message){
    errorelement.textContent = message;
    input.classList.toggle("border-red-500", message !== "");
    input.classList.toggle("border-slate-600", message === "");
    input.setAttribute("aria-invalid", message !== "" ? "true" : "false");
}

// formulaire : création ola modification
export function showformmode(editing, { formtitle, submitbutton, cancelbutton }){
    formtitle.textContent = editing ? "Edit profile" : "Create a profile";
    submitbutton.textContent = editing ? "Save changes" : "Create profile";
    cancelbutton.classList.toggle("hidden", !editing);
}

// ===================== GAME =====================

export function showstartbutton(button, { disabled, label }){
    if(!button) return;
    button.disabled = disabled;
    if(label) button.textContent = label;
}

    // show cards and make them clickable
 export function showgamecards(cards,container){
    container.innerHTML="";
    cards.forEach((card) =>{
        const button = document.createElement("button")
   button.type = "button";
   button.dataset.card = card ;
   button.innerHTML = `<img src="${cardimages[card]}" alt="${capitalize(card)}" class="w-full h-full object-cover pointer-events-none">`;

   button.className= "aspect-[3/4] min-w-0 overflow-hidden rounded-lg border-2 border-amber-400 bg-slate-800 shadow-lg hover:-translate-y-1 hover:shadow-amber-400/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition"
   container.appendChild(button);

    }
)};

// mli kaytl3bo cartes : ma ymknch nkliko merra khra
export function setcardsdisabled(container, disabled){
    container.querySelectorAll("button").forEach((button) => {
        button.disabled = disabled;
    });
}

    export function showcomputercards(cards,container){
        container.innerHTML="";
    cards.forEach(() =>{
        // cartes dial l'ordinateur m9loubin : kayban ghir dahr
        const hiddencard = document.createElement("div")
   hiddencard.innerHTML = `<img src="${cardback}" alt="Hidden card" class="w-full h-full object-cover">`;

   hiddencard.className= "aspect-[3/4] min-w-0 overflow-hidden rounded-lg border-2 border-amber-400/70 bg-slate-950 shadow-lg"
   container.appendChild(hiddencard);

    }
)};

// manche, groupe, camp, chkon ybda, score
export function showgamestatus(status, elements){
    const { round, group, camp, first, playerscore, computerscore, finished } = status;
    elements.round.textContent = `${round} / 12`;
    elements.group.textContent = `${group} / 4`;
    elements.camp.textContent = `${cardicons[camp]} ${capitalize(camp)}`;
    elements.first.textContent = finished
        ? "—"
        : `${cardicons[first]} ${capitalize(first)} (${first === camp ? "you" : "computer"})`;
    elements.score.textContent = `You ${playerscore} - ${computerscore} Computer`;
}

// carte b jouj wjoh : kadbda b dahr (back) o kadour 180deg bach ban l'wjeh
const flipcard = (card, owner) => `
    <div class="flex flex-col items-center gap-2 py-3">
        <div class="w-24 sm:w-32 aspect-[3/4] perspective-midrange">
            <div class="relative w-full h-full transform-3d animate-flip">
                <img src="${cardback}" alt="" class="absolute inset-0 w-full h-full object-cover rounded-lg border-2 border-amber-400/70 backface-hidden">
                <img src="${cardimages[card]}" alt="${capitalize(card)}" class="absolute inset-0 w-full h-full object-cover rounded-lg border-2 border-amber-400 backface-hidden rotate-y-180">
            </div>
        </div>
        <span class="text-xs text-slate-400">${owner}</span>
    </div>`;

// jouj cartes kayt9elbo (animation)
export function showplayedcards(playercard, computercard, playerelement, computerelement){
    playerelement.innerHTML = flipcard(playercard, "You");
    computerelement.innerHTML = flipcard(computercard, "Computer");
}

export function resetplayedcards(playerelement, computerelement){
    playerelement.textContent = "Your card";
    computerelement.textContent = "Computer card";
}

const gameovertitles = {
    victoire: "🎉 You win!",
    défaite: "💻 The computer wins",
    égalité: "🤝 It's a draw"
};

export function showgameover(element, { result, playerScore, computerScore }){
    element.querySelector("[data-gameover-title]").textContent = gameovertitles[result];
    element.querySelector("[data-gameover-score]").textContent = `Final score: You ${playerScore} - ${computerScore} Computer`;
    element.classList.remove("hidden");
}

export function hidegameover(element){
    element.classList.add("hidden");
}

// ===================== HISTORY =====================

const resultbadges = {
    victoire: "bg-emerald-500/15 text-emerald-400 border-emerald-500/40",
    défaite: "bg-red-500/15 text-red-400 border-red-500/40",
    égalité: "bg-slate-500/15 text-slate-300 border-slate-500/40"
};

export function showhistory(games, { list, empty, count }, emptytext){
    list.innerHTML = games.map(({ id, date, nickname, playerScore, computerScore, result }) => `
        <article data-id="${id}" class="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto_auto] items-center gap-3 rounded-xl border border-slate-700 bg-slate-900 p-4">
            <div class="min-w-0">
                <p class="font-semibold break-all ${nickname === "Joueur supprimé" ? "italic text-slate-400" : "text-amber-400"}">${nickname}</p>
                <p class="text-sm text-slate-400">${date.replace("T", " ")}</p>
            </div>
            <p class="text-lg font-bold text-right sm:text-center">${playerScore} - ${computerScore}</p>
            <span class="w-fit rounded-full border px-3 py-1 text-xs font-semibold ${resultbadges[result]}">${capitalize(result)}</span>
            <button type="button" data-action="delete-game"
                class="justify-self-end rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300 transition">
                Delete
            </button>
        </article>`).join("");

    empty.textContent = emptytext;
    empty.classList.toggle("hidden", games.length > 0);
    count.textContent = `${games.length} ${games.length === 1 ? "game" : "games"}`;
}
