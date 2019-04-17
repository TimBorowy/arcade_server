var Game = (function () {
    function Game() {
        console.log("new game created!");
        this.playerOne = new Square(82, 70, 68, 71, 65);
        this.playerTwo = new Square(38, 40, 37, 39, 16);
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.playerOne.move();
        this.playerTwo.move();
        requestAnimationFrame(function () {
            return _this.gameLoop();
        });
    };
    return Game;
}());
window.addEventListener("load", function () {
    return new Game();
});
var Square = (function () {
    function Square(upKey, downKey, leftKey, rightKey, actionKey) {
        var _this = this;
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.leftSpeed = 0;
        this.rightSpeed = 0;
        this.htmlElement = document.createElement('square');
        document.body.appendChild(this.htmlElement);
        this.upKey = upKey;
        this.downKey = downKey;
        this.leftKey = leftKey;
        this.rightKey = rightKey;
        this.actionKey = actionKey;
        this.x = 10;
        this.y = 10;
        this.htmlElement.style.left = this.x + 'px';
        this.htmlElement.style.top = this.y + 'px';
        this.colors = ['red', 'blue', 'black', 'green', 'orange', 'tomato', 'yellow', 'purple', 'teal'];
        window.addEventListener("keydown", function (e) {
            return _this.onKeyDown(e);
        });
        window.addEventListener("keyup", function (e) {
            return _this.onKeyUp(e);
        });
    }
    Square.prototype.move = function () {
        var newY = this.y - this.upSpeed + this.downSpeed;
        var newX = this.x - this.leftSpeed + this.rightSpeed;
        if (newY > 0 && newY + 100 < window.innerHeight)
            this.y = newY;
        if (newX > 0 && newX + 100 < window.innerWidth)
            this.x = newX;
        this.draw();
    };
    Square.prototype.changeColor = function () {
        console.log('change color');
        var newColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        while (newColor == this.htmlElement.style.backgroundColor) {
            newColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        }
        this.htmlElement.style.backgroundColor = newColor;
    };
    Square.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case this.upKey:
                this.upSpeed = 5;
                console.log('square up wudawup');
                break;
            case this.downKey:
                this.downSpeed = 5;
                break;
            case this.leftKey:
                this.leftSpeed = 5;
                break;
            case this.rightKey:
                this.rightSpeed = 5;
                break;
        }
    };
    Square.prototype.onKeyUp = function (e) {
        switch (e.keyCode) {
            case this.upKey:
                this.upSpeed = 0;
                console.log('square stop wudawop');
                break;
            case this.downKey:
                this.downSpeed = 0;
                break;
            case this.leftKey:
                this.leftSpeed = 0;
                break;
            case this.rightKey:
                this.rightSpeed = 0;
                break;
            case this.actionKey:
                this.changeColor();
                break;
        }
    };
    Square.prototype.draw = function () {
        this.htmlElement.style.transform = 'translate(' + this.x + 'px , ' + this.y + 'px)';
    };
    return Square;
}());