$(function() {
    var stage = new createjs.Stage('#gameCanvas');
    var circle = new createjs.Shape();
    var rText = new createjs.Text();
    var bText = new createjs.Text();
    var gText = new createjs.Text();
    var rScore = 0;
    var bScore = 0;
    var gScore = 0;
    var shapeArray = [];
    var tweenArray = [];
    var gameActive = true;
    var update = false;
    var playField = {maxX: Math.floor($('#gameCanvas').width()) - 25, maxY: Math.floor($('#gameCanvas').height()) - 25};
    
    $('#gameContent').attr("height",$(window).height() * 0.70);
    $('#gameContent').attr("width",$(window).width() * 0.80 );
    $('#gameCanvas').attr("height",$(window).height() * 0.70);
    $('#gameCanvas').attr("width",$(window).width() * 0.80);
    
    function score(args) {
        rText.x = 100;
        rText.y = 0;
        rText.text = "Red Clicked: " + rScore;
        rText.font = "20px Arial";
        stage.addChild(rText);
        bText.x = 100;
        bText.y = 50;
        bText.text = "Blue Clicked: " + bScore;
        bText.font = "20px Arial";
        stage.addChild(bText);
        gText.x = 100;
        gText.y = 100;
        gText.text = "Green Clicked: " + gScore;
        gText.font = "20px Arial";
        stage.addChild(gText);
    }
    
    init();
    function init() {
        console.log("INIT GAME");
        stage = new createjs.Stage('#gameCanvas');
        
        startGame();
        score();

        
        stage.update();
    }
    
    function startGame() {
        createjs.Touch.enable(stage);
        
        shapeArray = generateShapes();
      
        placeShapes(shapeArray);
        update = true;
        animate(shapeArray);
    }
    
    function generateShapes() {
        var maxTargets = $('#gameCanvas').width() / 50;
        var generatedShapes = [];
        
        for(var i=0;i < maxTargets; i++){
            console.log("Making shapes");
            var randNumShape = Math.floor((Math.random() * 2) + 1);
            var randNumColor = Math.floor((Math.random() * 4) + 1);
            var tempShape = new createjs.Shape();
            var tempColor = "";
            
            switch (randNumColor) {
                case 1:
                    tempColor = "Blue"; break;
                case 2:
                    tempColor = "Red"; break;
                case 3:
                    tempColor = "Black"; break;
                case 4:
                    tempColor = "Green"; break;
                default:
                    tempColor = "Gold"; 
            }
            
            switch (randNumShape) {
                case 1:
                    tempShape.graphics.beginFill(tempColor).drawCircle(0,0,30); break;
                case 2:
                    tempShape.graphics.beginFill(tempColor).drawRect(0,0,50,50); break;
                default:
                    console.log("random number for shape no good");
            }
            
            generatedShapes.push(tempShape);
        }
        
        return generatedShapes;        
    }
    
    function placeShapes(targets) {
        playField = {maxX: Math.floor($('#gameCanvas').width()) - 25, maxY: Math.floor($('#gameCanvas').height()) - 25};

        
        for(var i=0; i < targets.length; i++){
            var randNumX = Math.floor((Math.random() * playField.maxX));
            var randNumY = Math.floor((Math.random() * playField.maxY));
            targets[i].x = randNumX;
            targets[i].y = randNumY;
            stage.addChild(targets[i]);
        }
    }
    
    $(window).resize(function(){
        $('#gameContent').attr("height", $(window).height() * 0.70);
        $('#gameContent').attr("width", $(window).width() * 0.80);
        $('#gameCanvas').attr("height", $(window).height() * 0.70);
        $('#gameCanvas').attr("width", $(window).width() * 0.80);
        
        if ($(window).width() < 991) {
            $('#gameContent').attr("width",$(window).width() * 0.95);
            $('#gameCanvas').attr("width",$(window).width() * 0.95);
        }
        playField = {maxX: Math.floor($('#gameCanvas').width()) - 25, maxY: Math.floor($('#gameCanvas').height()) - 25};
        endGame();
        startGame();
    });
    
    function endGame() {
        createjs.Tween.removeAllTweens();
        stage.removeAllChildren();
        stage.clear();
        shapeArray.length = 0;
        createjs.Touch.disable(stage);
        update = true;
    }
    
    
   createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);
    function handleTick() {
        var isGameFocused = false;
        

        
        if (update) {
            stage.update();
           
            update = false;
        }
    }
    
    function rndWait() {
        return (Math.floor((Math.random() * 50)+10)*5).toString();
        
    }
    
    function animate(targets) {
        for (var i=0;i<targets.length;i++) {
            var currentX = targets[i].x;
            var currentY = targets[i].y;
            var randNumX = Math.floor((Math.random() * playField.maxX));
            var randNumY = Math.floor((Math.random() * playField.maxY));
            var moveSpeed = (Math.random() * 1000) + 400;
            
            tweenArray.push(createjs.Tween.get(targets[i], {loop: true}).to({x: randNumX}, moveSpeed, createjs.Ease.getPowInOut(2))
                                              .to({y: randNumY}, moveSpeed, createjs.Ease.circInOut));

        }
    }
    
    
    $(document).bind('keydown',function(e){
        
        if(e.keyCode == 32) {
            if (gameActive) {
               for(var i=0;i<tweenArray.length;i++){
                    tweenArray[i].setPaused(true);
                }
                gameActive = false;
            } else{
                for(var i=0;i<tweenArray.length;i++){
                    tweenArray[i].setPaused(false);
                }
                gameActive = true;
            }
            /*tween.setPaused(true);*/
        }
    });
    
    function screenFlicker() {
        var flickerBox = new createjs.Shape();
        
        flickerBox.graphics.beginFill("#000000").drawRect(-50,-50,playField.maxX+100,playField.maxY+100);
        stage.addChild(flickerBox);
        
        createjs.Tween.get(flickerBox).wait(500).to({alpha:0}, 3000, createjs.Ease.circOut);
    }
    
    stage.addEventListener("mousedown", getPosition);
    
    function getPosition(event) {
      var x = event.stageX;
      var y = event.stageY;
        
        var targets = stage.getObjectsUnderPoint(x,y);
        
        if (targets.length > 0) {
            for(var i=0;i<targets.length; i++){
                var tempColor = targets[i].graphics._fill.style;
                
                if (tempColor == "Green") {
                    gText.text = "Green Clicked: " + ++gScore;
                }
                if (tempColor == "Blue") {
                    bText.text = "Blue Clicked: " + ++bScore;
                }
                if (tempColor == "Red") {
                    rText.text = "Red Clicked: " + ++rScore;
                }
                if (tempColor == "Black") {
                    screenFlicker();
                }
                stage.removeChild(targets[i]);
                
            }
        }
        
    }

});