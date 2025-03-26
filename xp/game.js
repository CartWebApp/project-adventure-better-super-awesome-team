// Load and render the dungeon map
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const TILE_SIZE = 32;
let mapData;
let tilesetImage = new Image();
tilesetImage.src = "json-experiment/dawn_of_the_gods.png"; // Replace with actual tileset image

fetch("json-experiment/purple-1.json") // Load the JSON file
  .then(response => response.json())
  .then(data => {
    mapData = data;
    renderMap();
  });

function renderMap() {
    if (!mapData) return;

    const { width, height, layers } = mapData;
    const tileLayer = layers.find(layer => layer.type === "tilelayer");

    if (!tileLayer) return;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const tileIndex = tileLayer.data[y * width + x] - 1;
            if (tileIndex >= 0) {
                const sx = (tileIndex % (tilesetImage.width / TILE_SIZE)) * TILE_SIZE;
                const sy = Math.floor(tileIndex / (tilesetImage.width / TILE_SIZE)) * TILE_SIZE;
                ctx.drawImage(tilesetImage, sx, sy, TILE_SIZE, TILE_SIZE, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
    }
}

// Process objects (spawn points, teleporters, etc.)
function processObjects() {
    const objectLayer = mapData.layers.find(layer => layer.type === "objectgroup");
    if (!objectLayer) return;
    
    objectLayer.objects.forEach(obj => {
        if (obj.name === "starting point") {
            console.log("Player starts at:", obj.x, obj.y);
        } else if (obj.name === "teleport") {
            console.log("Teleport located at:", obj.x, obj.y);
        }
    });
}

// Ensure tileset loads before rendering
tilesetImage.onload = renderMap;
