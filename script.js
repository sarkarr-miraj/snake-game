const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

let snake = [{ x: 200, y: 100 }];
let direction = { x: 20, y: 0 };
let food = { x: 100, y: 100 };
let score = 0;
let gameInterval;

function drawSnake() {
    ctx.fillStyle = "#00ffcc";
    snake.forEach((part, index) => {
        ctx.fillRect(part.x, part.y, 20, 20);
        if (index === 0) {
            ctx.fillStyle = "#ffcc00";
        }
    });
}

function moveSnake() {
    let newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(newHead);
    if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        placeFood();
    } else {
        snake.pop();
    }
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 20, 20);
}

function placeFood() {
    food.x = Math.floor(Math.random() * 20) * 20;
    food.y = Math.floor(Math.random() * 20) * 20;
}

function checkCollision() {
    if (
        snake[0].x < 0 || snake[0].y < 0 ||
        snake[0].x >= canvas.width || snake[0].y >= canvas.height
    ) {
        clearInterval(gameInterval);
        alert("Game Over! Your score: " + score);
        document.location.reload();
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            clearInterval(gameInterval);
            alert("Game Over! Your score: " + score);
            document.location.reload();
        }
    }
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    moveSnake();
    drawSnake();
    checkCollision();
}

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            if (direction.y === 0) direction = { x: 0, y: -20 };
            break;
        case "ArrowDown":
            if (direction.y === 0) direction = { x: 0, y: 20 };
            break;
        case "ArrowLeft":
            if (direction.x === 0) direction = { x: -20, y: 0 };
            break;
        case "ArrowRight":
            if (direction.x === 0) direction = { x: 20, y: 0 };
            break;
    }
});

function startGame() {
    gameInterval = setInterval(updateGame, 100);
}

startGame();