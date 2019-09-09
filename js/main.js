$(document).ready(function () {

    var canvas = $("#canvas");
    var context = canvas.get(0).getContext("2d");

	canvas.attr("width",$(window).get(0).innerWidth);
	canvas.attr("height",$(window).get(0).innerHeight);

	var canvasWidth = canvas.width();
    var canvasHeight = canvas.height();



    //設定按鈕------------------------------------------------

    var playAnimation = true;

    var startButton = $("#startAnimation");
    var stopButton = $("#stopAnimation");
    
    startButton.hide();
    startButton.click(function() {
        $(this).hide();
        stopButton.show();

        playAnimation = true;
        animate();
    });

    stopButton.click(function() {
        $(this).hide();
        startButton.show();

        playAnimation = false;
    });

//------------------------------------------------------------

    var buble = function(x, y, r, speed, velX, velY, opacity, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.speed = speed;
        this.velX = velX;
        this.velY = velY;
        this.opacity = opacity
        this.color = color;
    }

    var bubles = new Array();

    var bubleNumber = 10000;

    for (var i=0; i<bubleNumber; i++) {
        
        var x = canvasWidth/2;
        var y = canvasHeight/2;
        var r = Math.random()*5+1;
        var speed = Math.random()*5;

        var angle = (Math.random()>0.5)?270-Math.random()*25:Math.random()*25+270;
        var radians = angle * Math.PI / 180;

        var velX = Math.cos(radians) * speed;
        var velY = Math.sin(radians) * speed;

        var opacity =  Math.random()-0.1;
        var color ="rgba("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+opacity+")";
        bubles.push(new buble(x, y, r, speed, velX, velY, opacity, color));
    }

    var gravity = 0.1;

    var ite = 1;
    var start = 0;
    var end = start + ite;

    // 動畫開始
    function animate(){

        context.clearRect(0, 0, canvasWidth, canvasHeight);

        var tmpbubles = bubles.slice(start, end);    
        end += ite;


        for (var i=0; i<tmpbubles.length; i++) {

            tmpbubles[i].velY += gravity;  //重力

            tmpbubles[i].x += tmpbubles[i].velX;
            tmpbubles[i].y += tmpbubles[i].velY;

            context.beginPath();
            context.arc(tmpbubles[i].x,tmpbubles[i].y,tmpbubles[i].r,0,Math.PI*2,false);
            context.fillStyle = tmpbubles[i].color;
            context.fill();
            context.closePath();
        }

  
        if (playAnimation) {
            window.requestAnimationFrame(animate);
        }
    }

    animate();

});