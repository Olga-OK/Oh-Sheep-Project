let canvas = document.getElementById('gamefield')
let ctx = canvas.getContext('2d')

//---------------------------------------------------IMAGES INITIALIZATION--------------------------------------------



let sheep = new Image()
sheep.src = `/Idle Blinking_007.png`

let img = new Image()
img.src = `/Background Img.png`

let obstacle = new Image()
obstacle.src = `/spike A.png`



//-----------------------------------------------------CREATE THE PLAYER---------------------------------------------

class Player {
    constructor() {
        this.width = 200
        this.height = 200
        this.x = 50
        this.y = 720
        this.speedY = 0
        this.gravity = 0.6
        this.status = true // Revist
        // this.score Revisit
    }

    update() {
        console.log("update clicked")
        this.newPos()
        this.hitBottom()
        ctx.drawImage(sheep, this.x, this.y, this.width, this.height)
    }

    newPos() {
        this.speedY += this.gravity
        this.y += this.speedY + this.gravity
    }

    hitBottom() {
        let ground = canvas.height - newPlayer.height
        if (newPlayer.y > ground) {
            newPlayer.y = ground
        }

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

    testCollision() {
        return !(
            this.bottom() < obstacle.top() ||
            this.top() > obstacle.bottom() ||
            this.right() < obstacle.left() ||
            this.left() > obstacle.right()
        )
    }
}


//--------------------------------------------------------ANIMATION-------------------------------------------------

function SpriteSheet(frameWidth, frameHeight, frameSpeed, endFrame) {

    let image = new Image()
    image.src = `/SheepRunSprite.png`
    let framesPerRow = 0
    let currentFrame = 0 // the current frame to draw
    let counter = 0 // keep track of frame rate

    // calculate the number of frames in a row after the image loads
    image.onload = function () {
        framesPerRow = Math.floor(image.width / frameWidth)
    }


    // Update the animation
    this.update = function () {

        // update to the next frame if it is time
        if (counter == (frameSpeed - 1))
            currentFrame = (currentFrame + 1) % endFrame

        // update the counter
        counter = (counter + 1) % frameSpeed
    }

    this.draw = function (x, y) {
        // get the row and col of the frame
        let row = Math.floor(currentFrame / framesPerRow)
        let col = Math.floor(currentFrame % framesPerRow)

        ctx.drawImage(
            image,
            col * frameWidth, row * frameHeight,
            frameWidth, frameHeight,
            x, y,
            frameWidth, frameHeight);
    }
}

function animate() {
    requestAnimFrame(animate);
    ctx.clearRect(0, 0, 150, 150);

    spritesheet.update();

    spritesheet.draw(12.5, 12.5);
}

SpriteSheet(480, 480, 3, 16)





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
        ctx.drawImage(obstacle, this.x, this.y, this.width, this.height)
        //ctx.fillRect(this.x, this.y, this.width, this.height)
        this.x -= 5
    }

    removeObstacle() {}
}




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
let frames = 0 // make it dependent on the frames counter
let newPlayer = new Player()
let myObstacles = []

function updateCanvas() {    

    backgroundImage.move()
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    backgroundImage.draw()
    newPlayer.update()
    frames++
    requestAnimationFrame(updateCanvas)

    for (i = 0; i < myObstacles.length; i++) {
        myObstacles[i].update()
        if (newPlayer.testCollision(myObstacles[i])) {
            alert(`GAME OVER`)
        }
    }

    if (frames % 360 === 0) {
        let xBottom = 800
        myObstacles.push(new Obstacle(xBottom)) // Revisit add 2 additional obstacles 
    }

    
    

}

document.onkeydown = function (e) {
    if (e.keyCode == 32) {
        if (newPlayer.y > 550) {
            return newPlayer.speedY = -10
        }
    }
}

img.onload = updateCanvas;

