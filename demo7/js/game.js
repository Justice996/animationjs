// 等所有资源加载完再开始创建画布
document.addEventListener('DOMContentLoaded',function (){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width=500;
    canvas.height=800;

    // class里尽量避免使用全局变量
    class Game{
        constructor(ctx,width,height) {
            this.ctx = ctx;
            this.width=width;
            this.height=height;
            // 敌人数组
            this.enemies = [];
            //控制添加敌人
            this.enemyInterval = 100;
            this.enemyTimer = 0;
            //敌人的类型
            this.enemyTypes = ['worm','ghost','spider']
        }
        //更新整个游戏
        update(deltaTime){
            // 删除被标记的敌人
            this.enemies = this.enemies.filter(item=>!item.markedForDeletion)
            if(this.enemyTimer>this.enemyInterval){
                //每间隔20帧 添加一个新怪物
                this.#addNewEnemy();
                this.enemyTimer=0;
                console.log(this.enemies)
            }else{
                //性能越高加的越慢 越低加的越快 实现同样的效果
                this.enemyTimer+=deltaTime;
            }

            this.enemies.forEach(item=>item.update(deltaTime));
        }
        //绘制整个游戏
        draw(){
            this.enemies.forEach(item=>item.draw(this.ctx));

        }
        //私有方法 创建新的敌人
        #addNewEnemy(){
            const randomEnemy = this.enemyTypes[Math.floor(Math.random()*this.enemyTypes.length)]
            if(randomEnemy ==='worm'){
                this.enemies.push(new Worm(this));
            }else if(randomEnemy === 'ghost'){
                this.enemies.push(new Ghost(this));
            }else if(randomEnemy === 'spider'){
                this.enemies.push(new Spider(this));
            }

            // this.enemies.sort(function (a,b){
            //     return a.y- b.y
            // })
        }
    }

// 敌人类
    class Enemy{
        constructor(game) {
            this.game = game;

            //增加删除标记
            this.markedForDeletion = false;
            //帧动画
            this.frameX;
            this.maxFrame = 5;
            this.frameInterval = 100;
            this.frameTimer = 0;

        }
        update(deltaTime){
            this.x-=this.vx *deltaTime;
            if(this.x<0-this.width){
                this.markedForDeletion = true;
            }
            if(this.frameTimer>this.frameInterval){
                if(this.frameX<this.maxFrame){
                    this.frameX++;
                }else{
                    this.frameX =0;
                }
                this.frameTimer =0;
            }else{
                this.frameTimer+= deltaTime;
            }
        }
        draw(ctx){
            //绘制图片
            ctx.drawImage(this.image,this.frameX*this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height)
        }
    }


    //蠕虫怪类继承怪物类 会继承父类的变量和方法
    class Worm extends Enemy{
        constructor(game) {
            super(game);
            //精灵图每帧的宽度和高度
            this.spriteWidth = 229;
            this.spriteHeight = 171;
            //元素的宽高
            this.width=this.spriteWidth/2;
            this.height=this.spriteHeight/2;
            this.x=this.game.width;
            // 让蠕虫只会在地上爬
            this.y= this.game.height - this.height;

            this.image = worm;
            this.vx = Math.random()*0.1+0.1;
            console.log(this.image)
        }
    }


    //鬼魂怪类
    class Ghost extends Enemy{
        constructor(game) {
            super(game);
            //精灵图每帧的宽度和高度
            this.spriteWidth = 261;
            this.spriteHeight = 209;
            //元素的宽高
            this.width=this.spriteWidth/2;
            this.height=this.spriteHeight/2;
            this.x=this.game.width;
            //让鬼魂只会在天上飞
            this.y=Math.random() * this.game.height * 0.6;

            this.image = ghost;
            this.vx = Math.random()*0.2+0.1;
           this.angle = 0;
           //随机曲线
            this.curve = Math.random() *3
        }
        update(deltaTime){

            super.update(deltaTime);
            this.y+=Math.sin(this.angle) *this.curve;
            this.angle+=0.05;
        }
        draw(){
            ctx.save();
            // 这里只对这个方法内绘制的元素生效 因为调用了 save 和restore方法
            ctx.globalAlpha = 0.5;
            super.draw(ctx);
            ctx.restore();
        }
    }
  //蜘蛛类
    class Spider extends Enemy{
        constructor(game) {
            super(game);
            //精灵图每帧的宽度和高度
            this.spriteWidth = 310;
            this.spriteHeight = 175;
            //元素的宽高
            this.width=this.spriteWidth/2;
            this.height=this.spriteHeight/2;
            this.x=Math.random() * this.game.width;
            // 让蜘蛛只会上下移动
            this.y= 0 - this.height;

            this.image = spider;
            this.vx = 0;
            // 随机蜘蛛下落的速度
            this.vy =Math.random()*0.1+0.1;
            //蜘蛛下降的高度随机数
            this.maxLength  = Math.random()* this.game.height;
            console.log(this.image)
        }
        update(deltaTime){
            super.update(deltaTime);
            if(this.y<0-this.height*2){
                this.markedForDeletion = true;
            }
            this.y+=this.vy * deltaTime;
            //超过高度就回到顶部
            if(this.y>this.maxLength){
                this.vy *= -1;
            }
        }
        draw(ctx){
            ctx.beginPath();
            ctx.moveTo(this.x+this.width/2,0);
            ctx.lineTo(this.x+this.width/2,this.y+10);
            ctx.stroke();
            super.draw(ctx);
        }
    }
    //实例化游戏
    const game = new Game(ctx,canvas.width,canvas.height);


// 循环移动动画 timeStamp是js传过来的 可以通过这个参数计算设备支持的帧率 性能越低的设备deltaTime越长 反之越短，可以通过deltaTime让不同设备的表现相同
    let lastTime=1;
    function animate(timeStamp){
        //在绘制新帧之前清空整个画布，以创建动画效果
        ctx.clearRect(0,0,canvas.width,canvas.height);
        // 计算两帧之间的差
        const deltaTime =  timeStamp - lastTime;
        lastTime = timeStamp;


        game.update(deltaTime);
        game.draw();
        // console.log(deltaTime)
        requestAnimationFrame(animate);
    }
    //这里传个0 是因为第一次调用的时候没有timeStamp这个参数
    animate(0);


    // const enemy1 = new Ghost();
    // enemy1.update();

})