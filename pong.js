var ball = document.createElement('div');
ball.id = 'ball';
document.getElementById('container').appendChild(ball);

var gameSettings = {
    direction: null,
    position: 100,
    key: 0,
    pad: document.getElementById('pad'),
    ball: ball,
    posBall: [0, 1],
    moveBall: [2, 2]
};

var movePad = function(){
    var pos = gameSettings.position;
    
    if(gameSettings.direction === 'right'){
        if(pos + 10 <= 260){
            gameSettings.position += 10;
        }
    }
    else{
        if(pos - 10 >= 0){
            gameSettings.position -= 10;
        }
    }
    
    if(pos != gameSettings.position){
        if(gameSettings.key){
            gameSettings.pad.style.left = gameSettings.position+'px';
        }       
    }
    gameSettings.key = 0;
};

var moveBall = function(){
    if(checkBounce()){
        gameSettings.posBall[0] += gameSettings.moveBall[0];
        gameSettings.posBall[1] += gameSettings.moveBall[1];
        
        gameSettings.ball.style.top = gameSettings.posBall[1]+'px';
        gameSettings.ball.style.left = gameSettings.posBall[0]+'px';
    }
    else{
        clearInterval(theGame);
    }
};

var checkBounce = function(){
    if(gameSettings.posBall[0] <= 0){
        gameSettings.moveBall[0] *= -1;
        //left
        return 1;
    }
    else if(gameSettings.posBall[0] >= 290){
        gameSettings.moveBall[0] *= -1;
        //right
        return 1;
    }
    else if(gameSettings.posBall[1] <= 0){
        //top
        gameSettings.moveBall[1] *= -1;
        return 1;
    }
    else{
        //nothing
        if(gameSettings.posBall[1] > 290){
            return 0;
        }
        else{
            //pad
            if(gameSettings.posBall[1] == 285){
                if(gameSettings.posBall[0] >= gameSettings.position && gameSettings.posBall[0] <= gameSettings.position+40){
                    gameSettings.moveBall[1] *= -1;
                }
            }
            return 1;
        }
    }
}

var PressedKey = function (e){
    if(!gameSettings.key){
        var evtobj=window.event? event : e,
        unicode = evtobj.charCode || evtobj.keyCode,
        actualkey=String.fromCharCode(unicode);
        if (actualkey=='a' || unicode == 37) {
            gameSettings.direction = 'left';
            gameSettings.key = 1;
        }
        if (actualkey=='d' || unicode == 39) {
            gameSettings.direction = 'right';
            gameSettings.key = 1;
        }
        movePad();
    }
}

document.onkeypress=PressedKey;

var gameLoop = function(){
    moveBall();
}

gameSettings.posBall[0] = ~~(Math.random()*290);
gameSettings.ball.style.left = gameSettings.posBall[0]+'px';
gameSettings.ball.style.top = gameSettings.posBall[1]+'px';
gameSettings.pad.style.left = gameSettings.position+'px';

var theGame = setInterval(gameLoop, 30);