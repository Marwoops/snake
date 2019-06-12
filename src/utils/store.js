const UPP = 1, DWN = 3, LFT = 2, RGT = 4;

class Board {
    constructor() {
        this.snake = new Snake(12, 13);
        this.fruits = new Fruits;
    };

    handleMove(key) {
        switch(key) {
            case 37: this.snake.setDir(LFT);
                    break;
            case 38: this.snake.setDir(UPP);
                    break;
            case 39: this.snake.setDir(RGT);
                    break;
            case 40: this.snake.setDir(DWN);
                    break;
        };
    };

    isOnBoard(dir) {
        switch (dir) {
            case LFT: if ((this.snake.queue[0][0] - 1)  < 0) { return false; }
                            else { return true;  };

            case UPP: if ((this.snake.queue[0][1] - 1)  < 0) { return false; }
                            else { return true };

            case RGT: if ((this.snake.queue[0][0] + 1)  >= 25) { return false; }
                            else { return true };

            case DWN: if ((this.snake.queue[0][1] + 1)  >= 25) { return false; } 
                            else { return true };
        };
    };

    isOnFruit() {
        if (this.fruits.list.length > 0) {
            if ((this.snake.queue[0][0] == this.fruits.list[0][0]) && (this.snake.queue[0][1] == this.fruits.list[0][1])) {
                this.fruits.remove(0);
                return true;
            };
        };
    };

    eatsItself() {
        let i;
        for (i = 1; i < this.snake.queue.length; i++) {
            if ((this.snake.queue[0][0] == this.snake.queue[i][0]) && (this.snake.queue[0][1] == this.snake.queue[i][1])) {
                return true;
            };
        };
    };

    handleUpdate() {
        if (this.isOnBoard(this.snake.currentDirrection)) {

            if (this.isOnFruit()) {
                this.snake.eat();
            };
    
            if (this.fruits.list.length === 0) {
                this.fruits.spawn();
            };
            
            if (!this.isOnBoard(this.snake.currentDirrection) || this.eatsItself()) {
                return false;
            } else {
                this.snake.move(this.snake.currentDirrection);
                return true;
            };
            
        };
        
    };
};

class Snake {
    constructor(x , y) {
        this.queue = [[x, y], [x + 1 , y], [x + 2, y], [x + 3, y], [x + 4, y]];

        this.currentDirrection = LFT;

    };

    move(dir) {
        let x = this.queue[0][0];
        let y = this.queue[0][1];
        
        this.setDir(dir);

        switch (this.currentDirrection) {
            case LFT: x -= 1;
                        break;
            case UPP: y -= 1;
                        break;
            case RGT: x += 1;
                        break;
            case DWN: y += 1;
                        break;
        };

        let i = this.queue.length - 1;
    
        while (i > 0) {
            this.queue[i][0] = this.queue[i - 1][0];
            this.queue[i][1] = this.queue[i - 1][1];
            i--;
        };

        this.queue[0][0] = x;
        this.queue[0][1] = y;
        
    };

    setDir(dir) {
        if ((dir + 2) !== this.currentDirrection && (dir - 2) !== this.currentDirrection) {
            this.currentDirrection = dir;
        };
    };

    eat() { this.queue.push([0, 0]); };
};

class Fruits {
    constructor() {
        this.list = [];
    };

    spawn() { this.list.push([Math.round(Math.random() * 24), Math.round(Math.random() * 24)]); };
    remove(i) { this.list.splice(i, 1); };
};



export default Board;