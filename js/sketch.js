/*
 * Homework 7: Interaction, Scoring, and Timers
 * Student Name: Grant Grady
 * 
 * Features:
 * - Character with idle and walk animations (shapes)
 * - Food class for food objects
 * - Keyboard movement (WASD)
 * - Score tracking
 * - 60-second countdown timer
 * - Game over state
 * - Food moves at random intervals
 */

// Game state
let gameState = "playing"; // "playing" or "gameover"
let score = 0;
let startTime;
let timeLeft = 60; // 60 seconds

// Character position
let characterX = 400;
let characterY = 300;
let characterSpeed = 4;

// Movement flags
let movingUp = false;
let movingDown = false;
let movingLeft = false;
let movingRight = false;
let isMoving = false;

// Animation variables
let idleFrames = [];
let walkFrames = [];
let currentAnimation = [];
let currentFrame = 0;
let frameCounter = 0;
const ANIMATION_SPEED = 8;

// Food objects array - Using the previously created food class
let foods = [];
const NUM_FOODS = 5;

function setup() {
    createCanvas(800, 600);
    
    setupAnimationFrames();
    
    initializeFood();
    
    startTime = millis();
    
    textSize(16);
    textAlign(CENTER);
}

function setupAnimationFrames() {
    idleFrames = [
        { offset: 0 },
        { offset: 2 },
        { offset: 0 },
        { offset: -2 }
    ];
    
    walkFrames = [
        { offset: 0, legOffset: 3 },
        { offset: 2, legOffset: 0 },
        { offset: 0, legOffset: -3 },
        { offset: -2, legOffset: 0 }
    ];
    
    currentAnimation = idleFrames;
}

function initializeFood() {
    for (let i = 0; i < NUM_FOODS; i++) {
        let x = random(100, 700);
        let y = random(100, 500);
        let size = random(30, 45);
        
        let r1 = random(150, 255);
        let g1 = random(50, 200);
        let b1 = random(50, 150);
        let color1 = color(r1, g1, b1);
        
        let r2 = random(50, 200);
        let g2 = random(50, 200);
        let b2 = random(50, 200);
        let color2 = color(r2, g2, b2);
        
        let shape = floor(random(2));
        
        let food = new Food(x, y, size, color1, color2, shape);
        foods.push(food);
    }
}

function draw() {
    updateTimer();
    
    drawBackground();
    
    if (gameState === "playing") {
        handleMovement();
        
        updateAnimation();
        
        updateFoodPositions();
        
        checkFoodCollection();
    }
    
    drawCharacter();
    
    // Draw all food objects
    for (let i = 0; i < foods.length; i++) {
        foods[i].display();
    }
    
    drawUI();
    
    drawTextElements();
}

function drawBackground() {
    // Sky
    background(135, 206, 235);
    
    // Ground
    fill(100, 200, 100);
    noStroke();
    rect(0, height - 80, width, 80);
    
    // Simple grass details
    stroke(50, 150, 50);
    strokeWeight(1);
    for (let x = 0; x < width; x += 20) {
        line(x, height - 80, x + random(-5, 5), height - 95);
    }
    
    // Game over overlay
    if (gameState === "gameover") {
        fill(0, 0, 0, 200);
        rect(0, 0, width, height);
    }
}

function updateTimer() {
    if (gameState !== "playing") return;
    
    let elapsed = (millis() - startTime) / 1000; // Convert to seconds
    timeLeft = max(0, 60 - elapsed);
    
    if (timeLeft <= 0) {
        gameState = "gameover";
        timeLeft = 0;
    }
}

function handleMovement() {
    isMoving = movingUp || movingDown || movingLeft || movingRight;
    
    currentAnimation = isMoving ? walkFrames : idleFrames;
    
    if (movingUp) characterY -= characterSpeed;
    if (movingDown) characterY += characterSpeed;
    if (movingLeft) characterX -= characterSpeed;
    if (movingRight) characterX += characterSpeed;
    
    characterX = constrain(characterX, 40, width - 40);
    characterY = constrain(characterY, 40, height - 100);
}

function updateAnimation() {
    frameCounter++;
    
    if (frameCounter >= ANIMATION_SPEED) {
        frameCounter = 0;
        currentFrame++;
        
        if (currentFrame >= currentAnimation.length) {
            currentFrame = 0;
        }
    }
}

function updateFoodPositions() {
    for (let i = 0; i < foods.length; i++) {
        if (foods[i].collected) continue;
        
        foods[i].update();
    }
}

function checkFoodCollection() {
    for (let i = 0; i < foods.length; i++) {
        if (foods[i].collected) continue;
        
        if (foods[i].checkCollection(characterX, characterY, 50)) {
            foods[i].collect();
            
            score++;
            
            setTimeout((food) => {
                food.respawn();
            }, 500, foods[i]);
        }
    }
}

function drawCharacter() {
    push();
    translate(characterX, characterY);
    
    let frame = currentAnimation[currentFrame];
    let yOffset = frame.offset || 0;
    
    // Body
    fill(100, 150, 200); // Blue shirt
    noStroke();
    rectMode(CENTER);
    rect(0, 0 + yOffset, 30, 40, 5);
    
    // Head
    fill(255, 220, 180);
    ellipse(0, -25 + yOffset, 25, 25);
    
    // Hat
    fill(150, 100, 50);
    rect(-12, -40 + yOffset, 24, 5);
    rect(-6, -45 + yOffset, 12, 8);
    
    // Eyes
    fill(0);
    ellipse(-6, -30 + yOffset, 3, 4);
    ellipse(6, -30 + yOffset, 3, 4);
    
    // Smile
    stroke(0);
    strokeWeight(1);
    noFill();
    arc(0, -23 + yOffset, 10, 5, 0, PI);
    
    // Legs with walk animation
    stroke(50, 50, 150); // Dark blue
    strokeWeight(5);
    
    let legOffset = frame.legOffset || 0;
    
    // Left leg
    line(-8, 20 + yOffset, -15, 35 + yOffset + legOffset);
    
    // Right leg
    line(8, 20 + yOffset, 15, 35 + yOffset - legOffset);
    
    pop();
}

function drawUI() {
    // Score display
    fill(255);
    textSize(28);
    textAlign(LEFT);
    text("Score: " + score, 20, 50);
    
    // Timer display
    textAlign(CENTER);
    let timerColor = timeLeft < 10 ? color(255, 0, 0) : color(255);
    fill(timerColor);
    textSize(32);
    text("Time: " + timeLeft.toFixed(1) + "s", width/2, 50);
    
    // Game over message
    if (gameState === "gameover") {
        fill(255, 0, 0);
        textSize(48);
        textAlign(CENTER);
        text("GAME OVER", width/2, height/2);
        
        fill(255);
        textSize(24);
        text("Final Score: " + score, width/2, height/2 + 50);
        text("Press SPACE to restart", width/2, height/2 + 100);
    }
    
    // Food count
    fill(255);
    textSize(14);
    textAlign(RIGHT);
    text("Food items: " + foods.length, width - 20, 80);
}

function drawTextElements() {
    // Title in upper-left
    fill(255);
    textSize(20);
    textAlign(LEFT);
    text("Food Collection Game", 20, 80);
    
    // Animation indicator
    textSize(12);
    text("Anim: " + (isMoving ? "Walk" : "Idle") + 
         " • Frame: " + (currentFrame + 1), 20, 100);
    
    // Name in lower-right
    textSize(14);
    textAlign(RIGHT);
    fill(255);
    text("Created by Grant Grady", width - 20, height - 50);
}

function keyPressed() {
    if (gameState !== "playing") {
        if (key === ' ') {
            restartGame();
        }
        return false;
    }
    
    if (key === 'w' || key === 'W') movingUp = true;
    if (key === 's' || key === 'S') movingDown = true;
    if (key === 'a' || key === 'A') movingLeft = true;
    if (key === 'd' || key === 'D') movingRight = true;
    
    return false;
}

function keyReleased() {
    if (key === 'w' || key === 'W') movingUp = false;
    if (key === 's' || key === 'S') movingDown = false;
    if (key === 'a' || key === 'A') movingLeft = false;
    if (key === 'd' || key === 'D') movingRight = false;
    
    return false;
}

function restartGame() {
    gameState = "playing";
    score = 0;
    startTime = millis();
    timeLeft = 60;
    characterX = 400;
    characterY = 300;
    
    for (let i = 0; i < foods.length; i++) {
        foods[i].respawn();
    }
}
