export function getplayers(){
    return JSON.parse(localStorage.getItem("players")) || [];
}
export function saveplayers(players){
    localStorage.setItem("players",JSON.stringify(players));
}