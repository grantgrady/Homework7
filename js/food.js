class Food {
    constructor(x, y, size, color1, color2, shape) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.mainColor = color1;
        this.accentColor = color2;
        this.shape = shape; // 0 = circle, 1 = square
        this.collected = false;
        this.floatOffset = random(TWO_PI);
        this.moveTimer = floor(random(60, 180));
    }
    
    display() {
        if (this.collected) return;
        
        push();
        translate(this.x, this.y);
        
        let floatY = sin(frameCount * 0.05 + this.floatOffset) * 3;
        translate(0, floatY);
        
        if (this.shape === 0) {
            // Circle food (berry)
            fill(this.mainColor);
            noStroke();
            ellipse(0, 0, this.size, this.size);
            
            // Highlight
            fill(255, 255, 255, 150);
            ellipse(-3, -3, this.size/4, this.size/4);
            
            // Seeds
            fill(this.accentColor);
            for (let i = 0; i < 3; i++) {
                let angle = (TWO_PI / 3) * i;
                let x = cos(angle) * this.size/4;
                let y = sin(angle) * this.size/4;
                ellipse(x, y, 3, 3);
            }
        } else {
            // Square food (cracker)
            fill(this.mainColor);
            noStroke();
            rectMode(CENTER);
            rect(0, 0, this.size, this.size, 3);
            
            // Holes
            fill(this.accentColor);
            ellipse(-5, -5, 4, 4);
            ellipse(5, 5, 4, 4);
            ellipse(5, -5, 3, 3);
            ellipse(-5, 5, 3, 3);
        }
        
        pop();
    }
    
    // Update timer and move if needed
    update() {
        if (this.collected) return;
        
        this.moveTimer--;
        if (this.moveTimer <= 0) {
            this.x = random(100, 700);
            this.y = random(100, 500);
            
            if (random(1) < 0.3) {
                this.shape = floor(random(2));
            }
            
            this.moveTimer = floor(random(60, 180));
        }
    }
    
    // Check if character collected this food
    checkCollection(cx, cy, radius) {
        if (this.collected) return false;
        let d = dist(cx, cy, this.x, this.y);
        return d < radius;
    }
    
    // Collect the food
    collect() {
        this.collected = true;
    }
    
    // Respawn food after collection
    respawn() {
        this.collected = false;
        this.x = random(100, 700);
        this.y = random(100, 500);
        this.shape = floor(random(2));
        this.moveTimer = floor(random(60, 180));
    }
}
