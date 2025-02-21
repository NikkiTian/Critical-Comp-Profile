// save this file as sketch.js
// Sketch One
var rect = function( p ) { // p could be any variable name
    var x = 100; 
    var y = 100;
    p.setup = function() {
      const myRectCanvas = p.createCanvas(400, 200);
      myRectCanvas.parent("rectCanvas");
    };
  
    p.draw = function() {
      p.background(0);
      p.fill(255);
      p.rect(x,y,50,50);
    };
  };
  
  // Sketch Two
  var circle = function( p ) { 
    var x = 100.0; 
    var y = 100; 
    var speed = 2.5; 
    p.setup = function() {
        const myCircleCanvas = p.createCanvas(400, 200);
        myCircleCanvas.parent("circleCanvas");
    };
  
    p.draw = function() {
      p.background(100);
      p.fill(1);
      x += speed; 
      if(x > p.width){
        x = 0; 
      }
      p.ellipse(x,y,50,50);
  
    };
  }

  // Sketch Three
  var pink = function( p ) { 
    var x = 100.0; 
    var y = 100; 
    var speed = 2.5; 
    p.setup = function() {
        const myPinkCanvas = p.createCanvas(400, 200);
        myPinkCanvas.parent("pinkCanvas");
    };
  
    p.draw = function() {
      p.background("deeppink");
    }
  }

  var myp5 = new p5(rect);
  var mySecondp5 = new p5(circle);
  var myThirdp5 = new p5(pink);