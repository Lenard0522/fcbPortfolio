let board;
let score = 0;
let rows = 4;
let columns = 4;

let is2048Exist = false;
let is4096Exist = false;
let is8192Exist = false;

//declaring variable used for touch input
let startX= 0;
let startY= 0;


// Function are callable programmed tasks
function setGame (){

	//Initializes the 4x4 game board will all tiles set to 0
	board = [
		[0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
	]

	for(let r=0; r<rows; r++){

		for(let c=0; c<columns; c++){

			// This is to create a tile through creating div elements
				let tile = document.createElement("div");

			// Each tile will have an id based on its row position and column position. 
            // Imagine students in a room who are given an id,
            // but their id number is based on their seat row and column position.

			tile.id = r.toString() + "-" + c.toString();

			// Get the number of a tile from a backend board
			let num = board[r][c];

			// Use the number to update the tile's appearance through updateTile() function
			updateTile(tile, num);

			// Add the created tile with id to the frontend game board container.
			document.getElementById("board").append(tile);
		}

	}

	setTwo();
	setTwo();
}

// This function is to update the appearance of the tile based on its number
function updateTile(tile, num){

	tile.innerText="";
	tile.classList.value="";

	tile.classList.add("tile");

	if(num > 0) {
        // This will display the number of the tile 
        tile.innerText = num.toString();
           
        if (num <= 4096){
            tile.classList.add("x"+num.toString());
        } else {
            // Then if the num value is greater than 4096, it will use class x8192 to color the tile
            tile.classList.add("x8192");
        }
    }
}

window.onload = function() {
	setGame();

}

function handleSlide(e){

	console.log(e.code);

	if(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]. includes(e.code)){

		if(e.code== "ArrowLeft"){

			slideLeft();
			setTwo();
		}
		else if(e.code== "ArrowRight"){

			slideRight();
			setTwo();
		}
		else if(e.code== "ArrowUp"){

			slideUp();
			setTwo();
		}
		else if(e.code== "ArrowDown"){

			slideDown();
			setTwo();
		}

	}

		

			setTimeout(() => {
			checkWin();
		}, 1000)

		document.getElementById("score").innerText = score;

		if(hasLost() == true){

			setTimeout(() => {

				
				alert("BOBO KA TANGINAMO APAKA TANGA MO TANGAINAMO KA TALO KA NA");
				restartGame();
				alert("Click any arrow key to restart");

		} ,100);

	}
}


document.addEventListener("keydown", handleSlide);

// this function removes the zeroes from the row / col
function filterZero(row){

	return row.filter(num => num != 0);
}

// slide function is the one merging the adjecent tiles
function slide(row){


	row = filterZero(row);

	for(let i = 0; i<row.length -1; i++){
		if(row[i] == row[i+1]){
			row[i] *= 2;
			row[i + 1] = 0;

			score += row[i];
		}
	}

	row = filterZero(row);

	// Add zeroes on the back after merging
	while(row.length < columns){
		row.push(0);
	}

	return row;
}

	

function slideLeft() {

	for(let r = 0; r < rows; r++){
        let row = board[r];

        //Line for animation
        let originalRow = row.slice();

        row = slide(row);
        board[r] = row;
        
        for(let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            
            //Line for animation 

            if(originalRow[c] !== num && num !== 0){

            	setTimeout(() => {

            		tile.style.animation = "slide-from-right 0.3s"

            	}, )
            }

            updateTile(tile, num);


        }
    }
}

function slideRight() {

	for(let r = 0; r < rows; r++){
        let row = board[r];

        let originalRow = row.slice();

        row.reverse();
        row = slide(row);
        board[r] = row;
        row.reverse();
        for(let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            
            if(originalRow[c] !== num && num !== 0){

            	setTimeout(() => {

            		tile.style.animation = "slide-from-left 0.3s"

            	}, )
       	 	}
       	 	updateTile(tile, num);
   		 }
    		
	}
}

function slideUp() {

	for(let c = 0; c < columns; c++){
        let col = [board[0][c], board[1][c], board[2][c], board[3][c]];

        let originalCol = col.slice();

        col = slide(col);
      
        let changedIndeces = [];
        for (let r = 0; r < rows; r++){
        	if(originalCol[r] !== col[r]){
        		changedIndeces.push();
        	}
        }

        for(let r = 0; r < rows; r++){
        	board[r][c] = col[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];

            if(changedIndeces.includes(r) !== num && num !== 0){

			tile.style.animation = "slide-from-bottom 0.3s"

            	setTimeout(() => {

            		tile.style.animation = " "

           	 	}, ) 
        	}
       		 updateTile(tile, num);
    	}
	}
}

function slideDown() {

	for(let c = 0; c < columns; c++){
        let col = [board[0][c], board[1][c], board[2][c], board[3][c]];

		let originalCol = col.slice();

		col.reverse();
        col = slide(col)
        col.reverse();

        let changedIndeces = [];
        for (let r = 0; r < rows; r++){
        	if(originalCol[r] !== col[r]){
        		changedIndeces.push(r);
        	}
        }

        for(let r = 0; r < rows; r++){
        	board[r][c] = col[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];

            if(changedIndeces.includes(r) !== num && num !== 0){

			tile.style.animation = "slide-from-top 0.3s"

            	setTimeout(() => {

            		tile.style.animation = " "

           	 	}, ) 
        	}
       		 updateTile(tile, num);
        }
    }
}


function hasEmptyTile(){

	for(let r = 0; r < rows; r++){
		for(let c = 0; c < columns; c++){

			if(board[r][c] == 0){
				return true;
			}
		}
	}

	return false;
}

function setTwo(){
	if(hasEmptyTile() == false){
		return;
	}

	// These next codes is for generating the random 2
	let found = false;

	while(found == false){
		let r = Math.floor(Math.random() * rows);
		let c = Math.floor(Math.random() * columns);

		if (board[r][c]==0){

			board[r][c]=2;
			let tile= document.getElementById(r.toString() + "-" + c.toString());
			tile.innerText="2";
			tile.classList.add("x2");
			found=true;
		}
	}
}

// checkWin function checks if we already have 2048, 4096, or 8192
//in our tiles to congratulate in this accomplisment 
function checkWin(){

	for(let r = 0; r < rows; r++){
		for(let c = 0; c < columns; c++){

		if(board[r][c] == 2048 && is2048Exist == false){
				alert("You Win! You got the 2048");
				is2048Exist = true;
		}

			else if(board[r][c] == 4096 && is4096Exist == false){
				alert("LAH parang ewan, galing mo naman tanga ka");
				is4096Exist = true;
			}

				else if(board[r][c] == 8192 && is8192Exist == false){
				alert("Edi ikaw na, GC ka eh");
				is8192Exist = true;

			}
		}
	}
}

// haslost fucntion will check if there is still an empty tile (meaning, ther is still a possible move)
// and it will also check if there a same tile valid adjacent. (beside/ side by side / adjacent to each other. 
//meaning, there is still a possbile move)

function hasLost(){

	for(let r = 0; r < rows; r++){
		for(let c = 0; c < columns; c++){

			// this code will check if there is a tile that equal to zero (meaning, empty tile)
			if(board[r][c] === 0){
				return false;
			}

			const currentTile = board[r][c];

			// check if there are a two adjacent tiles
			if(

			//check current tile if it has possible 
				r > 0 && board[r-1][c] === currentTile ||
				r < rows - 1 && board[r + 1][c] === currentTile ||

				c > 0 && board[r][c-1] === currentTile ||
				c < columns - 1 && board[r][c+1] === currentTile
			)
			{
				//if we found a adjacent tile with the same values as the current tile, false, the user has not lost 
				return false;
			}


		} 

	}
// no empty tile and no possible moves left (meaning, true, the user already lost)
	return true;

}


function restartGame(){

	for(let r=0; r<rows; r++){
		for(let c=0; c<columns; c++){
			board[r][c] = 0; 
		}
	}

	score = 0;

	setTwo();
}

//touchscreen logic

document.addEventListener("touchstart", (e) => {
	startX= e.touches[0].clientX;
	startY= e.touches[0].clientY;
});

document.addEventListener("touchmove", (e) => {
	if(!e.target.className.includes("tile")) {
		return
	}
	e.preventDefault();
}, {passive: false});

document.addEventListener("touchstart", (e) => {
    if (e.target.className.includes("tile")) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }
});

document.addEventListener("touchend", (e) => {
    if (!e.target.className.includes("tile")) {
        return;
    }

    let diffX = startX - e.changedTouches[0].clientX;
    let diffY = startY - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal swipe
        if (diffX > 0) {
            slideLeft(); // Call a function for sliding left
        } else {
            slideRight(); // Call a function for sliding right
        }
    } else {
        // Vertical swipe
        if (diffY > 0) {
            slideUp(); // Call a function for sliding up
        } else {
            slideDown(); // Call a function for sliding down
        }
        document.getElementById("score").innerText = score;

	checkWin();

	// Call hasLost() to check for game over conditions
	if (hasLost()) {
	    // Use setTimeout to delay the alert
	    setTimeout(() => {
	    alert("Game Over! You have lost the game. Game will restart");
	    restartGame();
	    alert("Click any key to restart");
	    }, 100); 
	}
    }

    setTwo(); // Call a function named "setTwo" after determining the swipe direction
});