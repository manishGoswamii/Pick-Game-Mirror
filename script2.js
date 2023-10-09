"use strict";
//Players, current score and total score targeted
const players = [
    //Player 1 at index 0
    {
        currentScore:document.querySelector(".main__player--first h3.total-score"),
        totalScore: document.querySelector(".main__player--first  h1.score"),
        active:true,
        playerBlock:document.querySelector(".main__player--first")
    },
    //Player 2 at index 1

    {
        currentScore:document.querySelector(".main__player--second h3.total-score"),
        totalScore: document.querySelector(".main__player--second  h1.score"),
        active:false,
        playerBlock:document.querySelector(".main__player--second")
    }
];

//start button, the button, other than exit button, to be enabled
const startBtn = document.querySelector(".footer__btn--start");

//exit button
const exitBtn = document.querySelector(".footer__btn--exit");

//newgame button, it will reset all the scores, overlays, turn-pointers
const newgameBtn = document.querySelector(".main__newgame");

//rolldice button, to be clicked by user till the user gets 1 or user presses hold button
const rolldiceBtn = document.querySelector(".main__rolldice");

//hold button
const holdBtn = document.querySelector(".main__hold");

//dice image to be changed with each rolldice button event, and display the number obtained after the dice roll.
const diceImage = document.querySelector(".main__diceImage"); 

//overlay to be displayed over the non-current user. It convey that this is other player's turn.
const overlay = document.querySelector(".main__overlayLayer");

//the number generated from the dice roll. Range 1-6.
let randomNumber;

//buttons in the main section including newgame, rolldice and hold button.
const mainBtns = document.querySelectorAll(".main__button");

//reset function to be used for initial phase before the start button is clicked, and also for the newgame button.
function reset(gameover=false)
{
    if(startBtn.checkVisibility() || gameover)
    {       
        mainBtns.forEach((button)=>
        {
            button.disabled = true;
        }); 

        overlay.classList.add("visible");

    }

    else
    {
        players.forEach((player)=>
        {
            player.currentScore.textContent = 0;
            player.totalScore.textContent = 0;
        });
        mainBtns.forEach((button)=>
        {
            button.disabled = false;
        }); 
        currentPlayer.playerBlock.classList.remove("winner-background");

        players[0].active=true;
        players[1].active=false;
        overlay.classList.add("right-side");
        
        diceImage.classList.remove("visible");


    }
}
//to check if the element is enabled or not
function isEnabled(element)
{
    return !(element.disabled);
}

function addScore(player, number=player)
{

    if(number===player)
    {
        player.totalScore.textContent = +player.totalScore.textContent + +player.currentScore.textContent;
        
        return;
    }

    player.currentScore.textContent = +player.currentScore.textContent + number;

}

function scoreZero(player)
{
    player.currentScore.textContent=0;
    return;
}

function switchPlayers()
{
    if(players[0].active)
    {
        players[0].active=false;
        players[1].active=true;
        overlay.classList.remove("right-side");
        overlay.classList.add("left-side");
        return;
    }
    players[0].active=true;
    players[1].active=false;
    overlay.classList.add("right-side");
    overlay.classList.remove("left-side");



}

function showDiceImage(randomNumber)
{       
    // diceImage.classList.remove("hide");
    diceImage.classList.add("visible");
    diceImage.src=`images/dice-${randomNumber}.png`;
}

function showAnimation()
{
    diceImage.classList.add("animationForOne");
    setTimeout(function()
    {
        diceImage.classList.remove("animationForOne");
    },2000);
}

function checkWinner(player)
{
    if(+player.totalScore.textContent +  +player.currentScore.textContent >=30)
    {   
        player.totalScore.textContent = "30+ Score. WINNER!";
        player.playerBlock.classList.add("winner-background");
        reset(true);
        newgameBtn.disabled=false;
        diceImage.classList.remove("visible");

        mainBtns.forEach(function(button)
        {
            button.classList.remove("hovered");
        });

        return false;
    }

    return true;


}

let currentPlayer;
reset();

//Start button event to enable buttons and hide half overlay
startBtn.addEventListener("click",function()
{

    overlay.classList.add("half-width","right-side");
    mainBtns.forEach((button)=>
    {
        button.disabled=false;
    }); 

    startBtn.classList.add("hide");

});

//Exit button event to close the window
exitBtn.addEventListener("click", function()
{
    window.close();
});

//newgame button event to reset scores
newgameBtn.addEventListener("click", function()
{
    reset();

});

rolldiceBtn.addEventListener("click", function()
{   
    currentPlayer=players[0].active?players[0]:players[1];
    randomNumber = Math.floor(Math.random() * 6) + 1;
    holdBtn.disabled=true;
    rolldiceBtn.disabled=true;
    showDiceImage(randomNumber);

    if(randomNumber===1)
    {   
        rolldiceBtn.disabled=true;
        holdBtn.disabled=true;
        scoreZero(currentPlayer);
        showAnimation();
        setTimeout(function()
        {
            rolldiceBtn.disabled=false;
            holdBtn.disabled=false;
            switchPlayers();
            diceImage.classList.remove("visible");
        },2000);

    }
    else
    {
        
        addScore(currentPlayer,randomNumber);
        
        if(checkWinner(currentPlayer))
        {

            setTimeout(function()
            {   
                diceImage.classList.remove("visible");
                switchPlayers();
                rolldiceBtn.disabled=false;
                holdBtn.disabled=false;
                
            },2000);
        }
    }

});

holdBtn.addEventListener("click",function()
{
    currentPlayer=players[0].active?players[0]:players[1];
    addScore(currentPlayer);
    scoreZero(currentPlayer); 
    switchPlayers();

});


//hover effect for buttons, when mouse enters the button
mainBtns.forEach((button)=>
{
    button.addEventListener("mouseenter", function()
    {
        if(isEnabled(button))
        {
            button.classList.add("hovered");
        }
    });
    button.addEventListener("mouseleave", function()
    {   
        if(isEnabled(button))
        {
            button.classList.remove("hovered");
        }
    });
});


