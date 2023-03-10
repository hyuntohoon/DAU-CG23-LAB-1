let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

//Make data
let pts = [];
pts.push(new THREE.Vector2(0, 0));
pts.push(new THREE.Vector2(250, 250));
pts.push(new THREE.Vector2(0, 100));
pts.push(new THREE.Vector2(300, 200));

//Draw Line
for (let i = 0; i < pts.length; i += 2) {
    draw_line(pts[i],pts[i+1]);
}

function draw_line(p0,p1)
{
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.stroke();
}

function draw_point(p)
{
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI, true);
    ctx.fill();
}

function line_line_intersection(p0, p1, p2, p3) {
    console.log(p0);
    console.log(p1);
    console.log(p2);
    console.log(p3);

    //Need to write...

    let intersectionX=400;
    let intersectionY=400;

    let intersectionPt = new THREE.Vector2(intersectionX, intersectionY);
    draw_point(intersectionPt);
}

line_line_intersection(pts[0],pts[1],pts[2],pts[3]);