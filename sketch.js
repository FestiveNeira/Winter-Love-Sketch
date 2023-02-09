// 'Sleeping On A Snowy Evening' by Aria Vanevenhoven

/*
----------------------------------------------------------------------------
Life is full of change. Everyone goes through it. Change is how we learn and grow, how we become better and happier. Despite everything changing around you, some things never change. I may not be the son you thought you had. My face and my name may be different than the ones you knew, but I will always be the same person you've always loved. I will never stop being your child, and I will never stop loving you with all my heart.

      Your Daughter, Aria
----------------------------------------------------------------------------
*/

// set constants
const branches = 3;
const spread = 90;
const chitopar = 2 / 5;
const treesize = 50;

// number of treetop iterations and number of root iterations
var iter = 5;
var rootiter = 3;
// create leaf array
var leaves = [];

function preload() {
  img = loadImage("assets/fox.png");
  font = loadFont('assets/geraldine.ttf');
}

function setup() {
  // set angle mode and create canvas
  createCanvas(800, 1120);
  angleMode(DEGREES);
  // draw sky and ground
  background(60, 60, 140);
  // moon
  stroke(255);
  fill(250, 220, 170);
  circle(670, 200, 150);
  // crescent
  stroke(60, 60, 140);
  fill(60, 60, 140);
  circle(645, 190, 100);

  stroke(240, 240, 250);
  fill(240, 240, 250);
  rect(0, 700, 800, 420);
  // back flowers
  var rr, rg, rb;
  var rx, ry, rs;
  for (var h = 0; h < 120; h++) {
    rr = random(150, 200);
    rg = random(80, 120);
    rb = random(150, 200);
    stroke(rr, rg, rb);
    fill(rr, rg, rb);
    rx = random(0, 800);
    ry = random(705, 850);
    rs = random(0.5, 1);
    flower(rx, ry, rs);
  }
  // translate to tree base as 0,0
  push();
  translate(width / 2, (height * 2) / 3);
  noFill();
  // draw trunk
  strokeWeight(treesize * 1.2);
  stroke(80, 20, 20);
  line(0, -20, 0, 70);
  line(-10, -20, -25, 85);
  line(10, -20, 25, 85);
  // variables for trunk size
  var cthick = 25;
  var tthick = 55;
  var bthick = 60;
  var hu = -60;
  var hd = 90;
  var cent = 0;
  strokeWeight(treesize / 2);
  // trunk curve
  bezier(-tthick, hu, -cthick, cent, -cthick - 5, cent + 40, -bthick, hd);
  bezier(tthick, hu, cthick, cent, cthick + 5, cent + 40, bthick, hd);
  // between branches
  bezier(-tthick, hu, -20, -55, -15, -55, 0, -90);
  bezier(tthick, hu, 20, -55, 15, -55, 0, -90);
  // draw roots
  push();
  // scale roots
  scale(1.6, 0.6);
  // translate down
  translate(0, 120);
  // build the root array
  leaves[leaves.length] = new leaf(-treesize * 3, 0, 0, 0, null);
  for (var m = 0; m < iter; m++) {
    buildtree(m);
  }
  // draw the root array
  for (var n = 0; n <= rootiter; n++) {
    for (var t = 0; t < leaves.length; t++) {
      leaves[t].draw(n);
    }
  }
  pop();
  // reset array
  leaves = [];
  // scale treetop
  scale(1, 1.1);
  // build treetop array
  leaves[leaves.length] = new leaf(treesize * 5, 0, 0, 0, null);
  for (var u = 0; u < iter; u++) {
    buildtree(u);
  }
  // draw treetop
  drawfore(5, 5);
  drawfore(0, 2);
  drawback(3, 4);
  pop();
  // front flowers
  for (var g = 0; g < 160; g++) {
    rr = random(150, 200);
    rg = random(80, 120);
    rb = random(150, 200);
    stroke(rr, rg, rb);
    fill(rr, rg, rb);
    rx = random(0, 800);
    ry = random(850, 1120);
    rs = random(0.5, 1);
    flower(rx, ry, rs);
  }
  // ground snow
  stroke(255);
  fill(255);
  var sx, sy, ss;
  for (var d = 0; d < 600; d++) {
    // ground left    
    sx = random(0, 325);
    sy = random(700, 1120);
    ss = random(0.5, 5);
    circle(sx, sy, ss);
    // ground right
    sx = random(475, 800);
    sy = random(700, 1120);
    ss = random(0.5, 5);
    circle(sx, sy, ss);
    // ground center
    sx = random(150, 650);
    sy = random(820, 1120);
    ss = random(0.5, 5);
    circle(sx, sy, ss);
  }
  // fox
  img.resize(img.width /6 , img.height / 7);
  tint(220);
  image(img, 150, 910);
  // sky snow
  for (var c = 0; c < 1200; c++) {
    sx = random(0, 800);
    sy = random(0, 820);
    ss = random(0.5, 5);
    circle(sx, sy, ss);
  }
  push();
  rotate(-10);
  stroke(40);
  fill(255,140,30);
  textAlign(CENTER);
  textSize(70);
  textWrap(WORD);
  textFont(font);
  text("The seasons change and yet I sleep all the same", -20, 220, 570);
  pop();
}

class leaf {
  // create a leaf
  constructor(size, pos, rot, depth, par) {
    // size determines branch thickness and color
    this.size = size;
    this.pos = pos;
    this.rot = rot;
    this.depth = depth;
    this.parent = par;
  }
  // if depth is less than the number of iterations create 9 more leaves 1 depth deeper (iterate again)
  build() {
    if (this.depth < iter) {
      for (var i = 0; i < 3; i++) {
        for (var o = 0; o < 3; o++) {
          leaves[leaves.length] = new leaf(
            this.size * chitopar,
            (this.size * (i + 1)) / 3,
            -spread / (branches - 1) + (o * spread) / (branches - 1),
            this.depth + 1,
            this
          );
        }
      }
    }
  }
  // if the leaf is of the selected depth, draw it
  draw(depth) {
    if (this.depth == depth) {
      push();
      var moveset = this.move();
      for (var i = 0; i < moveset.length; i++) {
        rotate(moveset[i][1]);
        translate(0, moveset[i][0]);
      }
      for (var o = 0; o < branches; o++) {
        push();
        rotate(-(spread / (branches - 1)) + (spread * o) / (branches - 1));

        var col;

        if (this.size < 0) {
          strokeWeight(-this.size / 5);
          col = color(80, 20, 20);
        } else {
          strokeWeight(this.size / 10);
          col = color(
            map(255 / (this.size / 60), 0, 255, 80, 200),
            map(65 / (this.size / 60), 0, 255, 20, 200),
            map(75 / (this.size / 60), 0, 255, 20, 200)
          );
          stroke(col);
        }
        stroke(col);

        line(0, 0, 0, -this.size);
        pop();
      }
      pop();
    }
  }
  // get an array of rotations and translations that correspond to this leaf's final position and rotation
  move() {
    if (this.parent != null) {
      var temp = this.parent.move();
      temp[temp.length] = [-this.pos, this.rot];
      return temp;
    } else {
      return [];
    }
  }
}

// for each leaf at depth level of 'depth' create 9 children with a depth of one deeper (create a new level of leaves)
function buildtree(depth) {
  if (depth < iter) {
    var len = leaves.length;
    for (var i = 0; i < len; i++) {
      if (leaves[i].depth == depth) {
        leaves[i].build();
      }
    }
  }
}

// draw depths from most deep to least deep (small stuff in the back, big stuff up front) [from y ---> x]
function drawback(x, y) {
  for (var o = y; o >= x; o--) {
    for (var i = 0; i < leaves.length; i++) {
      leaves[i].draw(o);
    }
  }
}

// draw depths from least deep to most deep (big stuff in the back, small stuff up front) [from x ---> y]
function drawfore(x, y) {
  for (var o = x; o <= y; o++) {
    for (var i = 0; i < leaves.length; i++) {
      leaves[i].draw(o);
    }
  }
}

function flower(x, y, s) {
  push();
  translate(x, y);
  scale(s, s*2/3);
  circle(5, 3, 10);
  circle(-5, 3, 10);
  circle(3, -3, 10);
  circle(-3, -3, 10);
  circle(0, 6, 10);
  pop();
}