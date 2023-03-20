let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

//Make data
let pts = [];
pts.push(new THREE.Vector2(0, 0));
pts.push(new THREE.Vector2(250, 250));
pts.push(new THREE.Vector2(0, 100));
pts.push(new THREE.Vector2(300, 200));

console.log(pts);
//Draw Line
for (let i = 0; i < pts.length; i += 2) {
  draw_line(pts[i], pts[i + 1]);
}

function draw_line(p0, p1) {
  ctx.beginPath(); // 시작
  ctx.moveTo(p0.x, p0.y); // 종이에 점 이동(시작점 이동)
  ctx.lineTo(p1.x, p1.y); // 종이에 대면서 이동(그리기)
  ctx.stroke(); // 종료 (선분은 stroke, fill이 아님.)
}

function draw_point(p) {
  ctx.fillStyle = "#fed163";
  ctx.beginPath();
  ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI, true); // 2파이 => 원, true는 시계방향, 반시계방향
  ctx.fill();
}

function line_line_intersection(p0, p1, p2, p3) {
  console.log(p0);
  console.log(p1);
  console.log(p2);
  console.log(p3);

  //Need to write...

  //첫번째 선분의 식 => (0,0), (250, 250)을 가진 y = ax + b
  //   p0.y = p0.x * a + b;
  //   b = p0.y - p0.x;
  //   p1.y = p1.x * a + b;
  //   b = p1.y - p1.x;

  let a = (p1.y - p0.y) / (p1.x - p0.x);
  let b = p0.y - a * p0.x;

  let c = (p3.y - p2.y) / (p3.x - p2.x);
  let d = p2.y - a * p2.x;

  let intersectionX = -b + d / (a - c);
  let intersectionY = a * intersectionX + b;

  let intersectionPt = new THREE.Vector2(intersectionX, intersectionY);
  draw_point(intersectionPt);
}

line_line_intersection(pts[0], pts[1], pts[2], pts[3]);
