// Varibles
const bjApp = {};

bjApp.suit = ["Hearts", "Spades", "Clovers", "Diamonds"]
bjApp.value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
bjApp.face = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"]
bjApp.playerHand = [];
bjApp.dealerHand = [];
bjApp.deck = [];
bjApp.randomCard =[];
bjApp.dealerImg = [];
bjApp.playerImg = [];

// card constructor
function card(suit, value, face, imgValue) {
    this.suit = suit;
    this.value = value;
    this.face = face;
    this.imgValue = imgValue;
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
const pHandEl3 = document.getElementById('phand3')
const pHandEl4 = document.getElementById('phand4')
const pHandEl5 = document.getElementById('phand5')
const pHandEl6 = document.getElementById('phand6')
const pHandEl7 = document.getElementById('phand7')
const dHandEl3 = document.getElementById('dhand3')
const dHandEl4 = document.getElementById('dhand4')
const dHandEl5 = document.getElementById('dhand5')
const dHandEl6 = document.getElementById('dhand6')
const dHandEl7 = document.getElementById('dhand7')



// event listeners
document.querySelector('#bet1').addEventListener('click', handleBet);
document.querySelector('#bet5').addEventListener('click', handleBet);
document.querySelector('#bet10').addEventListener('click', handleBet);
document.querySelector('#bet25').addEventListener('click', handleBet);
document.querySelector('#bet50').addEventListener('click', handleBet);
document.querySelector('#hit').addEventListener('click', hit);
document.querySelector('#play').addEventListener('click', play);
document.querySelector('#stand').addEventListener('click', computerTurn)

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

// first loop goes through the suits (4 suits)
// second loop goes through the values (13 cards)

function createDeck(){
    bjApp.deck = [];
    for (let a=0; a < bjApp.suit.length; a++) {
        for (let b=0; b < bjApp.face.length; b++) {
            /// this part will add text per card
            let cardTitle = "";
            if ( b === 0) {
                cardTitle += `${bjApp.face[b]} of ${bjApp.suit[a]}(${bjApp.value[b]} or 11)`;
            }
            else {
                cardTitle += `${bjApp.face[b]} of ${bjApp.suit[a]}(${bjApp.value[b]})`;
            }
            /// this part asigns an imgValue per card which will later become a class tag to render a card picture
            let imgValue = "";
            if (a === 0){
                if (b === 9) {
                    imgValue += "h10";
                }
                else if (b === 10) {
                    imgValue += "hJ";
                }
                else if (b === 11) {
                    imgValue += "hQ";
                } 
                else if (b === 12) {
                    imgValue += "hK";
                } 
                else if (b === 0) {
                    imgValue += "hA";
                } 
                else {
                    imgValue = 'h'+0+bjApp.value[b];
                }
            }
            if (a === 1){
                if (b === 9) {
                    imgValue += "s10";
                }
                else if (b === 10) {
                    imgValue += "sJ";
                }
                else if (b === 11) {
                    imgValue += "sQ";
                }
                else if (b === 12) {
                    imgValue += "sK";
                }
                else if (b === 0) {
                    imgValue += "sA"
                }
                else {
                    imgValue = 's'+0+bjApp.value[b] 
                } 
            }
            if (a === 2){
                if (b === 9) {
                    imgValue += "c10"
                }
                else if (b === 10) {
                    imgValue += "cJ"
                }
                else if (b === 11) {
                    imgValue += "cQ"
                }
                else if (b === 12) {
                    imgValue += "cK"
                }
                else if (b === 0) {
                    imgValue += "cA"
                }
                else {
                    imgValue += 'c'+0+bjApp.value[b] 
                } 
            }
            if (a === 3){
                if (b === 9) {
                    imgValue += "d10"
                }
                else if (b === 10) {
                    imgValue += "dJ"
                }
                else if (b === 11) {
                    imgValue += "dQ"
                }
                else if (b === 12) {
                    imgValue += "dK"
                }
                else if (b === 0) {
                    imgValue += "dA"
                }
                else {
                    imgValue += 'd'+0+bjApp.value[b] 
                } 
            }
            let newCard = new card(bjApp.suit[a], bjApp.value[b], cardTitle, imgValue);
            bjApp.deck.push(newCard);
        }
    }
} 

function printImg(){
    let playerImg = bjApp.playerHand.map(card => card.imgValue);
    let dealerImg = bjApp.dealerHand.map(card => card.imgValue);
    dHandEl2.classList.add("card", dealerImg[0])
    dHandEl3.classList.add("card", dealerImg[1])
    dHandEl4.classList.add("card", dealerImg[2])
    dHandEl5.classList.add("card", dealerImg[3])
    dHandEl6.classList.add("card", dealerImg[4])
    dHandEl7.classList.add("card", dealerImg[5])
    pHandEl2.classList.add("card", playerImg[0])
    pHandEl3.classList.add("card", playerImg[1])
    pHandEl4.classList.add("card", playerImg[2])
    pHandEl5.classList.add("card", playerImg[3])
    pHandEl6.classList.add("card", playerImg[4])
    pHandEl7.classList.add("card", playerImg[5])
}



function pickRandomCard(){
    bjApp.randomNum = Math.floor(Math.random() * bjApp.deck.length);
    bjApp.randomCard = bjApp.deck.splice(bjApp.randomNum, 1);
}

function playerHit(){
    pickRandomCard();
    bjApp.playerHand.push(bjApp.randomCard.pop());
}

function dealerHit(){
    pickRandomCard();
    bjApp.dealerHand.push(bjApp.randomCard.pop());
}

// this function will make a new array with the card values of each hand.
// this function uses the .reduce method to the new array to gather the sum of the cards

function sumOfCards() {
    let playerTotal = bjApp.playerHand.map(card => card.value)
    let dealerTotal = bjApp.dealerHand.map(card => card.value)
    playerSum =  playerTotal.reduce((a, b) => {
        return a + b
    });
    dealerSum = dealerTotal.reduce((a, b) => {
        return a + b;
    });

    //  checks for aces. if an ace is found, does an if statement to check if the sum is under 22. 
    //  if under 22 it will add 10 to make the value of the ace 11
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

//we only deal 3 cards and give a "fake" hidden card to the dealer

function dealCards(){
    playerHit();
    dealerHit();
    playerHit();
}

// this function is used for the player whenever they request another card

function hit(){
    playerHit();
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

function computerTurn(){
    if (dealerSum < 17) {
        dealerHit();
        sumOfCards();
        render();
        setTimeout(computerTurn, 1200);
    } else winCondition();
}


//Weird function to hide a dealers card. All renders before computerTurn() should use this function.
function fakeRender(){
    moneyEl.textContent = player.bank;
    betEl.textContent = player.bet;
    let playerCards = bjApp.playerHand.map(card => card.face)
    let dealerCards = bjApp.dealerHand.map(card => card.face)
    pHandEl1.textContent = playerCards;
    dHandEl1.textContent = dealerCards + ", Hidden Card";
    pTotalEl.textContent = playerSum;
    dTotalEl.textContent = dealerSum;
    printImg();
}
// real function to render ALL elements on the page. All renders after computerTurn() should use this function.
function render(){
    moneyEl.textContent = player.bank;
    betEl.textContent = player.bet;
    let playerCards = bjApp.playerHand.map(card => card.face)
    let dealerCards = bjApp.dealerHand.map(card => card.face)
    pHandEl1.textContent = playerCards;
    dHandEl1.textContent = dealerCards;
    pTotalEl.textContent = playerSum;
    dTotalEl.textContent = dealerSum;
    printImg();
}

// Hard resets all current elements on the board and returns to original state
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
    resetImg();
}

// win logic behind determining the winner
function winCondition() {
    if (playerSum > 21){
        resultsEl.textContent = `You have busted with ${playerSum}. You have lost ${player.bet}`;
        processLose();
        reset();
        return
    }
    if (dealerSum > 21){
        resultsEl.textContent = `The dealer has busted with ${dealerSum}. You have won ` + player.bet * 2;
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
        resultsEl.textContent = `The dealer and you have tied. You both had ${playerSum}. Your bet of ${player.bet}has been added back into your bankroll.`;
        processTie();
        reset();
        return
    }
}

//bet functions

function handleBet(x) {
    let betValue = Number(this.textContent)
    if(player.bank < betValue) {
        resultsEl.textContent = `You cannot bet ${betValue}. You have $ ${player.bank} left.`
        return;
    }
    player.bank -= betValue;
    player.bet += betValue;
    render();
} 

// these functions is invoked after a winner is determined

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

function resetImg(){
    dHandEl2.classList.remove("card","dA","dK", "dQ", "dJ", "d10", "d09", "d08", "d07", "d06", "d05", "d04", "d03", "d02","hA","hK", "hQ", "hJ", "h10", "h09", "h08", "h07", "h06", "h05", "h04", "h03", "h02","sA","sK", "sQ", "sJ", "s10", "s09", "s08", "s07", "s06", "s05", "s04", "s03", "s02","cA","cK", "cQ", "cJ", "c10", "c09", "c08", "c07", "c06", "c05", "c04", "c03", "c02")
    dHandEl3.classList.remove("card","dA","dK", "dQ", "dJ", "d10", "d09", "d08", "d07", "d06", "d05", "d04", "d03", "d02","hA","hK", "hQ", "hJ", "h10", "h09", "h08", "h07", "h06", "h05", "h04", "h03", "h02","sA","sK", "sQ", "sJ", "s10", "s09", "s08", "s07", "s06", "s05", "s04", "s03", "s02","cA","cK", "cQ", "cJ", "c10", "c09", "c08", "c07", "c06", "c05", "c04", "c03", "c02")
    dHandEl4.classList.remove("card","dA","dK", "dQ", "dJ", "d10", "d09", "d08", "d07", "d06", "d05", "d04", "d03", "d02","hA","hK", "hQ", "hJ", "h10", "h09", "h08", "h07", "h06", "h05", "h04", "h03", "h02","sA","sK", "sQ", "sJ", "s10", "s09", "s08", "s07", "s06", "s05", "s04", "s03", "s02","cA","cK", "cQ", "cJ", "c10", "c09", "c08", "c07", "c06", "c05", "c04", "c03", "c02")
    dHandEl5.classList.remove("card","dA","dK", "dQ", "dJ", "d10", "d09", "d08", "d07", "d06", "d05", "d04", "d03", "d02","hA","hK", "hQ", "hJ", "h10", "h09", "h08", "h07", "h06", "h05", "h04", "h03", "h02","sA","sK", "sQ", "sJ", "s10", "s09", "s08", "s07", "s06", "s05", "s04", "s03", "s02","cA","cK", "cQ", "cJ", "c10", "c09", "c08", "c07", "c06", "c05", "c04", "c03", "c02")
    dHandEl6.classList.remove("card","dA","dK", "dQ", "dJ", "d10", "d09", "d08", "d07", "d06", "d05", "d04", "d03", "d02","hA","hK", "hQ", "hJ", "h10", "h09", "h08", "h07", "h06", "h05", "h04", "h03", "h02","sA","sK", "sQ", "sJ", "s10", "s09", "s08", "s07", "s06", "s05", "s04", "s03", "s02","cA","cK", "cQ", "cJ", "c10", "c09", "c08", "c07", "c06", "c05", "c04", "c03", "c02")
    dHandEl7.classList.remove("card","dA","dK", "dQ", "dJ", "d10", "d09", "d08", "d07", "d06", "d05", "d04", "d03", "d02","hA","hK", "hQ", "hJ", "h10", "h09", "h08", "h07", "h06", "h05", "h04", "h03", "h02","sA","sK", "sQ", "sJ", "s10", "s09", "s08", "s07", "s06", "s05", "s04", "s03", "s02","cA","cK", "cQ", "cJ", "c10", "c09", "c08", "c07", "c06", "c05", "c04", "c03", "c02")
    pHandEl2.classList.remove("card","dA","dK", "dQ", "dJ", "d10", "d09", "d08", "d07", "d06", "d05", "d04", "d03", "d02","hA","hK", "hQ", "hJ", "h10", "h09", "h08", "h07", "h06", "h05", "h04", "h03", "h02","sA","sK", "sQ", "sJ", "s10", "s09", "s08", "s07", "s06", "s05", "s04", "s03", "s02","cA","cK", "cQ", "cJ", "c10", "c09", "c08", "c07", "c06", "c05", "c04", "c03", "c02")
    pHandEl3.classList.remove("card","dA","dK", "dQ", "dJ", "d10", "d09", "d08", "d07", "d06", "d05", "d04", "d03", "d02","hA","hK", "hQ", "hJ", "h10", "h09", "h08", "h07", "h06", "h05", "h04", "h03", "h02","sA","sK", "sQ", "sJ", "s10", "s09", "s08", "s07", "s06", "s05", "s04", "s03", "s02","cA","cK", "cQ", "cJ", "c10", "c09", "c08", "c07", "c06", "c05", "c04", "c03", "c02")
    pHandEl4.classList.remove("card","dA","dK", "dQ", "dJ", "d10", "d09", "d08", "d07", "d06", "d05", "d04", "d03", "d02","hA","hK", "hQ", "hJ", "h10", "h09", "h08", "h07", "h06", "h05", "h04", "h03", "h02","sA","sK", "sQ", "sJ", "s10", "s09", "s08", "s07", "s06", "s05", "s04", "s03", "s02","cA","cK", "cQ", "cJ", "c10", "c09", "c08", "c07", "c06", "c05", "c04", "c03", "c02")
    pHandEl5.classList.remove("card","dA","dK", "dQ", "dJ", "d10", "d09", "d08", "d07", "d06", "d05", "d04", "d03", "d02","hA","hK", "hQ", "hJ", "h10", "h09", "h08", "h07", "h06", "h05", "h04", "h03", "h02","sA","sK", "sQ", "sJ", "s10", "s09", "s08", "s07", "s06", "s05", "s04", "s03", "s02","cA","cK", "cQ", "cJ", "c10", "c09", "c08", "c07", "c06", "c05", "c04", "c03", "c02")
    pHandEl6.classList.remove("card","dA","dK", "dQ", "dJ", "d10", "d09", "d08", "d07", "d06", "d05", "d04", "d03", "d02","hA","hK", "hQ", "hJ", "h10", "h09", "h08", "h07", "h06", "h05", "h04", "h03", "h02","sA","sK", "sQ", "sJ", "s10", "s09", "s08", "s07", "s06", "s05", "s04", "s03", "s02","cA","cK", "cQ", "cJ", "c10", "c09", "c08", "c07", "c06", "c05", "c04", "c03", "c02")
    pHandEl7.classList.remove("card","dA","dK", "dQ", "dJ", "d10", "d09", "d08", "d07", "d06", "d05", "d04", "d03", "d02","hA","hK", "hQ", "hJ", "h10", "h09", "h08", "h07", "h06", "h05", "h04", "h03", "h02","sA","sK", "sQ", "sJ", "s10", "s09", "s08", "s07", "s06", "s05", "s04", "s03", "s02","cA","cK", "cQ", "cJ", "c10", "c09", "c08", "c07", "c06", "c05", "c04", "c03", "c02")
}