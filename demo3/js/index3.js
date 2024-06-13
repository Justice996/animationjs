/** @type {HTMLCanvasElement} 加这行注释会让后面的代码有canvas的代码提示 */
const canvas1 = document.getElementById('canvas1');
const ctx = canvas1.getContext('2d');

const CANVAS_WIDTH = canvas1.width =500;
const CANVAS_HEIGHT = canvas1.height = 1000;

//敌人数量
const numberOfEnemies =200;
//储存敌人的对象数组
const enemiesArray = [];

// enemy1 = {
//     x:0,
//     y:0,
//     width:200,
//     height:200
// }


//用于控制帧数
let gameFrame = 0;
//随机生成

// 敌人类

class Enemy{
    constructor() {
        //图片
        this.img = new Image();
        this.img.src='./img/enemy3.png';


        // 生成 1到5之间的随机数
        this.speed = Math.random()*4+1;

        //精灵图逐帧动画 宽度 高度
        this.spriteWidth = 218;
        this.spriteHeight =177;

        //根据精灵图比例设置每个生成的块的宽高
        this.width=this.spriteWidth/2.5;
        this.height=this.spriteHeight/2.5;

        //随机生成敌人出现的位置 保证生成在画布里面
        this.x =Math.random() * ( canvas1.width-this.width);
        this.y=Math.random() * (canvas1.height-this.height);

        //显示第几张精灵图
        this.frame = 0;
        // 这个参数用于随机生成每个块的帧率
        this.flapSpeed = Math.floor(Math.random()*3+1);
        // 随机生成角度 和角度变变化的幅度
        this.angle=0;
        this.angleSpeed=Math.random()* 2+0.5;
        //这个变量用于控制波形的大小 数越大 怪物上下波动的幅度就越大
        // this.curve = Math.random()*200+50;
    }
    update(){
        // 这段奇怪的代码难以理解 用来控制怪物的运动轨迹 下面两行 改变 Math.PI/90 中的90会改变运动轨迹 交换cos sin也会变
        this.x= canvas1.width/2 * Math.sin(this.angle * Math.PI/90)+(canvas1.width/2 - this.width/2);
        this.y= canvas1.height/2 * Math.cos(this.angle * Math.PI/450)+(canvas1.height/2 - this.height/2);


        this.angle+=this.angleSpeed
        //判断如果飞出了屏幕 就在回来 实现无限循环向左飞
        if(this.x+this.width<0){
            this.x=canvas1.width;
        }
        // 这个判断用于控制帧率啊
        if(gameFrame % this.flapSpeed === 0){
            //让精灵图动起来
            this.frame>4?this.frame=0:this.frame++;
        }
    }
    draw(){
        ctx.drawImage(this.img,this.frame*this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height);

        // var pat=ctx.createPattern(backgroundLayer1,'no-repeat');
        // ctx.rect(0,0,100,100);
        // ctx.fillStyle=pat;
        // ctx.fill();

    }
}
// 生成敌人的数组
for (let i = 0; i < numberOfEnemies; i++) {
    enemiesArray.push(new Enemy());
}
function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    enemiesArray.forEach(enemy=>{
        enemy.update();
        enemy.draw();
    })
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();
