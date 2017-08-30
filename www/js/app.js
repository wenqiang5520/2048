var board=[];
var hasMove=[];

var score;
var bestScore;

(function showBest(){
	if(localStorage.getItem("bestScore") != null){
		bestScore = localStorage.getItem("bestScore");
	}
	else{
		bestScore = 0;
	}
})();

function newGame(){
	score = 0;
	showScore();
	init();
	createNumBlock();
	createNumBlock();
}
newGame();

function init(){
	for(var i = 0;i < 4;i++){
		board[i]=[];
		hasMove[i]=[];
		for(var j = 0;j<4;j++){
			board[i][j] = 0;
			hasMove[i][j] = false;
			getID(i,j).innerHTML = " ";
		}
	}
}

function createNumBlock(){
	var randX = parseInt(Math.floor(Math.random()*4));
	var randY = parseInt(Math.floor(Math.random()*4));

	var randNum = Math.random() < 0.7 ? 2 : 4;
	showNumBlock(randX,randY,randNum);
	changeStyle();
}

function setZeroBlock(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j] ==0){
				getID(i,j).innerHTML = " ";
			}
		}
	}
}

function changeStyle(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j] ==2){
				getID(i,j).className = "col-25 gridStyle num2";
			}
			else if(board[i][j] ==4){
				getID(i,j).className = "col-25 gridStyle num4";
			}
			else if(board[i][j] ==8){
				getID(i,j).className = "col-25 gridStyle num8";
			}
			else if(board[i][j] ==16){
				getID(i,j).className = "col-25 gridStyle num16";
			}
			else if(board[i][j] ==32){
				getID(i,j).className = "col-25 gridStyle num32";
			}
			else if(board[i][j] ==64){
				getID(i,j).className = "col-25 gridStyle num64";
			}
			else if(board[i][j] ==128){
				getID(i,j).className = "col-25 gridStyle num128";
			}
			else if(board[i][j] ==256){
				getID(i,j).className = "col-25 gridStyle num256";
			}
			else if(board[i][j] ==512){
				getID(i,j).className = "col-25 gridStyle num512";
			}
			else if(board[i][j] ==1024){
				getID(i,j).className = "col-25 gridStyle num1024";
			}
			else if(board[i][j] ==2048){
				getID(i,j).className = "col-25 gridStyle num2048";
			}
			else{
				getID(i,j).className = "col-25 gridStyle otherNum";
			}
		}
	}
}

function showNumBlock(x,y,num){
	if(board[x][y] != 0){
		createNumBlock();
		return;
	}
	else if(board[x][y] == 0){
		var target = getID(x,y);
		target.innerHTML = num;
		board[x][y] = num;
	}
}

function isTheBest(score){
	if(score > bestScore){
		return score;
	}
	else {
		return bestScore;
	}
}

function showScore(){
	document.getElementById("score").innerHTML = score;
	document.getElementById("bestScore").innerHTML = bestScore;
}

function getID(x,y){
	var id ="grid-cell-"+x+"-"+y;
	var target = document.getElementById(id);

	return target;
}