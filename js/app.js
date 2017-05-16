// 这是我们的玩家要躲避的敌人
var Enemy = function(x,y) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = x;
    this.y = y;
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += dt*parseInt(500*Math.random()*Math.random());
    if(this.x >= 505) {
        this.x = 0;
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(x,y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function(dt) {
    if(dt == 30) {
        this.y -= dt;
    }
    if(dt == 31) {
        this.x += dt;
    }
    if (dt == 32) {
        this.y += dt;
    }
    if(dt == 33) {
        this.x -= dt;
    }
    if(this.x >= 505 || this.y >= 450 || this.x<0 ) {
        this.x = 300;
        this.y = 400;
    }
    for (var i = 0; i < 3; i++) {
        if(Math.abs(allEnemies[i].x - this.x) <=20 && Math.abs(allEnemies[i].y - this.y) <= 20) {
            this.x = 300;
            this.y = 400;
            ctx.font = "36pt Impact";
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.fillText("LOSE,Try AGAIN",250,40);

            ctx.strokeStyle = "black";
            ctx.lineWidth = 3;
            ctx.strokeText("LOSE,Try AGAIN",250,40);
            setTimeout("ctx.clearRect(0,0,400,200);",2000);
        }
    }
    if(this.y <= 0) {
            this.x = 300;
            this.y = 400;
            ctx.font = "36pt Impact";
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.fillText("YOU WIN",250,40);

            ctx.strokeStyle = "black";
            ctx.lineWidth = 3;
            ctx.strokeText("YOU WIN",250,40);
            setTimeout("ctx.clearRect(0,0,400,200);",2000);
    }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(input) {
    if(input == "up") {
        player.update(30);
    }
    if(input == 'right') {
        player.update(31);
    }
    if(input == 'down') {
        player.update(32);
    }
    if(input == 'left') {
        player.update(33);
    }
}
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
player = new Player(300,400);
enemy1 = new Enemy(0,220);
enemy2 = new Enemy(0,60);
enemy3 = new Enemy(0,140);
allEnemies = [enemy1,enemy2,enemy3];

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
