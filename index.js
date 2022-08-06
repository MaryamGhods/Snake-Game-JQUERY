var currentMove = 0 ;
var startGame = true ;
var direction = "up";
var positions = [
    {
        lastLeft :  500 ,
        lastTop : 200
    },
    {
        lastLeft :  500 ,
        lastTop : 220
    }
]
var score = 0 ;

function setScore(){
    $('.score-title').text("Score: " + score);
    score ++ ;
    setSpeed();
}

function eatingSeed(){

    if (($('.seed').css("top") === $('.header').css("top")) 
    && ($('.seed').css("left") === $('.header').css("left"))){
        setScore();
        setSeedPosition();
        positions.push({
            lastLeft : positions[positions.length -1]['lastLeft'],
            lastTop : positions[positions.length -1]['lastTop']
            })
        $('.tailer:last-child').after("<div class='tailer'></div>")
    }

}

function destroyTailer(){
    $('.tailer').each(function(index,item){
        if (index !== 0){
            $(item).remove();
        }
    });
}

function changeDirect(){

    $('body').keyup(function(event){
        if(( (currentMove===38) !== (event.keyCode===40) )||
           ( (currentMove===37) !== (event.keyCode===39) )|| 
           ( (currentMove===40) !== (event.keyCode===38) )||
           ( (currentMove===39) !== (event.keyCode===37) )|| 
              currentMove===0
            ){
            
            currentMove = event.keyCode ;
        
            switch (event.keyCode){
                case 37: // left
                    direction = "left"
                    break;
        
                case 38: // up
                    direction = "up"
                    break;
        
                case 39: // right
                    direction = "right"    
                    break;
        
                case 40: // down
                    direction = "down"
                    break;
            }
        }
    });
}

function setSeedPosition(){
    //if width is 1000px and one seed has 20px width, *50
    var left = Math.floor(Math.random()*50);

    //if width is 500px and one seed has 20px width, *25
    var top = Math.floor(Math.random()*25);

    $('.seed').css("top", top*20);
    $('.seed').css("left", left*20);
    
    $('.tailer').each(function(index , item){
        if(($(item).css('top') === $('.seed').css("top")) && ($(item).css('left') === $('.seed').css("left"))
        ){
            setSeedPosition();
        }
    });

}

function gameOver(){
    var keypressControler = false ;
    $('body').addClass('gameOver');
    $('.score-title').text('Game Over! Press a key to restart.');
    $('body').keypress(function(){
        if (!keypressControler){
            keypressControler = true ;

            currentMove = 0 ;
            score = 0 ;
            startGame = true ;
            direction = "up";
            positions = [
                {
                    lastLeft :  500 ,
                    lastTop : 200
                },
                {
                    lastLeft :  500 ,
                    lastTop : 220
                }
            ]
            $('body').removeClass('gameOver');
            destroyTailer();
            setScore();
            setSpeed();
            setSnake();
            setSeedPosition();
            changeDirect();
            x = setInterval(move, 400);  
        }
    });
}

function handleStrike(){

    $('.tailer').each(function(index , item){
        if(($(item).css('top') === $('.header').css("top")) && ($(item).css('left') === $('.header').css("left"))
        ){
            gameOver();
            clearInterval(x);
            return false;
        }
        return true ;
    });
    if (
        (($('.header').css("top") === "0px") && (direction === "up"))
    ||  (($('.header').css("top") === "480px") && (direction === "down"))
    ||  (($('.header').css("left") === "0px") && (direction === "left"))
    ||  (($('.header').css("left") === "980px") && (direction === "right")) ){
        gameOver();
        clearInterval(x);
        return false;
    }
    return true;
}

function move(){
    changeDirect();
    eatingSeed();
    startGame = handleStrike();
    if (startGame){
        switch (direction){
            case "up":
    
                $('.header').css('top', positions[0]['lastTop'] - 20 );   
                $('.tailer').each(function(index , item){
                    $(item).css('top', positions[index]['lastTop'] ).css('left', positions[index]['lastLeft'] ); 
                });   
    
                for(var i = positions.length - 1 ; i > -1 ; i--){
                    if (i !== 0) {
                        positions[i]['lastTop'] =  positions[i-1]['lastTop'] ;
                        positions[i]['lastLeft'] =  positions[i-1]['lastLeft'] ;
                    }
                    else {
                        positions[i]['lastTop'] =  positions[i]['lastTop'] - 20 ;
                        positions[i]['lastLeft'] =  positions[i]['lastLeft'] ;
                    }
                }
    
                break;
    
            case "left":
    
                $('.header').css('left', positions[0]['lastLeft'] - 20 );   
                $('.tailer').each(function(index , item){
                    $(item).css('top', positions[index]['lastTop'] ).css('left', positions[index]['lastLeft'] ); 
                });   
    
                for(var i = positions.length - 1 ; i > -1 ; i--){
                    if (i !== 0) {
                        positions[i]['lastLeft'] =  positions[i-1]['lastLeft'] ;
                        positions[i]['lastTop'] =  positions[i-1]['lastTop']  ;
                    }
                    else {
                        positions[i]['lastLeft'] =  positions[i]['lastLeft'] - 20 ;
                        positions[i]['lastTop'] =  positions[i]['lastTop'];
                    }
                }
    
                break;
    
            case "down":
            
                $('.header').css('top', positions[0]['lastTop'] + 20 );   
                $('.tailer').each(function(index , item){
                    $(item).css('top', positions[index]['lastTop'] ).css('left', positions[index]['lastLeft'] ); 
                });   
    
                for(var i = positions.length - 1 ; i > -1 ; i--){
                    if (i !== 0) {
                        positions[i]['lastTop'] =  positions[i-1]['lastTop'] ;
                        positions[i]['lastLeft'] =  positions[i-1]['lastLeft'] ;
                    }
                    else {
                        positions[i]['lastTop'] =  positions[i]['lastTop'] + 20 ;
                        positions[i]['lastLeft'] =  positions[i]['lastLeft'] ;
                    }
                }            
                break;
                
            case "right":
      
                $('.header').css('left', positions[0]['lastLeft'] + 20 );   
                $('.tailer').each(function(index , item){
                    $(item).css('top', positions[index]['lastTop'] ).css('left', positions[index]['lastLeft'] ); 
                });   
    
                for(var i = positions.length - 1 ; i > -1 ; i--){
                    if (i !== 0) {
                        positions[i]['lastLeft'] =  positions[i-1]['lastLeft'] ;
                        positions[i]['lastTop'] =  positions[i-1]['lastTop'] ;
                    }
                    else {
                        positions[i]['lastLeft'] =  positions[i]['lastLeft'] + 20 ;
                        positions[i]['lastTop'] =  positions[i]['lastTop'];
                    }
                }
    
                break;
        }
    }
}

function setSnake(){
    $('.header').css('left', positions[0]['lastLeft']).css('top', positions[0]['lastTop']);   
    $('.tailer').css('left', positions[1]['lastLeft']).css('top', positions[1]['lastTop']);   
}

function setSpeed(){
    if (score > 5){
        clearInterval(x) ;
        x = setInterval(move , 300) ;
    }
    if (score > 10){
        clearInterval(x) ;
        x = setInterval(move , 200) ;  
    }
    if (score > 15){
        clearInterval(x) ;
        x = setInterval(move , 100) ;
    }
    if (score > 20){
        clearInterval(x) ;
        x = setInterval(move , 50) ;
    }
}


setScore();
setSnake();
setSeedPosition();
var x = setInterval(move, 400);   



