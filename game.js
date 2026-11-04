export function dual(playercard, carteordinateur) {
    if(playercard === carteordinateur){
        return "equal";
    }
    if(playercard==="empereur" && carteordinateur==="citoyen" ||
        playercard==="esclave" && carteordinateur==="empereur" ||
        playercard==="citoyen" && carteordinateur==="esclave"){
           return "win"; 
        }
      return "Defeat";   

}

export function creategame(playerid){

    return{
        playerid: playerid,
        round: 1,
        playerscore:0,
        computerscore:0,
        camp:"Empereur",
        finished: false 
    };
}

export function playround(game,playercard,computerCard){
   if(game.finished){
     return game;
   }
 const result = dual(playercard,computerCard);
     if(result==="win"){
        game.playerscore++;
     }
     if(game.round==="Defeat"){
        game.computerscore++;
     }
     if(result===12){
        game.finished=true;
     }else{
        game.round++;
     }
     if(game.round === 4 || game.round===7 || game.round===10){
        if(game.camp ==="empereur"){
            game.camp ==="esclave"
        }else{
            game.camp ==="empereur";
        }
     }
}