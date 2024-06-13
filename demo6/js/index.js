/** @type {HTMLCanvasElement} 加这行注释会让后面的代码有canvas的代码提示 */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

//渡鸦
let ravens = [];
class Raven{
    constructor() {
        this.width=100;
        this.height = 50;
        this.x = canvas.width;
        this.y = Math.random() *(canvas.height-this.height);
        this.directionX = Math.random()*5+3;
        this.directionY = Math.random()*5 - 2.5;

    }
    update(){
        this.x -= this.directionX;
    }
    draw(){
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}





//爆炸
const explosions = [];

//获得画布相对于浏览器的偏移量
let canvasPosition = canvas.getBoundingClientRect();



class Explosion{
    constructor(x,y) {

        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        this.x=x;
        this.y=y;
        this.img = new Image();
        this.img.src ='./img/boom.png';
        this.frame=0;
        this.timer=0;
        // 随机生成旋转角度
        this.angle = Math.random()*6.2;
        // 加入声音
        this.sound =  new Audio();
        this.sound.src='./sound/shotgun.wav'
    }
    update(){
        if(this.frame===0){
            this.sound.play();
        }
        this.timer++;
        if(this.timer%8===0){
            this.frame++;
        }

    }
    draw(){
        ctx.save();
        // 设置围绕哪个点旋转
        ctx.translate(this.x,this.y);
        //设置旋转的角度
        ctx.rotate(this.angle);
        ctx.drawImage(this.img,this.spriteWidth*this.frame,0,this.spriteWidth,this.spriteHeight,0-this.width/2,0-this.height/2,this.width,this.height);
        ctx.restore();
    }
}

window.addEventListener('click',e=>{
    // console.log(e,ctx)
    // ctx.fillStyle = 'white';
    // //减去的数值是物体宽高的一半 保证物体中心出现在鼠标点击的位置
    // ctx.fillRect(e.x-canvasPosition.left-25,e.y-canvasPosition.top-25,50,50);

    createAnimation(e);
})

// window.addEventListener('mousemove',e=>{
//     // console.log(e,ctx)
//     // ctx.fillStyle = 'white';
//     // //减去的数值是物体宽高的一半 保证物体中心出现在鼠标点击的位置
//     // ctx.fillRect(e.x-canvasPosition.left-25,e.y-canvasPosition.top-25,50,50);
//
//     createAnimation(e);
// })

function createAnimation(e){
    let positionX = e.x-canvasPosition.left;
    let positionY = e.y-canvasPosition.top;
    explosions.push(new Explosion(positionX,positionY));
}

const raven = new Raven();


function animate(timestamp){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    raven.update();
    raven.draw();
    // for (let i = 0; i < explosions.length; i++) {
    //     explosions[i].update();
    //     explosions[i].draw();
    //     //判断动画如果已经播放完就从数组中删除
    //     if(explosions[i].frame>5){
    //         explosions.splice(i,1);
    //         i--;
    //     }
    // }
    requestAnimationFrame(animate);
};
animate();