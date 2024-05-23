const canvas = document.getElementById("canvas");
const bucket = document.getElementById("bucket");

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

var canvasSize = 2000;

var steps = 1;
var loops = 1;

var canvasPos = [Math.random()*canvasSize/2-canvasSize/4,Math.random()*canvasSize/2-canvasSize/4];
//var canvasPos = [0,0];
var canvasVel = [Math.random()*80-40,Math.random()*80-40];
var canvasWeight = Math.random()*100+50

var bucketPos = [Math.random()*canvasSize/2-canvasSize/4,Math.random()*canvasSize/2-canvasSize/4];
var oldBucketPos = bucketPos.slice();
oldBucketPos[0] -= canvasPos[0];
oldBucketPos[1] -= canvasPos[1];
var bucketVel = [Math.random()*80-40,Math.random()*80-40];
var bucketWeight = Math.random()*100+50

ctx.lineWidth = Math.random()*5+2;
let bgColor = [Math.random()*255,Math.random()*255,Math.random()*255];
let lineColor = [Math.random()*255,Math.random()*255,Math.random()*255];
let escapeLoop = false;
while(!escapeLoop)
{
    if(Math.abs(rgb2hsv(bgColor[0],bgColor[1],bgColor[2])[0]-rgb2hsv(lineColor[0],lineColor[1],lineColor[2])[0]) <= 250)
    {
        bgColor = [Math.random()*255,Math.random()*255,Math.random()*255];
        lineColor = [Math.random()*255,Math.random()*255,Math.random()*255];
    }
    else
    {
        escapeLoop = true;
    }
}

ctx.fillStyle = `rgb(${bgColor[0]},${bgColor[1]},${bgColor[2]})`;
ctx.strokeStyle = `rgb(${lineColor[0]},${lineColor[1]},${lineColor[2]})`;
ctx.fillRect(0,0,canvasSize,canvasSize);



requestAnimationFrame(draw);

function draw()
{
    for (let i = 0; i < loops; i++) {
        
        
        //ctx.clearRect(0,0,400,400)
        bucketPos[0] += bucketVel[0]/steps;
        bucketPos[1] += bucketVel[1]/steps;
        bucketVel[0] += (0 - bucketPos[0])/bucketWeight/steps;
        bucketVel[1] += (0 - bucketPos[1])/bucketWeight/steps;
        bucketVel[0] -= (bucketVel[0] * 0.0001)/steps;
        bucketVel[1] -= (bucketVel[1] * 0.0001)/steps;

        canvasPos[0]+=canvasVel[0]/steps;
        canvasPos[1]+=canvasVel[1]/steps;
        canvasVel[0] += (0 - canvasPos[0])/canvasWeight/steps;
        canvasVel[1] += (0 - canvasPos[1])/canvasWeight/steps;
        canvasVel[0] -= (canvasVel[0] * 0.0001)/steps;
        canvasVel[1] -= (canvasVel[1] * 0.0001)/steps;

        canvas.style.left = canvasPos[0] + canvasSize/2 +"px";
        canvas.style.top = canvasPos[1] + canvasSize/2 +"px";

        bucket.style.left = bucketPos[0] + canvasSize - 10 + "px";
        bucket.style.top = bucketPos[1] + canvasSize - 10 +"px";

        //ctx.fillRect(bucketPos[0]+400 - canvasPos[0],bucketPos[1]+400 - canvasPos[1],2,2);
        ctx.beginPath(); // Start a new path
        ctx.moveTo(oldBucketPos[0]+canvasSize/2, oldBucketPos[1]+canvasSize/2); // Move the pen to (30, 50)
        ctx.lineTo(bucketPos[0]+canvasSize/2- canvasPos[0], bucketPos[1]+canvasSize/2 - canvasPos[1]); // Draw a line to (150, 100)
        ctx.stroke(); // Render the path
        oldBucketPos = bucketPos.slice();
        oldBucketPos[0] -= canvasPos[0];
        oldBucketPos[1] -= canvasPos[1];

    }
    requestAnimationFrame(draw);
}

// input: r,g,b in [0,1], out: h in [0,360) and s,v in [0,1]
function rgb2hsv(r,g,b) {
    let v=Math.max(r,g,b), c=v-Math.min(r,g,b);
    let h= c && ((v==r) ? (g-b)/c : ((v==g) ? 2+(b-r)/c : 4+(r-g)/c)); 
    return [60*(h<0?h+6:h), v&&c/v, v];
  }