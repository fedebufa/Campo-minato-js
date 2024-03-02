// RECUPERARE DALLA PAGINE TUTTI GLI ELEMENTI DI INTERESSE
const scoreCounter = document.querySelector('.score-counter');
const grid = document.querySelector('.grid');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text');
const playAgainButton = document.querySelector('.play-again');
// PREPARARMI DELLE INFO CHE SONO UTILI ALLA LOGICA DI GIOCO
const totalCells = 100;
const totalBombs = 25;
const maxScore = totalCells - totalBombs;
const bombsList = [];
let score = 0;
// GENERARE TOT BOMBE CASUALI
while(bombsList.length < totalBombs){
    const number = Math.floor(Math.random() * totalCells) + 1;
   if(!bombsList.includes(number)){
    bombsList.push(number);
} 
}
/*----------------------
GRIGLIA E LOGICA DI GIOCO
------------------------*/
let isCellEven = false;
let isRowEven = false;
for (let i = 1; i <= totalCells; i++ ){
//CREO UN ELEMENTO E GLI DO LA CLASSE CELL
const cell = document.createElement('div');
cell.classList.add('cell')
//cell.innerText = 1

isCellEven = i % 2 === 0;
if((isRowEven && isCellEven)|| (!isRowEven && !isCellEven)) cell.classList.add('cell-dark');

//SE SONO ALLA FINE DELLA RIGA....

if( i % 10 === 0) isRowEven = !isRowEven;
//GESTIAMO IL CLICK DELLA CELLA

cell.addEventListener('click', function(){
if (cell.classList.contains('cell-clicked')) return
if(bombsList.includes(i)){
    cell.classList.add('cell-bomb')
    endGame(false);
} else {
    cell.classList.add('cell-clicked')
    updateScore();
}
});
//LO INSERISCO NELLA GRIGLIA
grid.appendChild(cell);
}
/*--------------------------
             FUNZIONI
----------------------------*/
function updateScore() {
    score++;
    scoreCounter.innerText = String(score).padStart(5, 0)
    if(score===maxScore) endGame(true);
}

function endGame(isVictory) {

   if (isVictory===true) {
       endGameScreen.classList.add('win')
       endGameText.innerHTML = 'YOU<br>WIN'
   }else {
       revealAllBombs()
    }
    endGameScreen.classList.remove('hidden')
}

function revealAllBombs(){
const cells= document.querySelectorAll('.cell');
for(let i = 1; i<= cells.length; i++){
    if(bombsList.includes(i)){
        const cellToReveal = cells[i-1];
        cellToReveal.classList.add('cell-bomb');
    }
}
}

function playAgain() {
    location.reload();
}
playAgainButton.addEventListener('click', playAgain)