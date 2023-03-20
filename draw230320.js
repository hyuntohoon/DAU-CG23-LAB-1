let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let xValue = 0;
let yValue = 0;

//Make data
let linePts = [];
linePts.push(new THREE.Vector2(50, 50));
linePts.push(new THREE.Vector2(150, 200));
let lineP0 = [];
lineP0.push(linePts[0]);
lineP0.push(linePts[1]);
linePts.push(new THREE.Vector2(50, 250));
linePts.push(new THREE.Vector2(350, 250));
let lineP1 = [];
lineP1.push(linePts[2]);
lineP1.push(linePts[3]);
linePts.push(new THREE.Vector2(50, 50));
linePts.push(new THREE.Vector2(150, 200));

let boxPtsStart = [];

boxPtsStart.push(new THREE.Vector2(100, 100)); //
boxPtsStart.push(new THREE.Vector2(300, 300));

function draw_line(p0, p1) {
  ctx.beginPath();
  ctx.moveTo(p0.x, p0.y);
  ctx.lineTo(p1.x, p1.y);
  ctx.stroke();
}

function draw_point(p) {
  ctx.fillStyle = "#ff0000";
  ctx.beginPath();
  ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
  ctx.fill();
}
/*
4가지의 객체가 서로에 대한 접점을 찾는 경우
직선 1
  직선1과 한 직사각형의 각 변의 접점
  직선1과 원의 호와의 접점
  직선1과 직선 1의 접점
직사각형
  직사각형의 각 변과 직선2의 접점
  직사각형의 각 변과 원의 호와의 접점
직선2
  직선2와 원의 호와의 접점

그렇다면 해야하는 일
각 직선을 직선 방정식화
x절편, y절편 이용

직사각형의 각 변을 직선 방정식화


*/
function draw_box(minPt, maxPt) {
  // 박스에 대한 점의 값은 min.x, max.x, min.y, max.y로 구성
  let p0 = new THREE.Vector2(minPt.x, minPt.y);
  let p1 = new THREE.Vector2(minPt.x, maxPt.y);
  let p2 = new THREE.Vector2(maxPt.x, maxPt.y);
  let p3 = new THREE.Vector2(maxPt.x, minPt.y);
  draw_line(p0, p1);
  draw_line(p1, p2);
  draw_line(p2, p3);
  draw_line(p3, p0);
}

function draw_circle(ctr, radius) {
  ctx.beginPath();
  ctx.arc(ctr.x, ctr.y, radius, 0, 2 * Math.PI); //
  ctx.stroke();
}

function draw_image() {
  ctx.strokeStyle = "blue";
  draw_line(linePts[0], linePts[1]);
  ctx.strokeStyle = "red";
  draw_line(linePts[2], linePts[3]);
  ctx.strokeStyle = "green";
  draw_box(boxPtsStart[0], boxPtsStart[1]);
  ctx.strokeStyle = "black";
  draw_circle(new THREE.Vector2(230 + xValue, 230 + yValue), 110);
}

function line_line_intersection(p0, p1, p2, p3) {
  // y=ax+b : 직선의 방정식
  // a:기울기 : y증가량 / x증가량
  // y=a0x+b0  y=a1x+b1

  // 각 증가량이 0이 하나라도 있으면 안 됨.
  let a0 = (p1.y - p0.y) / (p1.x - p0.x);
  let b0 = p0.y - a0 * p0.x;

  let a1 = (p3.y - p2.y) / (p3.x - p2.x);
  let b1 = p2.y - a1 * p2.x;
  console.log("now");
  console.log(a0, b0, a1, b1);
  //직선의 교점? a0x+b0=a1x+b1 --> (a0-a1)x = b1 -b0
  let intersectionX = (b1 - b0) / (a0 - a1);
  let intersectionY = a0 * intersectionX + b0;

  if (p0.x > intersectionX || p1.x < intersectionX) return;
  if (p2.x > intersectionX || p3.x < intersectionX) return;
  if (p0.y > intersectionY || p1.y < intersectionY) return;
  if (p2.y > intersectionY || p3.y < intersectionY) return;

  let intersectionPt = new THREE.Vector2(intersectionX, intersectionY);
  draw_point(intersectionPt);
}

function line_box_intersection(lineP0, lineP1, boxMinPt, boxMaxPt) {
  //Need to write...
  let boxPts = [];
  boxPts.push(new THREE.Vector2(boxMinPt.x, boxMinPt.y));
  boxPts.push(new THREE.Vector2(boxMaxPt.x, boxMinPt.y));
  //boxminpt.x, boxminpt.y, boxmaxpt.x boxminpt.y
  line_line_intersection(lineP0[0], lineP0[1], boxPts[0], boxPts[1]);
  line_line_intersection(lineP1[0], lineP1[1], boxPts[0], boxPts[1]);
  boxPts.push(new THREE.Vector2(boxMinPt.x, boxMinPt.y));
  boxPts.push(new THREE.Vector2(boxMinPt.x, boxMaxPt.y));
  // boxminpt.x, boxminpt.y boxminpt.x boxmaxpt.y
  line_line_intersection(lineP0[0], lineP0[1], boxPts[2], boxPts[3]);
  line_line_intersection(lineP1[0], lineP1[1], boxPts[2], boxPts[3]);
  boxPts.push(new THREE.Vector2(boxMaxPt.x, boxMinPt.y));
  boxPts.push(new THREE.Vector2(boxMaxPt.x, boxMaxPt.y));
  // boxmaxpt.x boxminpt.y boxmaxptx, boxmaxpty
  line_line_intersection(lineP0[0], lineP0[1], boxPts[4], boxPts[5]);
  line_line_intersection(lineP1[0], lineP1[1], boxPts[4], boxPts[5]);
  boxPts.push(new THREE.Vector2(boxMinPt.x, boxMaxPt.y));
  boxPts.push(new THREE.Vector2(boxMaxPt.x, boxMaxPt.y));
  // boxminpt.x boxmaxpty,  boxmaxptx, boxmaxpty
  line_line_intersection(lineP0[0], lineP0[1], boxPts[6], boxPts[7]);
  line_line_intersection(lineP1[0], lineP1[1], boxPts[6], boxPts[7]);
  console.log(lineP0, boxPts, lineP1);
}

function line_circle_intersection(lineP0, lineP1, circleCtr, circleRadius) {
  //Need to write...
}

function box_circle_intersection(boxMinPt, boxMaxPt, circleCtr, circleRadius) {
  //Need to write...
}

//Keyboard Input
function keyDown(e) {
  if (e.key === "ArrowRight" || e.key === "Right") {
    xValue += 5;
  } else if (e.key === "ArrowLeft" || e.key === "Left") {
    xValue -= 5;
  } else if (e.key === "ArrowUp" || e.key === "Up") {
    yValue -= 5;
  } else if (e.key === "ArrowDown" || e.key === "Down") {
    yValue += 5;
  }
}

//Animation Callback
function clear() {
  ctx.clearRect(0, 0, c.width, c.height);
}
function update() {
  clear();
  draw_image();
  requestAnimationFrame(update);
}
update();
document.addEventListener("keydown", keyDown);

line_box_intersection(lineP0, lineP1, boxPtsStart[0], boxPtsStart[1]);
