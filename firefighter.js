class Firefighter{
    constructor(){
        this.player = createSprite(200,510);
        
        this.player.addImage("fighter", firefighter);
    }

    moveThePlayer() {
        if(keyDown(RIGHT_ARROW)) {
            this.player.x = this.player.x + 5;
        }
        if(keyDown(LEFT_ARROW)) {
            this.player.x = this.player.x - 5;
        }
        if(keyDown("space")) {
            this.player.velocityY = -15;
        }

        if(this.player.velocityY < 0) {
            this.player.velocityY = this.player.velocityY + 0.5;
        }
    }


    
    
}