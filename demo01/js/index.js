let playerStatus = '眩晕'
const dropDown = document.getElementById('animations');

dropDown.addEventListener('change',(e)=>{
 playerStatus=e.target.value;
})

const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH=canvas.width=600;
const CANVAS_HIGHT=canvas.height =600;

let x=0;
let y=0;

const spriteWidth = 575;
const spriteHeight = 523;



// 调节帧率
let gameFrame = 0;
const staggerFrames=5; //数值越小帧率越高

//保存每一行的动作
const spriteAnimations = [];
const animationStates = [
 {
  name:'空闲',
  frames:7
 },
 {
  name:'跳',
  frames: 7
 },
 {
  name:'落地',
  frames:9
 },
 {
  name:'跑',
  frames:9
 },
 {
  name:'眩晕',
  frames:11
 },
 {
  name:'坐',
  frames:5
 },
 {
  name:'滚',
  frames:7
 },
 {
  name:'咬死你',
  frames:7
 },
 {
  name:'死了',
  frames:12
 },
 {
  name:'被揍了',
  frames:4
 },
];
animationStates.forEach((state,index)=>{
 let frames = {
  loc: [],
 };
 for (let j = 0; j < state.frames; j++) {
     let positionX = j * spriteWidth;
     let positionY = index * spriteHeight;
     frames.loc.push({x:positionX,y:positionY});
 }
 spriteAnimations[state.name] = frames;
})
console.log(spriteAnimations);
// let x1=500;
// let y1=0;
//
// let x2=0;
// let y2=500;
//
// let x4=500;
// let y4=500;
const playerImage = new Image();
playerImage.src = './img/dogs.png'
function animate(){
 ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HIGHT);
 let position = Math.floor(gameFrame/staggerFrames)% spriteAnimations[playerStatus].loc.length;
 let frameX = spriteWidth *position;
 let frameY = spriteAnimations[playerStatus].loc[position].y;
ctx.drawImage(playerImage,frameX,frameY,spriteWidth,spriteHeight,0,0,spriteWidth,spriteHeight)
 if(gameFrame%staggerFrames===0){
  frameX<6?frameX++:frameX=0;
 }
 gameFrame++
 requestAnimationFrame(animate)
}
animate();


function animatePePe(){
 // 创建一个新的图像对象
 var img = new Image();
 var img1 = new Image();
 var img3 = new Image();
 var img4 = new Image();
 // 设置图像源
 img.src = './img/dog.png'; // 这里替换为你的图片路径
 img1.src = './img/pepe.jpg';
 img3.src = './img/zhou.png';
 img4.src='./img/zhou.png';
 img4.onload = function() {
  // 定义矩形的坐标和尺寸
  let width = 100;
  let height = 100;

  // 使用drawImage方法绘制图像到矩形中
  ctx.drawImage(img4, x4, y4, width, height);
  x4--;
  y4--;
 }
 img3.onload = function() {
  // 定义矩形的坐标和尺寸
  let width = 100;
  let height = 100;

  // 使用drawImage方法绘制图像到矩形中
  ctx.drawImage(img3, x2, y2, width, height);
  x2++;
  y2--;
 }
 img1.onload = function() {
  // 定义矩形的坐标和尺寸
  let width = 100;
  let height = 100;

  // 使用drawImage方法绘制图像到矩形中
  ctx.drawImage(img1, x1, y1, width, height);
  x1--;
  y1++;
 }
 // 确保图像加载完成后再进行绘制
 img.onload = function() {
  // 定义矩形的坐标和尺寸
  let width = 100;
  let height = 100;

  // 使用drawImage方法绘制图像到矩形中
  ctx.drawImage(img, x, y, width, height);
  x++;
  y++;

 }
 requestAnimationFrame(animatePePe)
}

// animatePePe()