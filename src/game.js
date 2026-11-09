// ===== game.js : les règles dial l'jeu bo7dhom (ma kaymessch l'page / DOM) =====

// lcartes dial kol camp
const empereurhand = ["empereur", "citoyen", "citoyen", "citoyen", "citoyen"];
const esclavehand = ["esclave", "citoyen", "citoyen", "citoyen", "citoyen"];

// kansaybo jouj lmains 3la 7ssab camp dial joueur (copie b spread)
export function createhands(camp){
    if(camp === "empereur"){
        return { playercards: [...empereurhand], computercards: [...esclavehand] };
    }
    return { playercards: [...esclavehand], computercards: [...empereurhand] };
}

export function duel(playercard, computercard) {
    if(playercard ===computercard ){
        return "égalité";
    }
    if(playercard==="empereur" && computercard==="citoyen" ||
        playercard==="esclave" && computercard==="empereur" ||
        playercard==="citoyen" && computercard==="esclave"){
           return "victoire";
        }
      return "défaite";

}

export function creategame(playerid){

    return{
        playerid: playerid,
        round: 1,
        duelcount: 0, // ch7al mn duel tl3ab (bach n3rfo chkon ybda)
        playerscore:0,
        computerscore:0,
        camp:"empereur",
        ...createhands("empereur"),
        finished: false
    };
}

// groupe (1 -> 4) : kol 3 manches = groupe
export const getgroup = (round) => Math.ceil(round / 3);

// chkon y7et carte dyalo lowel : Empereur, mn ba3d Esclave, mn ba3d Empereur...
export const getfirstcamp = (game) => game.duelcount % 2 === 0 ? "empereur" : "esclave";

// l'ordinateur kaykhtar carte b hasard
export const getcomputercard = (cards) => cards[Math.floor(Math.random() * cards.length)];

// natija dial partie kamla
export const getgameresult = ({ playerscore, computerscore }) => {
    if(playerscore > computerscore) return "victoire";
    if(playerscore < computerscore) return "défaite";
    return "égalité";
};

// kan7aydo carte mn lmain : tableau jdid b spread (ma kanbdlouch l'original)
const removecard = (cards, index) => [...cards.slice(0, index), ...cards.slice(index + 1)];

export function playround(game,playercard,computercard){
   if(game.finished){
     return game;
   }
   const playercardindex = game.playercards.findIndex(card=>card===playercard);
const computercardindex = game.computercards.findIndex(card=>card===computercard);
   if(playercardindex===-1||computercardindex===-1){
    return game;
   }
   game.playercards = removecard(game.playercards, playercardindex);
   game.computercards = removecard(game.computercards, computercardindex);
   game.duelcount++;


 const result = duel(playercard,computercard);
      // égalité : jouj cartes t7aydo o kankmlo b li b9aw
      if(result==="égalité"){
         return game;
     };

     if(result==="victoire"){
      if(game.camp==="esclave"){
         game.playerscore +=5;
      }else{
        game.playerscore+=1;
      }
     };

    // l'ordinateur f camp l'akhor
    if (result === "défaite") {
    if (game.camp === "empereur") {
        game.computerscore += 5;
    } else {
        game.computerscore += 1;
    }
}
     if(game.round===12){
        game.finished=true;
     }else {
        game.round++;
     };
     // tbdil camp mor manche 3, 6 o 9
     if(!game.finished && (game.round === 4 || game.round === 7 || game.round === 10)){
        if(game.camp ==="empereur"){
            game.camp ="esclave";
        }else{
            game.camp ="empereur";
        };

     };
     // kol wa7ed kayreja3 l 5 cartes dyalo
     if (!game.finished) {
        const { playercards, computercards } = createhands(game.camp);
        game.playercards = playercards;
        game.computercards = computercards;
     }
     return game;
}
