// Varibles
const bjApp = {};

bjApp.suit = ["Hearts", "Spades", "Clovers", "Diamonds"]
bjApp.value = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1 || 11]
bjApp.face = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"]
bjApp.playerHand = [];
bjApp.dealerHand = [];
bjApp.deck = [];
bjApp.randomCard = "";

// card constructor
function card(suit, value, face) {
    this.suit = suit;
    this.value = value;
    this.face = face;
};

const player = {
    bank: 100,
    bet: 0,
}


//Elements
const moneyEl = document.querySelector('#bankroll')
const betEl = document.querySelector('#bets h2')
const pHandEl1 = document.getElementById('phand1')
const pHandEl2 = document.getElementById('phand2')
const dHandEl1 = document.getElementById('dhand1')
const dHandEl2 = document.getElementById('dhand2')
const pTotalEl = document.querySelector('#player h2')
const dTotalEl = document.querySelector('#dealer h2')
const playButtonEl = document.getElementById('play')
const resultsEl = document.querySelector('#results h1')
const betButtonsEl = document.querySelectorAll('.bet')


// event listeners
document.querySelector('#bet1').addEventListener('click', bet1);
document.querySelector('#bet5').addEventListener('click', bet5);
document.querySelector('#bet10').addEventListener('click', bet10);
document.querySelector('#bet25').addEventListener('click', bet25);
document.querySelector('#bet50').addEventListener('click', bet50);
document.querySelector('#hit').addEventListener('click', hit);
document.querySelector('#play').addEventListener('click', play);
document.querySelector('#stand').addEventListener('click', stand)

// Functions

function play() {
    createDeck();
    dealCards();
    sumOfCards();
    fakeRender();
    hideBets();
    resultsEl.textContent = "";
    if (playerSum === 21) {
        resultsEl.textContent = `Blackjack! You have ${playerSum}.`
        setTimeout(processWin, 1500);
    }
    if (dealerSum === 21) {
        resultsEl.textContent = `The dealer has hit Blackjack. He had ${dealerSum}.`
        processLose();
    }
}

function createDeck(){
    bjApp.deck = [];
    for (let a=0; a < bjApp.suit.length; a++) {
        for (let b=0; b < bjApp.face.length; b++) {
            let cardValue = b + 1;
            var cardTitle = "";
            if (cardValue > 10) {
                cardValue = 10;
            }
            if (cardValue != 1) {
                cardTitle += (bjApp.face[b] + ' of ' + bjApp.suit[a] + ' (' + cardValue + ")");
            }
            else {
                cardTitle += (bjApp.face[b] + " of " + bjApp.suit[a] + ' (' + cardValue + ' or 11)');
            }
            let newCard = new card(bjApp.suit[a], cardValue, cardTitle);
            bjApp.deck.push(newCard);
        }
    }
    shuffleDeck();
};

function sumOfCards() {
    let playerTotal = bjApp.playerHand.map(card => card.value)
    let dealerTotal = bjApp.dealerHand.map(card => card.value)
    playerSum =  playerTotal.reduce((a, b) => {
        return a + b
    });
    dealerSum = dealerTotal.reduce((a, b) => {
        return a + b;
    });
    let pAces = 0;
    let dAces = 0;
    for (let i = 0; i < playerTotal.length; i++){
        if (playerTotal[i] == 1){
            pAces += 1;
        }
        for (let x = 0; x < pAces; x++) {
            if (playerSum + 10 <= 21){
                playerSum += 10;
            }
        }
    }
    for (let i = 0; i < dealerTotal.length; i++){
        if (dealerTotal[i] == 1){
            dAces += 1;
        }
        for (let y = 0;  y < dAces; y++){
            if (dealerSum + 10 <= 21) {
                dealerSum += 10;
            }
        }
    }
}

function dealCards(){
    bjApp.playerHand = [];
    bjApp.dealerHand = [];
    bjApp.dealerHand.push(bjApp.deck.pop());
    bjApp.playerHand.push(bjApp.deck.pop());
    bjApp.playerHand.push(bjApp.deck.pop());
}

function hit(){
    bjApp.playerHand.push(bjApp.deck.pop());
    sumOfCards();
    fakeRender();
    if (playerSum > 21){
        resultsEl.textContent = `You have busted with ${playerSum} You have lost ${player.bet}.`;
        setTimeout(processLose, 1500);
    }
    if (playerSum === 21) {
        resultsEl.textContent = `Blackjack! You have ${playerSum}. You have won ` + player.bet * 2;
        setTimeout(processWin, 1500);
    }
}

function stand(){
    computerTurn();
    render();
}

function computerTurn(){
    if (dealerSum < 17) {
        bjApp.dealerHand.push(bjApp.deck.pop());
        sumOfCards();
        render();
        setTimeout(computerTurn, 1200);
    } else winCondition();
}


//Weird function to hide a dealers card
function fakeRender(){
    moneyEl.textContent = player.bank;
    betEl.textContent = player.bet;
    let playerCards = bjApp.playerHand.map(card => card.face)
    let dealerCards = bjApp.dealerHand.map(card => card.face)
    pHandEl1.textContent = playerCards;
    dHandEl1.textContent = dealerCards + "Hidden Card";
    pTotalEl.textContent = playerSum;
    dTotalEl.textContent = dealerSum;
}
// real function to render elements on the page
function render(){
    moneyEl.textContent = player.bank;
    betEl.textContent = player.bet;
    let playerCards = bjApp.playerHand.map(card => card.face)
    let dealerCards = bjApp.dealerHand.map(card => card.face)
    pHandEl1.textContent = playerCards;
    dHandEl1.textContent = dealerCards;
    pTotalEl.textContent = playerSum;
    dTotalEl.textContent = dealerSum;
}


function reset(){
    betEl.textContent = "0";
    player.bet = 0;
    bjApp.playerHand = [];
    bjApp.dealerHand = [];
    bjApp.deck = createDeck();
    playerSum = 0;
    dealerSum = 0;
    showBets();
    render();
}


function winCondition() {
    if (playerSum > 21){
        resultsEl.textContent = `You have busted with ${playerSum} You have lost ${player.bet}`;
        processLose();
        reset();
        return
    }
    if (dealerSum > 21){
        resultsEl.textContent = `The dealer has busted with ${dealerSum} You have won ` + player.bet * 2;
        processWin();
        reset();
        return
    }
    if (playerSum < 22 && playerSum > dealerSum){
        resultsEl.textContent = `You have beat the dealer. The dealer had ${dealerSum} while you had ${playerSum}. You have won ` + player.bet * 2;
        processWin();
        reset();
        return
    }
    if (dealerSum < 22 && dealerSum > playerSum){
        resultsEl.textContent = `The dealer has beat you. The dealer had ${dealerSum} while you had ${playerSum}. You lost ` + player.bet;
        processLose();
        reset();
        return
    }
    if (dealerSum === playerSum){
        resultsEl.textContent = `The dealer and you have tied. You both had ${playerSum}. Your bet of ` + player.bet + " has been added back into your bankroll.";
        processTie();
        reset();
        return
    }
}

// function handleBet(target.textContent) {
//     if(player.bank < target) {
//     resultsEl.textContent = `you have $ ${player.bank} left.`
//     }
//     player.bank -= event.target;
//     player.bet += event.target;
//     render();
// } 

function bet1() {
    if (player.bank <= 0) {
        resultsEl.textContent = 'You do not have enough money'
        return;
    } else {
        player.bank -= 1;
        player.bet += 1;
        render();
    }
}

function bet5() {
    if (player.bank < 5) {
        resultsEl.textContent = 'You do not have enough money'
       return;
   } else {
        player.bank -= 5;
        player.bet += 5;
        render();
   }
}

function bet10() {
    if (player.bank < 10) {
        resultsEl.textContent = 'You do not have enough money'
       return;
   } else {
        player.bank -= 10;
        player.bet += 10;
        render();
   }
}

function bet25() {
    if (player.bank < 25) {
        resultsEl.textContent = 'You do not have enough money'
       return;
   } else {
       player.bank -= 25;
       player.bet += 25;
       render();
   }
}

function bet50() {
    if (player.bank < 50) {
        resultsEl.textContent = 'You do not have enough money'
       return;
   } else {
        player.bank -= 50;
        player.bet += 50;
        render();
   }
}

function processWin() {
    let winnings = player.bet * 2;
    player.bank += winnings;
    render();
    reset();
}

function processLose() {
    let winnings = player.bet * 0;
    player.bank += winnings;
    render();
    reset();
}

function processTie() {
    player.bank += player.bet;
    render();
    reset();
}

function shuffleDeck(){
    for (let i = bjApp.deck.length - 1; i > 0; i--) {
        const newIndex = Math.floor(Math.random() * (i +1))
        const oldValue = bjApp.deck[newIndex]
        bjApp.deck[newIndex] = bjApp.deck[i]
        bjApp.deck[i] = oldValue
    }
};
/// this causes the bet buttons to disappear
function hideBets(){
    document.getElementById('bet1').classList.add('hidden');
    document.getElementById('bet5').classList.add('hidden');
    document.getElementById('bet10').classList.add('hidden');
    document.getElementById('bet25').classList.add('hidden');
    document.getElementById('bet50').classList.add('hidden');
    document.getElementById('stand').classList.remove('hidden');
    document.getElementById('hit').classList.remove('hidden');
    document.getElementById('play').classList.add('hidden');
}
/// this allows the bet buttons to reappear after the round is over
function showBets(){
    document.getElementById('bet1').classList.remove('hidden');
    document.getElementById('bet5').classList.remove('hidden');
    document.getElementById('bet10').classList.remove('hidden');
    document.getElementById('bet25').classList.remove('hidden');
    document.getElementById('bet50').classList.remove('hidden');
    document.getElementById('stand').classList.add('hidden');
    document.getElementById('hit').classList.add('hidden');
    document.getElementById('play').classList.remove('hidden');
}
