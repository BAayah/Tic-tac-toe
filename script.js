let area = document.getElementById("area")
let cells = document.getElementsByClassName('cell')
let whoWins = document.getElementById("whoWins")
let currentPlayer = document.getElementById("currentPl")

let roundHistory = []

let player = 'X'
let ai = 'O'

let status = {
    'X': 0,
    'O': 0,
    'D': 0
}

let winCombination = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
]

for (let i = 1; i <= 9; i++) {
    area.innerHTML += `<div class="cell" pos="${i}"></div>`
}
// console.log(cells)


for (let i = 0; i < cells.length; i++) {
    // console.log(cells[i])
    cells[i].addEventListener("click", cellOnClick)
}

function cellOnClick() {
    let data = []
    if (!this.innerHTML) {     // if nothing is written
        this.innerHTML = player
    } else {
        alert("cell isn't empty!")
        return audio.play()
    }
    // console.log(this)
    for(let i in cells){
        if(cells[i].innerHTML==player){
            data.push(parseInt(cells[i].getAttribute('pos')))
        }
    }
    if(checkWinner(data)){
        status[player] +=1
        whoWins.innerHTML = [player] +' ' + 'Won'
        roundHistory.push(whoWins.innerHTML)
        document.getElementById("roundHistory").innerHTML+=`${player} won,<br>`
        refresh()
    }else {
        let draw = true;
        for(let i in cells) {
            if(cells[i].innerHTML=="")
            draw = false
        }
        if(draw) {
            status.D +=1;
            whoWins.innerHTML = "equal";
            roundHistory.push(whoWins.innerHTML);
            document.getElementById("roundHistory").innerHTML+=`Equal ${player},</br>`;
            refresh();
        }
    }
    player = player === "X" ? "O" : "X"
    // console.log(data)
    currentPlayer.innerHTML = player

    function checkWinner(data) {
        for (let i in winCombination){
            let win = true
            for(let j in winCombination[i]){
                let id = winCombination[i][j]
                let ind = data.indexOf(id)
                if(ind==-1){
                    win = false
                }
            }
            if(win) return true
        }
        return false 
    }    
    showStatistics();
}

function refresh() {
    for(let i = 0; i < cells.length; i++){
        cells[i].innerHTML = ""
    }
    showStatistics();
};

function showStatistics() {

    let xWinsElement = document.getElementById("sX");
    let oWinsElement = document.getElementById("sO");
    let drawElement = document.getElementById("sD");
    let roundHistoryElement = document.getElementById("roundHistory");
    
    xWinsElement.textContent = status['X'];
    oWinsElement.textContent = status['O'];
    drawElement.textContent = status['D'];

    roundHistoryElement.innerHTML = roundHistory.join("<br>");
}

showStatistics();

