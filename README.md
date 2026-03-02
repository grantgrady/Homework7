# Homework 7: Interaction, Scoring, and Timers - Food Collection Game

## Name: Grant Grady

## Project Overview
An interactive game built on the previous assignment, adding **user interaction**, **scoring**, and **timers**. This project demonstrates classes, arrays, animation techniques, and game mechanics in p5.js. Features a character with idle/walk animations, collectible food objects, a countdown timer, and game over state.

## Updates from Previous Assignment
This version builds on the previous code with the following major enhancements:

| Previous Version | New Version (Homework 7) |
|-----------------|--------------------------|
| Static food positions | ✅ **Food moves randomly** at random time intervals |
| No scoring system | ✅ **Score tracking** with real-time display |
| No time limit | ✅ **60-second countdown timer** with visual warning |
| Game runs indefinitely | ✅ **Game over state** when timer reaches zero |
| No restart option | ✅ **Press SPACE to restart** after game over |
| Food collection only | ✅ **Food respawns** at new locations after collection |
| Simple collision | ✅ **Improved collision detection** with collection radius |
| Basic UI | ✅ **Enhanced UI** with timer color change (<10s turns red) |

## Features Implemented

### ✅ Character Animation (Requirements 1)
- **Two animation sets** stored in arrays:
  - `idleFrames` (4 frames) - gentle bouncing up and down
  - `walkFrames` (4 frames) - bouncing with leg movement
- **Animation switching** based on movement (idle → walk when using WASD)
- **Frame counter** (`ANIMATION_SPEED = 8`) controls animation timing
- **Smooth looping** through animation frames using modulo operator
- Each frame stored as simple object with offset and legOffset values

### ✅ Food Class (Requirements 2, 3, 4) - ENHANCED
- **Food class** (in `food.js`) with properties:
  - Position (x, y)
  - Size (30-45px)
  - Colors (mainColor, accentColor)
  - Shape type (0 = circle/berry, 1 = square/cracker)
  - Collected status (boolean)
  - Float offset for animation
  - **NEW: `moveTimer` for random movement intervals**
- **NEW METHODS ADDED TO FOOD CLASS:**
  - `update()` - Handles timer-based random movement
  - `checkCollection()` - Collision detection logic
  - `collect()` - Marks food as collected
  - `respawn()` - Resets food after collection
- **Display function** with shape-specific drawing:
  - Circle shape: berry with seeds and highlight
  - Square shape: cracker with hole details
- **5 food objects** (meets minimum requirement)
- **Each food is unique**:
  - Different positions (randomly placed on canvas)
  - Different sizes (random between 30-45px)
  - Different colors (random RGB values for main and accent)
  - Different shapes (randomly circle or square)

### ✅ NEW: Random Food Movement (Requirement 4)
- **Food moves to random locations** at unpredictable intervals
- **Timer-based system**: Each food has its own `moveTimer` counter
- **Random intervals**: Between 60-180 frames (approx 1-3 seconds at 60fps)
- **Occasional shape changes**: 30% chance to change shape when moving
- Movement feels natural and unpredictable without being chaotic

### ✅ NEW: Scoring System (Requirement 6)
- **Real-time score tracking** displayed in top-left corner
- **Score increases by 1** each time food is collected
- **Immediate visual feedback** - score updates instantly
- **Final score displayed** on game over screen

### ✅ NEW: Countdown Timer (Requirement 7)
- **60-second timer** starts when game begins
- **Real-time countdown** using `millis()` for accuracy
- **Visual warning**: Timer turns RED when less than 10 seconds remain
- **Game ends automatically** when timer reaches zero
- **Clear display** in top-center of screen

### ✅ NEW: Game Over State
- **Movement stops** when game ends
- **Scoring stops** - no more points can be earned
- **Dark overlay** covers the screen
- **"GAME OVER" message** displayed prominently
- **Final score shown** below game over message
- **Press SPACE to restart** - completely resets the game

### ✅ NEW: Food Respawn System
- When food is collected:
  - Score increases by 1
  - Food disappears briefly (collected state)
  - After 500ms delay, food **respawns** at new random location
  - Food gets new random shape (30% chance)
  - Timer resets for next random movement

### ✅ Additional Features
- **Interactive movement** (WASD keys)
- **Screen boundary prevention** - character stays on canvas
- **Visual feedback** with floating animation (food gently bobs up and down)
- **Proper folder structure** (index.html, js/, libs/)
- **Title in upper-left corner**
- **Name in lower-right corner**
- **Animation indicator** shows current animation and frame number


