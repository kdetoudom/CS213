/* Variables global to this document: error values, dice, and a diceRoll */
const BAD_DICE_ROLL = -1;           /* Error value for number of dots on face of dice */
const BAD_DICE_FILE = "null";       /* Error value for image file for face of dice */
const BAD_DICE_TEXT = "no dots!";   /* Error string for number of dots on side of dice */

/* All the dice variables */
const diceOne = "images/dice1face.png";
const diceTwo = "images/dice2face.png";
const diceThree = "images/dice3face.png";
const diceFour = "images/dice4face.png";
const diceFive = "images/dice5face.png";
const diceSix = "images/dice6face.png";

let dice = [
    {   dots: 1, file: "images/dice1face.png", text: "1 dot " },
    {   dots: 2, file: "images/dice2face.png", text: "2 dots" },
    {   dots: 3, file: "images/dice3face.png", text: "3 dots" },
    {   dots: 4, file: "images/dice4face.png", text: "4 dots" },
    {   dots: 5, file: "images/dice5face.png", text: "5 dots" },
    {   dots: 6, file: "images/dice6face.png", text: "6 dots" }
];

let diceRoll = [
    {   dots: BAD_DICE_ROLL, file: BAD_DICE_FILE, text: BAD_DICE_TEXT },
    {   dots: BAD_DICE_ROLL, file: BAD_DICE_FILE, text: BAD_DICE_TEXT },
    {   dots: BAD_DICE_ROLL, file: BAD_DICE_FILE, text: BAD_DICE_TEXT }
];

function randomDiceRoll( sides )
{
    const rand = Math.random();                 /* in [0, 1), so rand * sides is in [0, sides) */
    const face = Math.floor(rand * sides);      /* in { 0, 1, ... sides-1 } because of floor */
    console.log( "(log) randomDiceRoll: sides = " + sides + ", face (base 0) = " + face);
    return dice[face];                          /* face is in { 0, 1, ... 5 } for a six-sided dice */
}

function dotsOK ( oneDice )
{
    /* Is the number of dots in the image file name and also in the text descriptor? */
    return oneDice.dots.toString() === oneDice.text.substring(0, 1) &&
        oneDice.file.match(oneDice.dots.toString()) != null;
}

/*Onload event handler which is called by body.onload() */
function setup()
{
    rollDiceRoll( diceRoll );
    displayDiceRoll( diceRoll );
    summarizeDiceRoll( diceRoll, "setup() via body onload event");
}
function rollDiceRoll( theRoll )
{
    const diceCount = theRoll.length;
    for (let index = 0; index < diceCount; index++) {
        theRoll[index] = randomDiceRoll( dice.length );
        const areDotsOK = dotsOK(theRoll[index]) ? "OK" : "Error!";
        console.log("(log) rollDiceRoll: index = " + index + ", dice = { dots = " +
            theRoll[index].dots + ", file = " + theRoll[index].file + ", " +
            areDotsOK + " }");
    }
}

function displayDiceRoll ( theRoll )
{
    const diceCount = theRoll.length;
    for ( let index = 0; index < diceCount; index++ ) {
        const idNumber = index + 1;
        const divId = "ComputerImgbox" + idNumber.toString();
        let thisImg = document.getElementById( divId ).firstElementChild;
        /* console.log ( "(log) displayDiceRoll: divID = " + divId + ", thisImg = " + thisImg ); */
        thisImg.src = theRoll[index].file;
        thisImg.alt = theRoll[index].text;
    }
}

function summarizeDiceRoll( theRoll, fromWhere )
{
    const diceCount = theRoll.length;
    let   minIndex = 0;
    let   minRoll = theRoll[minIndex].dots;
    let   maxIndex = 0;
    let   maxRoll = theRoll[maxIndex].dots;

    for( let index=1; index < diceCount; index++ ) {
        if( theRoll[index].dots < minRoll ) {
            minIndex = index;
            minRoll = theRoll[minIndex].dots;
        }
        if (theRoll[index].dots > maxRoll) {
            maxIndex = index;
            maxRoll = theRoll[maxIndex].dots;
        }
    }

    const Head1st = "[Summary from " + fromWhere + "]";
    const Para1st = "Minimum roll is " + minRoll + ", first found in position " + minIndex + " (base 0)";
    const Para2nd = "Maximum roll is " + maxRoll + ", first found in position " + maxIndex + " (base 0)";

    /*
     * document.getElementById("ComputerHead1st").innerHTML = Head1st;
     * document.getElementById("ComputerPara1st").innerHTML = Para1st;
     * document.getElementById("ComputerPara2nd").innerHTML = Para2nd;
     */
}

function rollDiceAgain()
{
    rollDiceRoll( diceRoll );
    displayDiceRoll( diceRoll );
    summarizeDiceRoll( diceRoll, "rollDiceAgain() via button click event" + numDots);
}

function flipDice()
{
    let changeDice = document.getElementById('changeDice');
    console.log("(log) flipDice: src = " + changeDice.src + ", alt = " + changeDice.alt );
    console.log("(log) match One = " + changeDice.src.match("diceOne"));
    console.log("(log) match Two = " + changeDice.src.match("diceTwo"));
    console.log("(log) match Three = " + changeDice.src.match("diceThree"));
    console.log("(log) match Four = " + changeDice.src.match("diceFour"));
    console.log("(log) match Five = " + changeDice.src.match("diceFive"));
    console.log("(log) match Six = " + changeDice.src.match("diceSix"));
    if (changeDice.src.match("dice1face")) {
        changeDice.src = diceSix;
    }
    else if (changeDice.src.match("dice2face")) {
        changeDice.src = diceFive;
    }
    else if (changeDice.src.match("dice3face")) {
        changeDice.src = diceFour;
    }
    else if (changeDice.src.match("dice4face")) {
        changeDice.src = diceThree;
    }
    else if (changeDice.src.match("dice5face")) {
        changeDice.src = diceTwo;
    }
    else if (changeDice.src.match("dice6face")) {
        changeDice.src = diceOne;
    }
    else {
        console.log("(log) flipDice: Ouch! Dice is not One, Two, Three, Four, Five or Six!");
    }
}

function changeDiceTwo () {
    let rand = Math.floor (Math.random() * 6);
    let ComputerImgBox2 = document.getElementById("changeDiceTwo");
    diceRoll[1].dots = rand;
    ComputerImgBox2.src = dice[rand].file;
    ComputerImgBox2.alt = dice[rand].text;
    console.log ("(log) changeDiceTwo: rand = " + "; dice[1].dots = " + dice[1].dots);
}

function displayDate() {
    document.getElementById("aside").innerHTML = Date();
}

function displayDiceValue () {
    document.getElementById("aside").innerHTML = "Second dice has " + diceRoll[1].text;
}

function diceThreeValue () {
    const diceThreeText = "Third dice is " + diceRoll[2].dots;
    document.getElementById("diceThree").innerHTML.alt = "Dice three has " + diceThreeText;
    console.log ("(log) diceThree: " + document.getElementById("diceThree").alt);
    alert(diceThreeText);
}