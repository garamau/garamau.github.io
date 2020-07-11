let r1 = 80, r2 = 50, t = 0, s = 0.3;

function setup(){
	createCanvas(800, 800)
	angleMode(DEGREES)
	colorMode(HSB, 360)
	noStroke()
}

function draw(){
	background(255);
	translate(width/2, height/2)
	rotate(2*t)
	fill(t%360, 360, 360)
	ellipse(0, 0, 2.5*r1)
	fill(0);
 	motif2(10)
	t+= 0.5
	s+= 0.2
}

function forme(r1, r2){//rayon1, rayon2
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
		forme2(r1, r2)
	}
	pop()
}

function forme2(r1, r2){
	push()
		forme(r1, r2)
		scale(-1, -1)
		translate(-2*(r1+r2), 0)
		forme(r1, r2)
	pop()
}

function motif2(n){
	let a = 360/n
	push()
	for(let i = 0; i < n/2; i++){
		rotate(a)
		forme2(r1, r2)
	}
	pop()
}

