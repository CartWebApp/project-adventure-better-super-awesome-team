// Set up canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Player settings
let player = {
  x: canvas.width / 2,
  y: canvas.height / 1,
  size: 150, // Size of the player character
  speed: 15,
  image: new Image(),
  imageSrc: 't-man.png' // Path to your static PNG image
  
};

// Load player image
player.image.src = player.imageSrc;
player.image.onload = function() {
  console.log('Image loaded'); // Log to confirm the image is loaded
  gameLoop(); // Start the game loop after image is loaded
};

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  movePlayer();
  drawPlayer();
  
  requestAnimationFrame(gameLoop);
}

// Player movement
function movePlayer() {
  if (keys['ArrowUp']) player.y -= player.speed;
  if (keys['ArrowDown']) player.y += player.speed;
  if (keys['ArrowLeft']) player.x -= player.speed;
  if (keys['ArrowRight']) player.x += player.speed;
}

// Draw player with static image
function drawPlayer() {
  // Draw the player character (image) on the canvas
  ctx.drawImage(
    player.image,
    player.x - player.size / 2, player.y - player.size / 2, player.size, player.size
  );
}

// Handle keyboard input
let keys = {};
window.addEventListener('keydown', (e) => {
  keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});





///////////////////////////////////////////////////////////////////
