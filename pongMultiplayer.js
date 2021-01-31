var canvas;
var ctx;
var hitAudio;
var loseAudio;

class sprite{
  constructor(x, y, width, height){
    this.x = x;
    this.y = y;
    this.scale = 1;
    this.width = width * this.scale;
    this.height = height * this.scale;
    this.color = "gray";
    this.velocityX = 0;
    this.velocityY = 0;
  }
  create(){
    ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
    this.x += this.velocityX;
    this.y += this.velocityY;
  };
  isTouching(rectangle){
    if(this.x + this.width > rectangle.x && 
       this.x < rectangle.x + rectangle.width && 
       this.y + this.height > rectangle.y &&
       this.y < rectangle.y + rectangle.height){
       return true;
    } else{
      return false;
    }
  };
  bounceOff(rect){
    if(this.isTouching(rect)){
       this.velocityY*=-1;
       this.velocityX*=-1;
    }
  }
}

window.onload = function(){
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");
  hitAudio = new Audio("hit.mp3");
  loseAudio = new Audio("die.mp3");
  player1 = new sprite( 5, 0, 20, 150);
  player1.y = canvas.height/2 - player1.height/2;
  player1.color = "red";
  player2 = new sprite( 1175, player1.y, 20, 150)
  player2.color = "red";
  ball = new sprite( 0, 0, 20, 20)
  ball.x = canvas.width/2 + ball.width/2;
  ball.y = canvas.height/2 - ball.height/2; 
  ball.velocityX = 1;
  ball.velocityY = 1;
  ball.color = "white";
  player1.score = 0;
  player1.timesWon = 0;
  player2.score = 0; 
  player2.timesWon = 0;

canvas.addEventListener("mousemove", function(event){
                          player1.y = event.offsetY - player1.height/2;
    });
    
document.addEventListener("keydown", function(event){
    switch(event.keyCode){
        case 38:
            //up arrow
            player2.y -= 20;
            break;
        case 40: 
            //down arrow
            player2.y += 20;
            break;
           }
    });
    
     setInterval(draw, 1);
}



function draw(){
  rect(0, 0, canvas.width, canvas.height, "gray");
  player1.create();
  player2.create();
  net();
  rect(ball.x, ball.y, ball.width, ball.height, ball.color);
    
    text("Score: " + player1.score, "20px", 5, 25);
    text("Score: " + player2.score, "20px", canvas.width - 80, 25);
    
    ball.x += ball.velocityX
    ball.y += ball.velocityY
  
    if(player1.score == 10){
       player1.timesWon++;
       alert("Player One Wins! Player One has won " + player1.timesWon + " games.");
       reset();
    } else if(player2.score == 10){
       player2.timesWon++;       
       alert("Player Two Wins!  Player Two has won " + player2.timesWon + " game(s).");
       reset();
    }
    
    if(player1.isTouching(ball)){
      ball.bounceOff(player1);
      hitAudio.play();
    } else if(player2.isTouching(ball)){
      ball.bounceOff(player2);
      hitAudio.play();
    }
    
    if(ball.x<=0){
       loseAudio.play();
       player2.score++;
       ball.x = canvas.width/2 + ball.width/2;
       ball.y = canvas.height/2 - ball.height/2; 
    } else if(ball.x + ball.width>canvas.width){
       loseAudio.play();
       player1.score++;
       ball.x = canvas.width/2 + ball.width/2;
       ball.y = canvas.height/2 - ball.height/2; 
    } else if(ball.y + ball.height>canvas.height || ball.y<0){
              ball.velocityY *= (-1);     
    }
}
function rect(xPos, yPos, width, height, color){
  ctx.fillStyle = color;
  ctx.fillRect(xPos, yPos, width, height);
}

function text(string, size, x, y){
  ctx.font = size + " Arial";
  ctx.fillStyle = "white";
  ctx.fillText(string, x, y);
}

function reset(){
  player1.y = canvas.height/2 - player1.height/2;
  player2.y = canvas.height/2 - player1.height/2;
  player2.x = canvas.width - player2.width;
  ball.x = canvas.width/2 + ball.width/2;
  ball.y = canvas.height/2 - ball.height/2; 
  player1.score = 0;
  player2.score = 0; 
}

function net(){
  for(var i = 0; i<canvas.height; i+=50){
    ctx.fillStyle = "darkgray";
    ctx.fillRect(canvas.width/2 - 4, i, 8, 40,);
  }
}