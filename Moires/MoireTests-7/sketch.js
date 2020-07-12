let t = 0;

function setup () {
  createCanvas(600,600)
  ellipseMode(CENTER)
	angleMode(DEGREES)
  stroke(0)
	strokeWeight(4)
  noFill()
}

function draw() {
	background(255)
  translate(width/2, height/2)
	dessin(400, 400, 3)
	rotate(t)
  stroke(0);
	translate(0, 60)
	dessin(250, 350, 3)
	t+=0.04
}


function gui(){
	s1 = createSlider(5, 50, 5)
	s1.position(250, height + 40)
	s1.style('width', '100px')
	t1 = createP("")
	t1.position(275, height+5)
	t1.html("Écartement : " + s1.value())
	
	s2 = createSlider(0.5, 15, 0.5, 0.5)
	s2.position(450, height + 40)
	s2.style('width', '100px')
	t2 = createP("")
	t2.position(475, height+5)
	t2.html("Épaisseur : " + s2.value())
}

function dessin(r1, r2, e){
	for(let i = 0; i < 360; i+=e){
		line(0, 0, r1*cos(i), r2*sin(i))
	}
}
