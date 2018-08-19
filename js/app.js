/*
 * Create a list that holds all of your cards
 */
const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"]; 
let stack = new Array();
let hr=0,min=0,sec=0;
let noStar=0;
let noMoves=0;
let noOpenCard =0;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Initialize the game
function initialization(){
	let array = shuffle(icons);
	let deck = document.createElement('ul');
	deck.classList.add("deck");
    document.querySelector(".container").appendChild(deck);
	
	for(let i=0;i<16;i++){
        let a = document.createElement('li');
        a.classList.add("card");
        a.innerHTML = '<i class ="'+ array[i]+'">';
		deck.appendChild(a);
		clicked(a);
	}

	document.querySelector('.moves').innerHTML = "0";
	star(0);
}

//when user click card
function clicked(card) {
    card.addEventListener("click",function(){
    	card.classList.add("show", "open");
	    stack.push(card);
	    move();
	    //when user open two card, compare them
	    if(stack.length == 2){
	    	//same 
           if(stack[0].innerHTML== stack[1].innerHTML){
           		stack[0].classList.add("match");
           		stack[1].classList.add("match");
           	 	stack[1].removeEventListener("click", this);
           	 	stack.pop();
             	stack.pop();
             	noOpenCard=noOpenCard+2;
           }
           //difference 
           else{
            	setTimeout(function(){
             	stack[0].classList.remove("show","open");
             	stack[1].classList.remove("show","open");
             	stack.pop();
             	stack.pop();
           		},  300);  
           }
	    }
        result();
    })
 }

//restart game
function restart(obj){

	obj.addEventListener("click",function (){
        document.querySelector(".deck").remove();
		initialization();
		hr=0;min=0;sec=-1;
		noOpenCard=0;
	});
}
//Calculate number of move
function move(){
	let move = document.querySelector('.moves');
	move.innerHTML = Number(move.innerHTML)+1;
	star(Number(move.innerHTML));
}
//Calculate number of stars
function star(numOfMove){
	 noMoves = numOfMove; 
	 let stars = document.querySelector(".stars");
	 if(numOfMove>50){
	 	noStar=1;
        stars.innerHTML = `<li><i class="fa fa-star"></i></li>`;
	 }
	 else if (numOfMove>30){
	 	noStar=2;
	 	stars.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
	 }
	 else{
	 	noStar=3;
		stars.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
	 }
}

//timer----------------------------
function timer(){
	setTimeout( add, 1000 );
}

function add() {
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
        if (min >= 60) {
            min = 0;
            hr++;
        }
    }
    document.querySelector(".timer").innerHTML=FormatMe(hr)+':'+FormatMe(min)+':'+FormatMe(sec);
    timer();
}
function FormatMe(n) {
   return (n<10) ? '0'+n : n;
}
// timer end-------------------------

//pop up result of game when all cards are match. 
function result(){	
	if(noOpenCard>=16){
		setTimeout(function(){	
			if (confirm("Congratulations! You won! \nStars      "+ noStar+'\nMoves   '+noMoves+'\nTime      '+ 
				FormatMe(hr)+':'+FormatMe(min)+':'+FormatMe(sec)+'\n Do you want to try again？'
				)) {

			}
			document.querySelector(".deck").remove();
			noOpenCard=0;
			initialization();
	      	hr=0;min=0;sec=-1;
		},1000)
	}
}

//initial 
initialization();
timer();
let restartClicked = document.querySelector('.restart');
restart(restartClicked);
