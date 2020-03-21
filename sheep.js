window.onload = function () {
    document.getElementById("start-button").onclick = function () {
        startGame();
    }

    function startGame() {
        window.setTimeout(document.location.reload(), 2000)
    }

}


let canvas = document.getElementById('gamefield')
let ctx = canvas.getContext('2d')

//---------------------------------------------------IMAGES INITIALIZATION--------------------------------------------



let sheep = new Image()
sheep.src = `/Idle Blinking_007.png`

let img = new Image()
img.src = `/Background Img.png`

let obstacle = new Image()
obstacle.src = `/spike A.png`

let reward = new Image()
reward.src = `/Pizza.png`

// let obstacle2 = new Image()
// obstacle.src = `/transparent PNG/spike B.png`

// let obstacle3 = new Image()
// obstacle.src = `/transparent PNG/spike C.png`

// let obstacle4 = new Image()
// obstacle.src = `/transparent PNG/spike C.png`




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
        let ground = canvas.height - newPlayer.height + 20
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

    testCollision(obst) {
        return !(
            this.bottom() < obst.top() ||
            this.top() > obst.bottom() ||
            this.right() < obst.left() ||
            this.left() > obst.right()
        )
    }
}


//--------------------------------------------------------ANIMATION-------------------------------------------------

let arrPathRun = []
let currentImg = 0
for (let i = 0; i <= 11; i++) {
    let img = new Image()
    img.src = `/Running/Running_00${i}.png`
    arrPathRun.push(img)
}

let arrPathJump = []
let currentImgJump = 0
for (let i = 0; i <= 5; i++) {
    let img = new Image()
    img.src = `/Jump Start/Jump Start_00${i}.png`
    arrPathJump.push(img)
}

let arrPathDie = []
let currentImgDie = 0
for (let i = 0; i <= 17; i++) {
    let img = new Image()
    img.src = `/Dying/Dying_00${i}.png`
    arrPathDie.push(img)
}


//-----------------------------------------------------CREATE OBSTACLES---------------------------------------------


class Obstacle {
    constructor(yBottom) {
        this.x = 1400
        this.y = yBottom
        this.width = 70
        this.height = 70

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
        this.x -= 4
    }

}
//-------------------------------------------------------CREATE REWARD-----------------------------------------------
class Reward {
    constructor() {
        this.x = 1400
        this.y = 500
        this.width = 120
        this.height = 120

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
        ctx.drawImage(reward, this.x, this.y, this.width, this.height)
        //ctx.fillRect(this.x, this.y, this.width, this.height)
        this.x -= 4
    }

    removeReward() {}
}


//-----------------------------------------------------CREATE BACKGROUND---------------------------------------------

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

//-----------------------------------------------------CREATE SCORE COUNTER---------------------------------------------

let double = false
let points = 0

function score() {


    if (double == false) {
        //console.log("oh sheep")
        points += 1
    } else {
        points += 200
       // console.log(`BANANA`)
    }

    ctx.font = "30px calibri"
    ctx.fillStyle = "green"
    ctx.fillText("Score: " + points, 1000, 250)
}

//---------------------------------------------------------CREATE A SOUND--------------------------------------------
let sound = new Audio(`/Jump-SoundBible.com-1007297584.wav`)
sound.currentTime = 0

let soundBackground = new Audio(`/Disco-funk-track-70s-80.wav`)
soundBackground.currentTime = 0
soundBackground.play()

let pizzaSound = new Audio('/Eat Chips-SoundBible.com-1842806405.wav')
pizzaSound.currentTime = 2

    //---------------------------------------------------------CANVAS UPDATE---------------------------------------------

let frames = 0
let newPlayer = new Player()
let myObstacles = []
let myRewards = []

function updateCanvas() {

    backgroundImage.move()
    

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    backgroundImage.draw()
    newPlayer.update()
    score()
    frames++

    requestAnimationFrame(updateCanvas)

    for (i = 0; i < myObstacles.length; i++) {
        myObstacles[i].update()
        if (newPlayer.testCollision(myObstacles[i])) {

            window.setTimeout(document.location.reload(), 2000)
            if (frames % 8 === 0) {
                currentImgDie = (currentImgDie + 3) % 18
                sheep = arrPathDie[currentImgDie]
            }
            alert(`GAME OVER`) // clear the interval - You lost insert the Image 

        }
    }

    if (frames % 360 === 0) {
        let xBottom = 850
        myObstacles.push(new Obstacle(xBottom)) // Revisit add 2 additional obstacles 
    }

    for (i = 0; i < myRewards.length; i++) {
        myRewards[i].update()
        if (newPlayer.testCollision(myRewards[i])) {
            pizzaSound.play()
            double = true
        }
    }

    if (newPlayer.y == 720) {
        double = false
    }

    if (frames % 900 === 0) {
        console.log(myRewards)
        myRewards.push(new Reward()) // Revisit add 2 additional obstacles 
    }

    if (newPlayer.y == 720) {
        isClicked = false
    }

    if (isClicked == false) {
        if (frames % 8 === 0) {
            currentImg = (currentImg + 3) % 11
            sheep = arrPathRun[currentImg]
        }
    } else if (isClicked == true) {
        if (frames % 8 === 0) {
            currentImgJump = (currentImgJump + 3) % 5
            sheep = arrPathJump[currentImgJump]
        }
    }

}


let isClicked = false

document.onkeydown = function (e) {
    if (e.keyCode == 32) {
        isClicked = true
        sound.play()
        if (newPlayer.y > 550) {
            return newPlayer.speedY = -12
        }
    }
}


img.onload = updateCanvas