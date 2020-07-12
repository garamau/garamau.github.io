let r1 = 80, r2 = 50, t = 0;
let s, u;

function setup(){
	createCanvas(400, 400)
	angleMode(DEGREES)
	colorMode(HSB, 360)
	translate(width/2, height/2)
	noStroke()
	gui()
}

function draw(){
	background(255);
	r2 = s.value()
	u.html(r2)
	translate(width/2, height/2)
	rotate(t)
	fill(t%360, 360, 360)
	ellipse(0, 0, 3*r1-2)
	fill(0);
	motif(6)
	scale(1, -1)
	motif(6)
	t++
}

function forme(r1, r2){// centre, rayon1, rayon2, direction
	beginShape()
	vertex(0, 0)
	bezierVertex(0, r1, 2*r1, r1, 2*r1, 0)
	vertex(2*r2,0)
	bezierVertex(2*r2, r2, 0, r2, 0, 0)
	endShape()
}

function motif(n){
	let a = 360/n;
	push()
	for(let i = 0; i < n; i++){
		rotate(a)
		forme(r1, r2)
	}
	pop()
}

function gui(){
	s = createSlider(10, r1-20, 25, 1)
	s.position(width+30, 50)
	s.style('width', '100px')
	u = createP("")
	u.position(width+30, 70)
}

