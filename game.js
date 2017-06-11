const setup = [];

for (let i = 0; i < 25; i++) {
	setup[i] = [];

	for (let j = 0; j < 25; j++) {
		setup[i][j] = 0;
	}
}

var x;
var y;
var fruit = 0;
var lost = false;
var started = false;
var fruit = 0;
var fruits = [];
var direction;
var c = document.getElementById('canvas');
var ctx = c.getContext("2d");

Snake = class {
	constructor() {

		this.queue = [];
		this.generateHead = function() {
			ctx.beginPath();
			ctx.fillStyle = "#4697f2";
			ctx.fillRect(512, 384, 32, 32);
			snake.queue.push([512 / 32, 384 / 32]);
		};
		this.grow = function (dir) {
			ctx.beginPath();
			ctx.fillStyle="#4697f2";

			switch (dir) {
				case ("ArrowUp"):
					x = snake.queue[snake.queue.length - 1][0]
					y = snake.queue[snake.queue.length - 1][1]
					ctx.fillRect(x * 32, (y + 1) * 32, 32, 32)
					ctx.stroke();
					snake.queue.push([x, y + 1]);
					break;
				case ("ArrowDown"):
					x = snake.queue[snake.queue.length - 1][0]
					y = snake.queue[snake.queue.length - 1][1]
					ctx.fillRect(x * 32, (y - 1) * 32, 32, 32)
					ctx.stroke();
					snake.queue.push([x, y - 1]);
					break;
				case ("ArrowRight"):
					x = snake.queue[snake.queue.length - 1][0]
					y = snake.queue[snake.queue.length - 1][1]
					ctx.fillRect((x - 1)* 32, y * 32, 32, 32)
					ctx.stroke();
					snake.queue.push([x - 1, y]);
					break;
				case ("ArrowLeft"):
					x = snake.queue[snake.queue.length - 1][0]
					y = snake.queue[snake.queue.length - 1][1]
					ctx.fillRect((x + 1)* 32, y * 32, 32, 32)
					ctx.stroke();
					snake.queue.push([x + 1, y]);
					break;
			}
		};
		this.move = function (dir) {
			ctx.beginPath();
			ctx.fillStyle="#4697f2";

			switch  (dir) {
				case ("ArrowUp"):
				x = snake.queue[0][0];
				y = snake.queue[0][1];
				ctx.fillRect(x * 32, (y - 1) * 32, 32, 32)
				ctx.stroke();
				snake.queue.splice(0, 0, [x, y - 1]);
				break;

				case ("ArrowDown"):
				x = snake.queue[0][0]
				y = snake.queue[0][1]
				ctx.fillRect(x * 32, (y + 1) * 32, 32, 32)
				ctx.stroke();
				snake.queue.splice(0, 0, [x, y + 1]);
				break;

				case ("ArrowRight"):

				x = snake.queue[0][0]
				y = snake.queue[0][1]
				ctx.fillRect((x + 1) * 32, y * 32, 32, 32)
				ctx.stroke();
				snake.queue.splice(0, 0, [x + 1, y]);

				break;

				case ("ArrowLeft"):
				x = snake.queue[0][0]
				y = snake.queue[0][1]
				ctx.fillRect((x - 1) * 32, y * 32, 32, 32)
				ctx.stroke();
				snake.queue.splice(0, 0, [x - 1, y]);
				break;
			}
				ctx.fillStyle="#FFFFFF";
				x = snake.queue[snake.queue.length - 1][0];
				y = snake.queue[snake.queue.length - 1][1];
				ctx.fillRect(x * 32, y * 32, 32, 32);
				ctx.stroke();
				snake.queue.pop();
		};

	}

}

var snake = new Snake;

function generateFruit() {
	x = 32 * Math.floor(Math.random() * 25);
	y = 32 * Math.floor(Math.random() * 25);

	ctx.beginPath();
	ctx.fillStyle = "#FF0000";
	ctx.fillRect(x, y, 32, 32);
	setup[x / 32][y / 32] = 1;
	fruits[0] = x;
	fruits[1] = y;
}

function reprint () {
	if (fruit === 1) {
		ctx.beginPath();
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(fruits[0], fruits[1], 32, 32);
	}
	

	ctx.beginPath();
	ctx.fillStyle = "#4697f2";
	for (let i = 0; i < snake.queue.length; i++) {
		ctx.fillRect(snake.queue[i][0] * 32, snake.queue[i][1] * 32, 32, 32);
		ctx.stroke();
	}
}

function borderCollision (dir) {
    switch (dir) {
        case ("ArrowUp"):
            if (setup[snake.queue[0][0]][snake.queue[0][1]] === undefined) {
                return true;
            } else {
                return false;
            }
        case ("ArrowDown"):
            if (setup[snake.queue[0][0]][snake.queue[0][1]] === undefined) {
                return true;
            } else {
                return false;
            }
        case ("ArrowRight"):
            if (setup[snake.queue[0][0]] === undefined) {
                return true;
            } else {
                return false;
            }
        case ("ArrowLeft"):
            if (setup[snake.queue[0][0]] === undefined) {
                return true;
            } else {
                return false;
            }
}}
snake.generateHead()

window.addEventListener('keydown', e => {
	if (e.key === "ArrowUp"  || e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "ArrowLeft") {
		direction = e.key;
		started = true;
	}
});

setInterval(function() {
	if (lost === false && fruit === 0 && started === true) {
		generateFruit();
		fruit++;
	}
}, 3000);

setInterval(function() {
	if (lost === false && started == true) {
		ctx.beginPath();
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(0, 0, 800, 800);
		reprint();
		snake.move(direction);
	}
	if (borderCollision(direction) === false) {
		if (setup[snake.queue[0][0]][snake.queue[0][1]] === 1) {
			fruit--;
			setup[snake.queue[0][0]][snake.queue[0][1]] = 10;
			snake.grow(direction);
		} 
	} else if (borderCollision(direction) === true) {
			lost = true;
			alert("You loose. Press F5 then \"OK\" to retart the game.");
		}
}, 500);