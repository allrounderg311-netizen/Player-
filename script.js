let xp =
Number(localStorage.getItem("xp")) || 0;

let level =
Number(localStorage.getItem("level")) || 1;

let stats =
JSON.parse(localStorage.getItem("stats")) || {

strength:0,
communication:0,
confidence:0,
discipline:0,
intelligence:0,
aura:0

};

let presence =
Number(localStorage.getItem("presence")) || 0;

const titles = [

"E Rank",
"Awakened",
"Fighter",
"Hunter",
"Elite",
"Veteran",
"Commander",
"Master",
"Grandmaster",
"Mythic",
"Transcendent"

];

function getTitle(level){

if(level >= 50) return titles[10];
if(level >= 45) return titles[9];
if(level >= 40) return titles[8];
if(level >= 35) return titles[7];
if(level >= 30) return titles[6];
if(level >= 25) return titles[5];
if(level >= 20) return titles[4];
if(level >= 15) return titles[3];
if(level >= 10) return titles[2];
if(level >= 5) return titles[1];

return titles[0];

}

function saveData(){

localStorage.setItem("xp",xp);
localStorage.setItem("level",level);
localStorage.setItem("stats",
JSON.stringify(stats));

localStorage.setItem("presence",
presence);

}

function updateUI(){

document.getElementById("level")
.innerText = level;

document.getElementById("rankTitle")
.innerText = getTitle(level);

document.getElementById("xpText")
.innerText =
xp + " / 1000";

document.getElementById("xpFill")
.style.width =
(xp/1000)*100 + "%";

Object.keys(stats).forEach(stat=>{

let total = stats[stat];

let tier =
Math.floor(total/300)+1;

let progress =
total % 300;

document.getElementById(
stat + "Level"
).innerText =
"Tier " + tier;

document.getElementById(
stat + "Fill"
).style.width =
(progress/300)*100 + "%";

});

document.getElementById(
"presenceFill"
).style.width =
presence + "%";

document.getElementById(
"presenceText"
).innerText =
presence + " / 100 Proofs";

saveData();

}

function gainXP(amount,stat){

xp += amount;

if(xp >= 1000){

level++;

xp -= 1000;

document.getElementById(
"levelSound"
).play();

}

stats[stat] +=
Math.floor(amount*1.2);

updateUI();

}

function createTask(){

let name =
document.getElementById(
"taskName"
).value;

let xpReward =
Number(document.getElementById(
"taskXP"
).value);

let stat =
document.getElementById(
"taskStat"
).value;

if(name.trim()=="") return;

let button =
document.createElement("button");

button.innerText =
name + " +" + xpReward + " XP";

button.onclick = function(){

gainXP(xpReward,stat);

};

document.getElementById(
"taskContainer"
).appendChild(button);

}

function increasePresence(){

if(presence < 100){

presence++;

}

updateUI();

}

function resetSystem(){

let reset =
confirm("RESET ALL PROGRESS?");

if(reset){

localStorage.clear();

location.reload();

}

}

updateUI();