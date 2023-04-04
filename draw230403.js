let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let boxData = [];
let circleData = [];
let triangleData = [];
let mouseX = 0,
  mouseY = 0;

boxData.push({ minPt: new THREE.Vector2(150, 150), maxPt: new THREE.Vector2(350, 350) });

circleData.push({ ctr: new THREE.Vector2(50, 50), radius: 10 });
circleData.push({ ctr: new THREE.Vector2(400, 100), radius: 50 });
circleData.push({ ctr: new THREE.Vector2(450, 450), radius: 30 });

triangleData.push({
  pt0: new THREE.Vector2(50, 300),
  pt1: new THREE.Vector2(100, 300),
  pt2: new THREE.Vector2(100, 350),
});

function draw_line(p0, p1) {
  // 라인 그리기 배열(2포인트)
  ctx.beginPath();
  ctx.moveTo(p0.x, p0.y);
  ctx.lineTo(p1.x, p1.y);
  ctx.stroke();
}
function getAngle(x, y, x1, y1, x2, y2) {
  const dx1 = x1 - x;
  const dy1 = y1 - y;
  const dx2 = x2 - x;
  const dy2 = y2 - y;

  const dotProduct = dx1 * dx2 + dy1 * dy2;
  const crossProduct = dx1 * dy2 - dx2 * dy1;

  const angle = Math.atan2(crossProduct, dotProduct);
  const degree = angle * (180 / Math.PI);

  return Math.abs(degree);
}
function draw_triangle(triData) {
  // 삼각현 그리기 배열 (3포인트)
  console.log("sasa" + triangleData.pt0.x);
  const a = getAngle(mouseX, mouseY, triData.pt0.x, triData.pt0.y, triData.pt1.x, triData.p1.y);
  const b = getAngle(mouseX, mouseY, triData.pt1.x, triData.pt1.y, triData.pt2.x, triData.p2.y);
  const c = getAngle(mouseX, mouseY, triData.pt2.x, triData.pt2.y, triData.pt0.x, triData.p0.y);

  const sum = a + b + c;
  if (sum >= 359.999 && sum <= 360.001) {
    console.log("hi");
  }
  draw_line(triData.pt0, triData.pt1);
  draw_line(triData.pt1, triData.pt2);
  draw_line(triData.pt2, triData.pt0);
}

function draw_box(boxData) {
  // 박스 그리기 배열(4점)

  let isFill = false;
  //Mouse Check
  if (
    boxData.minPt.x <= mouseX &&
    boxData.minPt.y <= mouseY &&
    boxData.maxPt.x >= mouseX &&
    boxData.maxPt.y >= mouseY
  ) {
    isFill = true;
  } else {
  }

  ctx.beginPath();
  ctx.rect(
    boxData.minPt.x,
    boxData.minPt.y,
    boxData.maxPt.x - boxData.minPt.x,
    boxData.maxPt.y - boxData.minPt.y
  );
  if (isFill) ctx.fill();
  else ctx.stroke();
}

function draw_circle(circleData) {
  // 원 그리기 배열(2점, 반지름) ctr: new THREE.Vector2(50, 50), radius: 10
  let isFill = false;
  //Mouse Check
  let dx = mouseX - circleData.ctr.x;
  let dy = mouseY - circleData.ctr.y;
  let d = Math.sqrt(dx * dx + dy * dy);
  console.log(d);
  console.log(circleData.radius);
  if (d <= circleData.radius) {
    isFill = true;
  }
  ctx.beginPath();
  ctx.arc(circleData.ctr.x, circleData.ctr.y, circleData.radius, 0, 2 * Math.PI);
  ctx.stroke();
  if (isFill) ctx.fill();
  else ctx.stroke();
}

function draw_image() {
  // 이미지 그리기
  for (let i = 0; i < boxData.length; i++) draw_box(boxData[i]);
  for (let i = 0; i < circleData.length; i++) draw_circle(circleData[i]);
  for (let i = 0; i < triangleData.length; i++) draw_triangle(triangleData[i]);
}
c.addEventListener(
  "mousemove",
  function (e) {
    var mousePos = getMousePos(c, e);
    console.log("mousemove : ", mousePos.x + "," + mousePos.y);
    mouseX = mousePos.x;
    mouseY = mousePos.y;
  },
  false
);

c.addEventListener(
  "click",
  function (e) {
    var mousePos = getMousePos(c, e);
    console.log("click : ", mousePos.x + "," + mousePos.y);
    boxData.push({
      minPt: new THREE.Vector2(mousePos.x - 10, mousePos.y - 10),
      maxPt: new THREE.Vector2(mousePos.x + 10, mousePos.y + 10),
    });
  },
  false
);

//Get Mouse Position
function getMousePos(c, e) {
  var rect = c.getBoundingClientRect();
  return {
    x: Math.round(e.clientX - rect.left),
    y: Math.round(e.clientY - rect.top),
  };
}

function clear() {
  ctx.clearRect(0, 0, c.width, c.height);
}
function update() {
  clear();
  draw_image();
  requestAnimationFrame(update);
}
update();
