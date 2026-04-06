
let vt323 = new FontFace(
  "VT323",
  "url(VT323-Regular.ttf)"
);

function resize(canvas,ctx) {
  var dpr = window.devicePixelRatio || 1;

  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = canvas.offsetHeight * dpr;

  ctx.scale(dpr, dpr);
}

dna = ["A", "C", "T", "G"];
colors_dark = ["#690000", "#000769", "#676900", "#690000"];
colors = ["red", "#989bff", "#f6ff00", "#00ff0d"];
colors_light = ["#ff9292", "rgb(163, 167, 255)", "#fbff94", "#a4ffa9"];

function draw(canvas,ctx) {

  characterSize = 54;
  ctx.textBaseline = "top";
  ctx.font = characterSize.toString() + "px VT323";

  paddingHorizontal = 0;
  paddingVertical = (ctx.measureText('A').actualBoundingBoxAscent + ctx.measureText('A').actualBoundingBoxDescent)/5;
  
  characterWidth = ctx.measureText('A').width + paddingHorizontal;
  characterHeight = ctx.measureText('A').actualBoundingBoxAscent + ctx.measureText('A').actualBoundingBoxDescent + paddingVertical;

  numCols = Math.floor(canvas.offsetWidth / characterWidth);
  numRows = Math.floor(canvas.offsetHeight / characterHeight);

  cellWidth = canvas.offsetWidth / numCols;
  cellHeight = canvas.offsetHeight / numRows;

  // subtract the cell width from the character width and divide by 2 to get the offset for centering the text
  offsetX = (cellWidth - characterWidth)/2;
  offsetY = (cellHeight - (ctx.measureText('A').actualBoundingBoxAscent + ctx.measureText('A').actualBoundingBoxDescent))/2;
  
  // render the letters
  for (let m = 0; m < numCols; m++) {
    for (let n = 0; n < numRows; n++) {
      r = Math.floor(Math.random() * 4);
      ctx.shadowColor = colors[r];
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowBlur = 5;
      ctx.fillStyle = colors[r];
      ctx.fillText(dna[r],offsetX+m*(canvas.offsetWidth/numCols),offsetY+n*(canvas.offsetHeight/numRows)+ctx.measureText('A').actualBoundingBoxAscent);
    }
  }
  
  // scanline effect
  ctx.shadowBlur = 0;
  ctx.fillStyle = "black";
  for (let n = 0; n < canvas.offsetHeight; n++) {
    if (n % 3 == 0) {
        ctx.fillRect(0,n,canvas.offsetWidth,1)
    }
  }
}

const canvas_1 = document.getElementById("leftcanvas");
const ctx_1 = canvas_1.getContext("2d");

const canvas_2 = document.getElementById("rightcanvas");
const ctx_2 = canvas_2.getContext("2d");

vt323.load().then((font) => {
  document.fonts.add(font);
  console.log("Font loaded");
  
  resize(canvas_1, ctx_1);
  resize(canvas_2, ctx_2);

  ctx_1.fillStyle = "black";
  ctx_1.fillRect(0, 0, canvas_1.width, canvas_1.height);
  
  ctx_2.fillStyle = "black";
  ctx_2.fillRect(0, 0, canvas_2.width, canvas_2.height);
  
  draw(canvas_1, ctx_1);
  draw(canvas_2, ctx_2);
});
