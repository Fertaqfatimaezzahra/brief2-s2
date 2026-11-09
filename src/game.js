export function duel(playercard, computercard) {
    if(playercard ===computercard ){
        return "equal";
    }
    if(playercard==="empereur" && computercard==="citoyen" ||
        playercard==="esclave" && computercard==="empereur" ||
        playercard==="citoyen" && computercard==="esclave"){
           return "win"; 
        }
      return "defeat";   

}

export function creategame(playerid){

    return{
        playerid: playerid,
        round: 1,
        playerscore:0,
        computerscore:0,
        camp:"empereur",
        playercards:["empereur", "citoyen", "citoyen", "citoyen", "citoyen"],
        computercards: ["esclave", "citoyen", "citoyen", "citoyen", "citoyen"],
        finished: false 
    };
}

export function playround(game,playercard,computercard){
   if(game.finished){
     return game;
   }
   const playercardindex = game.playercards.findIndex(card=>card===playercard);
const computercardindex = game.computercards.findIndex(card=>card===computercard);
   if(playercardindex===-1||computercardindex===-1){
    return game;
   }
   game.playercards.splice(playercardindex,1);
   game.computercards.splice(computercardindex,1);


 const result = duel(playercard,computercard);
      if(result==="equal"){
         return game;
     };

     if(result==="win"){
      if(game.camp==="esclave"){
         game.playerscore +=5;
      }else{
        game.playerscore+=1;
      }
     };

    if (result === "defeat") {
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
     if(game.round === 4 || game.round === 7 || game.round === 10){
        if(game.camp ==="empereur"){
            game.camp ="esclave";
        }else{
            game.camp ="empereur";
        };

     };
     if (!game.finished) {
    if (game.camp === "empereur") {
        game.playercards = [
            "empereur", "citoyen", "citoyen", "citoyen", "citoyen"
        ];

        game.computercards = [
            "esclave", "citoyen", "citoyen", "citoyen", "citoyen"
        ];
    } else {
        game.playercards = [
            "esclave", "citoyen", "citoyen", "citoyen", "citoyen"
        ];

        game.computercards = [
            "empereur", "citoyen", "citoyen", "citoyen", "citoyen"
        ];
    }
}
     console.log("ROUND:", game.round);
console.log("CAMP:", game.camp);
console.log("RESULT:", result);
console.log("SCORE:", game.playerscore, game.computerscore);
     return game;
}