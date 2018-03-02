var CX, CY;

var R1, R2, R3;
var X1, X2, X3;
var Y1, Y2, Y3;
var A1, A2, A3;
var AINC1, AINC2, AINC3;

var traced_points;
var Z;

var OSC1, OSC2, OSC3;


function setup() {
   createCanvas(windowWidth, windowHeight);
   angleMode(DEGREES);
   CX = width / 2;
   CY = height / 2;
   R1 = 180;
   R2 = R1 / 2;
   R3 = R2 / 2;
   A1 = A2 = A3 = 0;
   AINC1 = random(-3, 3);
   AINC2 = random(-3, 3);
   AINC3 = random(-3, 3);
   traced_points = [];
   Z = 400;
}

function draw() {
   translate(CX, CY);
   background(255);
   calcPoints();
   renderPoints();
   renderLines();
   renderEllipses();
   increaseAngles();
}

function calcPoints() {
   X1 = cos(A1) * R1;
   Y1 = sin(A1) * R1;

   X2 = X1 + cos(A2) * R2;
   Y2 = Y1 + sin(A2) * R2;

   X3 = X2 + cos(A3) * R3;
   Y3 = Y2 + sin(A3) * R3;

   traced_points.push([X3, Y3, Z]);
}

function renderPoints() {
   stroke(0);
   strokeWeight(3);
   point(0, 0);
   point(X1, Y1);
   point(X2, Y2);
   for(var i = 0; i < traced_points.length; i++) {
      if(traced_points[i][2] > 0) {
         point(traced_points[i][0], traced_points[i][1]);
         traced_points[i][2]--;
      } else {
         traced_points.splice(i, 1);
      }
   }
}

function renderLines() {
   stroke(0, 70);
   strokeWeight(1);
   // radius
   line(0, 0, X1, Y1);
   line(X1, Y1, X2, Y2);
   line(X2, Y2, X3, Y3);
   // axes
   line(-CX, 0, CX, 0);
   line(0, -CY, 0, CY);
}

function renderEllipses() {
   noFill();
   stroke(0, 35);
   ellipse(0, 0, R1 * 2);
   ellipse(X1, Y1, R2 * 2);
   ellipse(X2, Y2, R3 * 2);
}

function increaseAngles() {
   A1 += AINC1;
   A2 += AINC2;
   A3 += AINC3;
}

function renderLabels() {
   noStroke();
   fill(0);
   // angles
   text("α " + A1 + "°", R1 + 20, 0);
   text("β " + A2 + "°", X1 + R2 + 20, Y1);
   text("γ " + A3 + "°", X2 + R3 + 20, Y2);
   // increments
   push();
   translate(-CX, -CY);
   text(AINC1, 10, 20);
   pop();
}
