const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 10000;
canvas.height = 1000;

// Load Images
const playerImage = new Image();
playerImage.src = "thug-idle.png"; // Ensure this matches your actual file name
const backgroundImage = new Image();
backgroundImage.src = "canvas/Xbox 360 - Scott Pilgrim vs the World The Game - Level 1 - Frozen Suburbs.png"; // Ensure this matches your actual file name

// Player Class
class Player {
    constructor() {
        this.width = 50;
        this.height = 80;
        this.x = 100;
        this.y = canvas.height - this.height - 20;
        this.speed = 5;
        this.velocityX = 0;
    }

    move() {
        this.x += this.velocityX;

        // Prevent moving left past screen
        if (this.x < 0) this.x = 0;

        // Side-scrolling: Stop player at center and move background instead
        if (this.x > canvas.width / 2) {
            this.x = canvas.width / 2;
            background.scrollX -= this.velocityX;
        }
    }

    draw() {
        if (playerImage.complete) {
            ctx.drawImage(playerImage, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = "red";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

// Background Class
class Background {
    constructor() {
        this.scrollX = 0;
    }

    draw() {
        ctx.drawImage(backgroundImage, this.scrollX, 0, canvas.width, canvas.height);
    }
}

// Input Handler
class InputHandler {
    constructor(player) {
        this.keys = {};

        window.addEventListener("keydown", (e) => {
            this.keys[e.key] = true;
            this.updatePlayerVelocity(player);
        });

        window.addEventListener("keyup", (e) => {
            delete this.keys[e.key];
            this.updatePlayerVelocity(player);
        });
    }

    updatePlayerVelocity(player) {
        player.velocityX = (this.keys["ArrowRight"] ? player.speed : 0) - 
                           (this.keys["ArrowLeft"] ? player.speed : 0);
    }
}

// Game Setup
const player = new Player();
const background = new Background();
const input = new InputHandler(player);

// Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    background.draw();
    player.move();
    player.draw();

    requestAnimationFrame(gameLoop);
}

// Start game when images load
playerImage.onload = backgroundImage.onload = function() {
    gameLoop();
};

playerImage.onerror = function() {
    console.error("Failed to load player image. Check file path.");
};
backgroundImage.onerror = function() {
    console.error("Failed to load background image. Check file path.");
};