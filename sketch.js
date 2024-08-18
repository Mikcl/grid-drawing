let N = 10;  // Number of columns
let M = 7;  // Number of rows
let cellSize = 100;  // Size of each cell
let dashLength = 5;  // Length of dashes

function setup() {
  createCanvas(N * cellSize, M * cellSize);
  noLoop();
}

function draw() {
  clear();
  noFill();

  // dashed red lines
  stroke(255, 0, 0);
  let offset = dashLength / 2;  // "meta" grid offset

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      let x = i * cellSize;
      let y = j * cellSize;

      // dashed diagonal lines, considering the meta grid
      drawDashedLine(x - offset, y - offset, x + cellSize + offset, y + cellSize + offset, dashLength);  // Top-left to bottom-right
      drawDashedLine(x + cellSize + offset, y - offset, x - offset, y + cellSize + offset, dashLength);  // Top-right to bottom-left
      
      // dashed horizontal and vertical lines within each cell, considering the meta grid
      drawDashedLine(x - offset, y + cellSize / 2, x + cellSize + offset, y + cellSize / 2, dashLength);  // Horizontal dashed line in the middle
      drawDashedLine(x + cellSize / 2, y - offset, x + cellSize / 2, y + cellSize + offset, dashLength);  // Vertical dashed line in the middle
    }
  }

  // Draw black grid lines on top, including outer edges
  stroke(0);  // Black color
  strokeWeight(2);
  for (let i = 0; i <= N; i++) {
    line(i * cellSize, 0, i * cellSize, M * cellSize);  // vertical lines
  }
  for (let j = 0; j <= M; j++) {
    line(0, j * cellSize, N * cellSize, j * cellSize);  // horizontal lines
  }

  // outer black border
  strokeWeight(3);  // thicker for emphasis
  line(0, 0, N * cellSize, 0);  // top border
  line(0, M * cellSize, N * cellSize, M * cellSize);  // bottom border
  line(0, 0, 0, M * cellSize);  // left border
  line(N * cellSize, 0, N * cellSize, M * cellSize);  // right border

  save("grid-drawing.png");
}

function drawDashedLine(x1, y1, x2, y2, dashLength) {
  let distance = dist(x1, y1, x2, y2);
  let dashCount = int(distance / dashLength);
  let xStep = (x2 - x1) / dashCount;
  let yStep = (y2 - y1) / dashCount;

  for (let i = 0; i < dashCount; i += 2) {
    let startX = x1 + i * xStep;
    let startY = y1 + i * yStep;
    let endX = startX + xStep;
    let endY = startY + yStep;
    line(startX, startY, endX, endY);
  }
}
