const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.height = 500;
canvas.width = 500;

//* MECHANICAL PADDLE MOVEMENT-start

let rightPressed = false;
let leftPressed = false;

document.addEventListener('keydown', keyDownHandler);
document;addEventListener('keyup' , keyUpHandler);

function keyDownHandler(e){
    if(e.key == 'Right' || e.key == 'ArrowRight'){
        rightPressed = true
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = true
    }
};

function keyUpHandler(e){
    if(e.key == 'Right' || e.key == 'ArrowRight'){
        rightPressed = false
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = false
    }
};

function movePaddle() {
    if(rightPressed) {
        paddle.x += 7
        if(paddle.x + paddle.width >= canvas.width) {
            paddle.x = canvas.width - paddle.width
        }
    } else if(leftPressed) {
        paddle.x -= 7
        if(paddle.x < 0) {
            paddle.x = 0
        }
    }
}


//* MECHANICAL PADDLE MOVEMENT-end

//? CREATION BALL/MOVEMENT AND PADDLE-start

let speed = 3;

let ball = {
    x: canvas.width / 2,
    y: canvas.height -50,
    dx: speed,
    dy: -speed + 1,
    radius: 7,
    draw: function() {
        ctx.beginPath();
        ctx.fillStyle = '#000';
        ctx.arc(this.x,this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }
};


let paddle = {
    height: 10,
    width: 76,
    x: canvas.width / 2 - 76 / 2,
    draw: function() {
        ctx.beginPath();
        ctx.rect(this.x, canvas.height - this.height, this.width, this.height);
        ctx.fillStyle = '#000'
        ctx.closePath
        ctx.fill()
    }
}

//? CREATION BALL/MOVEMENT AND PADDLE-end

//! FUNCTION PLAY-start

function play() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ball.draw()
    paddle.draw()
    drawBricks()
    movePaddle()
    collisionDetection()

    ball.x += ball.dx
    ball.y += ball.dy

    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx *= -1
    }

    if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1
    }

    if (
        ball.x >= paddle.x && 
        ball.x <= paddle.x + paddle.width &&
        ball.y + ball.radius >= canvas.height - paddle.height
        ) {
        ball.dy *= -1
    }

    requestAnimationFrame(play);
};

//! FUNCTION PLAY-end

//? CREATION BRICKS/COLLISION-start

let brickRowCount = 3,
    brickColumnCount = 5,
    brickWidth = 70,
    brickHeight = 20,
    brickPadding = 20,
    brickOffsetTop = 30,
    brickOffsetLeft = 35;

let bricks = []

function generateBricks(){
    for (let i = 0; i < brickColumnCount; i++) {
        bricks[i] = []
        for (let j = 0; j < brickRowCount; j++) {
            bricks[i][j] = { x: 0, y: 0, status: 1}
        }
    }
}

function drawBricks() {
    for (let i = 0; i < brickColumnCount; i++) {
        for (let j = 0; j < brickRowCount; j++) {
            if (bricks[i][j].status === 1) {
                let brickX= i * (brickWidth + brickPadding) + brickOffsetLeft
                let brickY= j * (brickHeight + brickPadding) + brickOffsetTop
                bricks[i][j].x = brickX
                bricks[i][j].y = brickY
                ctx.beginPath()
                ctx.rect(brickX, brickY, brickWidth, brickHeight)
                ctx.fillStyle = "#000"
                ctx.fill()
                ctx.closePath()
            }
        }
    }
}

function collisionDetection() {
    for (let i = 0; i < brickColumnCount; i++) {
        for (let j = 0; j < brickRowCount; j++) {
            let b = bricks[i][j]
            if (b.status == 1) {
                if (ball.x >= b.x &&
                    ball.x <= b.x + brickWidth &&
                    ball.y >= b.y &&
                    ball.y <= b.y + brickHeight) {
                        ball.dy *= -1
                        b.status = 0
                        // score++
                    }
            }
        }
    }
}

//? CREATION BRICKS COLLISION-end

//TODO START GAME

generateBricks()
play()