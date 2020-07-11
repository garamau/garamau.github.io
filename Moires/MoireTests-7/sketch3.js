let t = 0;
let s1, s2, t1, t2, s3, s4, t3, t4;

function setup () {
  createCanvas(800,800)
  ellipseMode(CENTER)
	angleMode(DEGREES)
  stroke(0)
	strokeWeight(4)
  noFill()
	gui()
}

function draw() {
	background(255)
  translate(width/2, height/2)
	miseAJourGui()
	let a = s1.value(), b = s2.value()
	let a1 = s3.value(), b1 = s4.value()
	push()
	rotate(t)
  strokeWeight(b1)
	dessin(400, 400, a1)
	pop()
  strokeWeight(b)
	translate(0, 60)
	dessin(250, 350, a)
	t+=0.04
}


function gui(){
	s1 = createSlider(2, 10, 2, 0.1)
	s1.position(250, height + 40)
	t1 = createP("")
	t1.position(275, height+5)
	t1.html("Écartement1 : " + s1.value())
	
	s2 = createSlider(1, 5, 0.5, 0.5)
	s2.position(450, height + 40)
	t2 = createP("")
	t2.position(475, height+5)
	t2.html("Épaisseur1 : " + s2.value())
	
	s3 = createSlider(2, 10, 2, 0.1)
	s3.position(250, height + 85)
	t3 = createP("")
	t3.position(275, height+50)
	t3.html("Écartement2 : " + s1.value())
	
	s4 = createSlider(1, 5, 0.5, 0.5)
	s4.position(450, height + 85)
	t4 = createP("")
	t4.position(475, height+50)
	t4.html("Épaisseur2 : " + s2.value())
}

function miseAJourGui(){
	t1.html("Écartement1 : " + s1.value())
	t2.html("Épaisseur1 : " + s2.value())
	t3.html("Écartement2 : " + s3.value())
	t4.html("Épaisseur2 : " + s4.value())
}

function dessin(r1, r2, e){
	for(let i = 0; i < 360; i+=e){
		line(0, 0, r1*cos(i), r2*sin(i))
	}
}