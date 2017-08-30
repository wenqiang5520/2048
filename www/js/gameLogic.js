/**
 * Created by wenqiang on 2017/8/30.
 */

(function arrowKey(){
	document.onkeydown=function(event){
		reset();
		if(isOver()){
			localStorage.setItem("bestScore",bestScore);
			alert("Game Over!");
			return;
		}

		if(event.keyCode === 37){
			if(canMoveLeft()){
				showMove("left");
				setZeroBlock();
				createNumBlock();
			}
		}
		if(event.keyCode == 38){
			if(canMoveUp()){
				showMove("up");
				setZeroBlock();
				createNumBlock();
			}
		}
		if(event.keyCode == 39){
			if(canMoveRight()){
				showMove("right");
				setZeroBlock();
				createNumBlock();
			}
		}
		if(event.keyCode == 40){
			if(canMoveDown()){
				showMove("down");
				setZeroBlock();
				createNumBlock();
			}
		}
	}
})();

function canMoveLeft(){
	for(var i=3;i>=0;i--){
		for(var j=3;j>0;j--){
			if(board[i][j] !=0){
				if(board[i][j-1] == 0 || board[i][j-1]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveUp(){
	for(var i=3;i>0;i--){
		for(var j=3;j>=0;j--){
			if(board[i][j] != 0){
				if(board[i-1][j] ==0 || board[i-1][j] == board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveRight(){
	for(var i=0;i<4;i++){
		for(var j=0;j<3;j++){
			if(board[i][j] != 0){
				if(board[i][j+1] == 0 || board[i][j+1] == board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveDown(){
	for(var i=0;i<3;i++){
		for(var j=0;j<4;j++){
			if(board[i][j] != 0){
				if(board[i+1][j] == 0 ||board[i+1][j] == board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function showMove(directive){
	if(directive == "left"){
		for(var i = 0;i<4;i++){
			for(var j=1;j<4;j++){
				if(board[i][j] != 0 ){
					for(var k=0;k<j;k++){
						if(board[i][k] == 0 && noBlockLeft(i,j,k)){
							board[i][k] = board[i][k] + board[i][j];
							board[i][j] = 0;
							getID(i,k).innerHTML = board[i][k];
							getID(i,j).innerHTML = " ";
						}
						else if(board[i][k] == board[i][j] && noBlockLeft(i,j,k) && !hasMove[i][k]){
							board[i][k] = board[i][k] + board[i][j];
							board[i][j] = 0;
							hasMove[i][k] = true;
							getID(i,k).innerHTML = board[i][k];
							getID(i,j).innerHTML = " ";
							score = score+board[i][k];
							bestScore = isTheBest(score);
							showScore();
						}
					}
				}
			}
		}
	}
	else if(directive == "up"){
		for(var i = 1;i<4;i++){
			for(var j = 0;j<4;j++){
				if(board[i][j] != 0 ){
					for(var k=0;k<i;k++){
						if(board[k][j] == 0 && noBlockUp(i,j,k)){
							board[k][j] = board[k][j]+board[i][j];
							board[i][j] = 0;
							getID(k,j).innerHTML = board[k][j];
							getID(i,j).innerHTML = " ";
						}
						else if(board[k][j] == board[i][j] && noBlockUp(i,j,k) && !hasMove[k][j]){
							board[k][j] = board[k][j]+board[i][j];
							board[i][j] = 0;
							hasMove[k][j] = true;
							getID(k,j).innerHTML = board[k][j];
							getID(i,j).innerHTML = " ";
							score = score+board[k][j];
							bestScore = isTheBest(score);
							showScore();
						}
					}
				}
			}
		}
	}
	else if(directive == "right"){
		for(var i = 3;i>=0;i--){
			for(var j = 3;j>=0;j--){
				if(board[i][j] != 0 ){
					for(var k=3;k>j;k--){
						if(board[i][k] == 0 && noBlockRight(i,j,k)){
							board[i][k] = board[i][k] + board[i][j];
							board[i][j] = 0;
							getID(i,k).innerHTML = board[i][k];
							getID(i,j).innerHTML = " ";
						}
						else if(board[i][k] == board[i][j] && noBlockRight(i,j,k) && !hasMove[i][k]){
							board[i][k] = board[i][k] + board[i][j];
							board[i][j] = 0;
							hasMove[i][k] = true;
							getID(i,k).innerHTML = board[i][k];
							getID(i,j).innerHTML = " ";
							score = score+board[i][k];
							bestScore = isTheBest(score);
							showScore();
						}
					}
				}
			}
		}
	}
	else if(directive == "down"){
		for(var i = 3;i >= 0;i--){
			for(var j = 3;j >= 0;j--){
				if(board[i][j] != 0 ){
					for(var k=3;k>i;k--){
						if(board[k][j] == 0 && noBlockDown(i,j,k)){
							board[k][j] = board[k][j]+board[i][j];
							board[i][j] = 0;
							getID(k,j).innerHTML = board[k][j];
							getID(i,j).innerHTML = " ";
						}
						else if(board[k][j] == board[i][j] && noBlockDown(i,j,k) && !hasMove[k][j]){
							board[k][j] = board[k][j]+board[i][j];
							board[i][j] = 0;
							hasMove[k][j] = true;
							getID(k,j).innerHTML = board[k][j];
							getID(i,j).innerHTML = " ";
							score = score+board[k][j];
							bestScore = isTheBest(score);
							showScore();
						}
					}
				}
			}
		}
	}
}

function noBlockLeft(row,col,arr){
	for(var i=arr+1;i<col;i++){
		if(board[row][i] != 0 ) {
			return false;
		}
	}
	return true;
}

function noBlockRight(row,col,arr){
	for(var i=arr-1;i>col;i--){
		if(board[row][i] != 0 ) {
			return false;
		}
	}
	return true;
}

function noBlockUp(row,col,arr){
	for(var i=arr+1;i<row;i++){
		if(board[i][col] != 0 ) {
			return false;
		}
	}
	return true;
}

function noBlockDown(row,col,arr){
	for(var i=arr-1;i>row;i--){
		if(board[i][col] != 0 ) {
			return false;
		}
	}
	return true;
}

function isOver(){
	if(!canMoveDown() && !canMoveLeft() && !canMoveRight() && !canMoveUp()){
		return true;
	}
	return false;
}

function reset(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			hasMove[i][j] = false;
		}
	}
}
