window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    startGame();
  };

  function startGame() {
  }

};


//-----------------------------------------------------CREATE THE PLAYER---------------------------------------------

class Player {
  constructor() {
    this.width = 75
    this.height = 55
    this.x = 0
    this.y = 0
    this.speedY = 0 // TBD Revisit
    this.gravity = 0.6 // TBD Revisit
    //this.gravitySpeed = 0 // TBD Revisit
  }
  // Which will keep updating its position
  update() {
    console.log("update clicked")
    this.newPos()
    ctx.drawImage(bird, 100, this.y, this.width, this.height)
  }

  newPos() {
    this.speedY += this.gravity
    this.y += this.speedY + this.gravity
  }

  bottomBird() {
    return this.y + this.height
  }

  leftBird() {
    return this.x
  }

  rightBird() {
    return this.x + this.width
  }

  topBird() {
    return this.y
  }

}




//-----------------------------------------------------CREATE OBSTACLES---------------------------------------------


class Obstacle {
  constructor(yBottom, yTop) {
    this.xb = 600
    this.yb = yBottom
    this.widthb = 100
    this.heightb = 200

    this.xt = 600
    this.yt = yTop
    this.widtht = 100
    this.heightt = 200
  }
  leftColumnB() {
    return this.xb
  }

  rightColumnB() {
    return this.xb + this.widthb
  }

  topColumnB() {
    return this.yb
  }

  leftColumnT() {
    return this.xt
  }

  rightColumnT() {
    return this.xt + this.widtht
  }

  topColumnT() {
    return this.yt
  }


  updateb() {
    ctx.drawImage(obstacleBottom, this.xb, this.yb)
    //ctx.fillRect(this.x, this.y, this.width, this.height)
    this.xb -= 5
  }

  updatet() {
    ctx.drawImage(obstacleTop, this.xt, this.yt)
    //ctx.fillRect(this.x, this.y, this.width, this.height)
    this.xt -= 5
  }
  removeObstacle() {}
}

//-----------------------------------------------------------MOVING BACKGROUND IMAGE -----------------------------------------------------------

var img = new Image()
img.src = `../images/bg.png`
var bird = new Image()
bird.src = '../images/flappy.png'
var obstacleBottom = new Image()
obstacleBottom.src = '../images/obstacle_bottom.png'
var obstacleTop = new Image()
obstacleTop.src = '../images/obstacle_top.png'

var canvas = document.getElementById('my-canvas')
var ctx = canvas.getContext('2d')

var backgroundImage = {
  img: img,
  x: 0,
  speed: -1,

  move: function () {
    this.x += this.speed
    this.x %= canvas.width
  },

  draw: function () {
    ctx.drawImage(this.img, this.x, 0)
    if (this.speed < 0) {
      ctx.drawImage(this.img, this.x + canvas.width, 0)
    } else {
      ctx.drawImage(this.img, this.x - this.img.width, 0)
    }
  },
}

let myObstacles = []
let frames = 0
let newPlayer = new Player()

function updateCanvas() {
  backgroundImage.move()

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  backgroundImage.draw()

  newPlayer.update()

  for (i = 0; i < myObstacles.length; i++) {
    myObstacles[i].updateb();
    myObstacles[i].updatet();
  }

  if (frames % 120 === 0) {

    function getRandomInt(min, max) {
      min = Math.ceil(200);
      max = Math.floor(400);
      return Math.floor(Math.random() * (max - min)) + min;
    }

    let xBottom = getRandomInt(200, 400)

    myObstacles.push(new Obstacle(xBottom, xBottom - 950))
  }
  // for (let elem of myObstacles){
  //   console.log(elem)
  //   testCollision(elem)
  // }
  frames++
  requestAnimationFrame(updateCanvas);
}

// Once Space Button is clicked - the gravity should change to the opposite one (Fly UP)
document.onkeydown = function (e) {
  if (e.keyCode == 32) {
    return newPlayer.speedY = -10
  }
}

// start calling updateCanvas once the image is loaded
img.onload = updateCanvas;

//-----------------------------------------------------OTHER RULES---------------------------------------------

function testCollision(obstacle) {
  if (newPlayer.bottomBird() >= myObstacles[i].topColumnB() || newPlayer.rightBird() >= myObstacles[i].leftColumnB() || newPlayer.rightBird() >= myObstacles[i].leftColumnT || newPlayer.topBird() >= myObstacles[i].topColumnT) {
    alert(SOS)
    
  } else {}
}
console.log(myObstacles)



//testCollision(Obstacle )


// function getDistance (x1, y1, x2, y2) {
//   let xDistance = x2 - x1
//   let yDistance = y2 - y1

//   return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
// }

// crashWith: function (obstacle) {
//   return !(
//     this.bottom() < obstacle.top() ||
//     this.top() > obstacle.bottom() ||
//     this.right() < obstacle.left() ||
//     this.left() > obstacle.right()
//   );
// }