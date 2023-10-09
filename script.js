"use strict";

const mainBtns = document.querySelectorAll(".main__button");

const startBtn = document.querySelector(".footer__btn--start");

const overlay1 = document.querySelector(".main__overlayLayer--first");

const overlay2 = document.querySelector(".main__overlayLayer--second");

const overlays = document.querySelectorAll(".main__overlayLayer");

const closeBtn  = document.querySelector(".footer__btn--exit");

const rollDiceBtn = document.querySelector(".main__rolldice");

const holdBtn = document.querySelector(".main__hold");

const newgameBtn = document.querySelector(".main__newgame");

let randomNumber;
let winnerFound = false;

const players = 
[
        {
            currentScore : document.querySelector(".main__player--first .score"),

            totalScore:   document.querySelector(".main__player--first .total-score")
        },
        {
            currentScore:document.querySelector(".main__player--second .score"),

            totalScore: document.querySelector(".main__player--second .total-score")
        }
];

//image to be changed with the dice number
const diceImage = document.querySelector(".main__diceImage");

const pointers = document.querySelectorAll(".section__turn");

let chances = 5;

function hideElement(element)
{
    element.classList.remove("visible");
}

function showElement(element)
{
    element.classList.add("visible");
}

function isVisible(element)
{
    return element.classList.contains("visible");
}

//For changing dice pictures
function setDicePic(number)
{   
    showElement(diceImage);
    diceImage.src=`images/dice-${randomNumber}.png`;
}

//disable all option buttons.
mainBtns.forEach(function (element)
{
    element.disabled=true;
})

//To show overlays before starting the game
overlays.forEach(function(element)
{
    element.classList.add("visible");
});


//start button
startBtn.addEventListener("click", function()
{   
    showElement(pointers[0]);
    mainBtns.forEach(function (element)
    {
        element.disabled=false;
    });  

    hideElement(overlay1);
    startBtn.style.display="none";
});


//close button
closeBtn.addEventListener("click",function()
{
    window.close();
});


newgameBtn.addEventListener("click",function()
{   
    players[0].currentScore.textContent=0;
    players[0].totalScore.textContent=0;
    players[1].currentScore.textContent=0;
    players[1].totalScore.textContent=0;

    hideElement(overlay1);
    showElement(overlay2);
    hideElement(diceImage);
    holdBtn.disabled=false;
    rollDiceBtn.disabled=false;
    mainBtns.forEach(function(button)
    {
        button.classList.remove("hovered");
    });
});





function addScore(element,number)
{
    //for addition to currentScore.   
    if(number===randomNumber)
    {
        element.textContent = +element.textContent + number;
    }
    //for addition to total score.
    else
    {
        element.textContent = +element.textContent + +number.textContent;
    }
    
}


function setScoreToZero(player)
{
    player.textContent=0;
}

function winner(player)
{
    winnerFound=true;
    player.totalScore.textContent = "WINNER!";
    rollDiceBtn.disabled=true;
    holdBtn.disabled=true;
    if(currentPlayer===players[0])
    {
        showElement(overlay2);
        hideElement(overlay1);
    }
    else
    {
        showElement(overlay1);
        hideElement(overlay2);    
    }

    hideElement(diceImage);
    pointers.forEach((element)=>hideElement(element));
    
}

function draw()
{

}

let currentPlayer = players[0];
rollDiceBtn.addEventListener("click",function()
{ 
    this.disabled=true;
    diceImage.classList.remove("animationForOne");

    setTimeout(()=>
    {
        if(winnerFound)
        {
            return;
        }

        rollDiceBtn.disabled=false;
        hideElement(diceImage);
        if(isVisible(pointers[0]))
        {
            showElement(pointers[1]);
            hideElement(pointers[0]);
        }
        else
        {
            showElement(pointers[0]);
            hideElement(pointers[1]);
        }
        
        if(isVisible(overlay1))
        {
            showElement(overlay2);
            hideElement(overlay1);
        }
        else
        {
            showElement(overlay1);
            hideElement(overlay2);
        }
        
        currentPlayer = isVisible(overlay2)?players[0]:players[1];


    },2000);

    if(chances>10)
    {
        draw();
    }
    
    randomNumber = Math.floor(Math.random()*6) + 1;
    switch(randomNumber)
    {
        case 1:
        {
            setScoreToZero(currentPlayer.currentScore);

        }
                break;

        default :
        {
            addScore(currentPlayer.currentScore,randomNumber);
           
        }

    }

    if(+currentPlayer.totalScore.textContent + randomNumber>=20 || (+currentPlayer.currentScore.textContent >=20) || (+currentPlayer.currentScore.textContent + +currentPlayer.totalScore.textContent >=20) )
    {
        winner(currentPlayer);
        return;
    }


    setDicePic(randomNumber);
    if(randomNumber===1)
    {   
        diceImage.classList.add("animationForOne");
    }
});

holdBtn.addEventListener("click",function ()
{
    addScore(currentPlayer.totalScore, currentPlayer.currentScore);
    currentPlayer.currentScore.textContent=0;
    if(+currentPlayer.totalScore.textContent + randomNumber>=20)
    {
        winner(currentPlayer);
        return;
    }
    
});

//creating :hover effect using js
mainBtns.forEach(function(button)
{
    button.addEventListener("mouseenter",function()
    {   
        if(this.disabled)
        {
            return;
        }
        button.classList.add("hovered");
    });

    button.addEventListener("mouseleave",function()
    {
        if(this.disabled)
        {
            return;
        }
        button.classList.remove("hovered");
    });
});

