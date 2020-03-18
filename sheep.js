let canvas = document.getElementById('gamefield')
let ctx = canvas.getContext('2d')

//-----------------------------------------------------CREATE THE PLAYER---------------------------------------------

class Player {
    constructor() {
        this.width = 200
        this.height = 200
        this.x = 500
        this.y = 720
        this.speedY = 0
        this.gravity = 0.6
        this.status = true // Revist
        // this.score Revisit
    }

    update() {
        console.log("update clicked")
        this.newPos()
        ctx.drawImage(sheep, 50, this.y, this.width, this.height)
    }

    newPos() {
        this.speedY += this.gravity
        this.y += this.speedY + this.gravity
    }

}

function hitBottom() {
    let ground = canvas.height - newPlayer.height
    if (newPlayer.y > ground) {
        newPlayer.y = ground
        clearInterval(intervalId)
    }
}

//-----------------------------------------------------CREATE OBSTACLES---------------------------------------------


class Obstacle {
    constructor(yBottom) {
        this.x = 1400
        this.y = yBottom
        this.width = 100
        this.height = 100

    }

    left() {
        return this.x
      }
      right() {
        return this.x + this.width
      }
      top() {
        return this.y
      }
      bottom() {
        return this.y + this.height
      }

    update() {
        ctx.drawImage(obstacle, this.x, this.y,this.width,this.height)
        //ctx.fillRect(this.x, this.y, this.width, this.height)
        this.x -= 5
    }

    removeObstacle() {}
}

//-----------------------------------------------------IMAGES STORAGE---------------------------------------------

let sheep = new Image()
sheep.src = `/Idle Blinking_007.png`

let img = new Image()
img.src = `/Background Img.png`

let obstacle = new Image()
obstacle.src = `/spike A.png`


let backgroundImage = {
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
    }
}

let statusChangeArray = [] // Revisit
let myObstacles = []
let frames = 0 // make it dependent on the frames counter
let newPlayer = new Player()

function updateCanvas() {
    backgroundImage.move()

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    backgroundImage.draw()
    newPlayer.update()
    frames++
    requestAnimationFrame(updateCanvas)

    for (i = 0; i < myObstacles.length; i++) {
        myObstacles[i].update()
    }

    if (frames % 360 === 0) {
        let xBottom = 800
        myObstacles.push(new Obstacle(xBottom)) // Revisit add 2 additional obstacles 
    }

    hitBottom()

}

document.onkeydown = function (e) {
    if (e.keyCode == 32) {
        return newPlayer.speedY = -10
    }
}

img.onload = updateCanvas;

//-----------------------------------------------------TEST COLLISION---------------------------------------------


// function testCollision(obstacle) {
    
    
//     //if (newPlayer.bottomBird() >= myObstacles[i].topColumnB() || newPlayer.rightBird() >= myObstacles[i].leftColumnB() || newPlayer.rightBird() >= myObstacles[i].leftColumnT || newPlayer.topBird() >= myObstacles[i].topColumnT) {
//       alert(SOS)
      
//     } else {}
//   }
//   console.log(myObstacles)