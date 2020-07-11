let t = 0, s1, s2, s3, s4, s5, t1, t2, t3, t4, t5
let r1=400, r2=400, r3=200, r4=300

function setup () {
  createCanvas(800,800)
  ellipseMode(CENTER)
	angleMode(DEGREES)
  stroke(0)
  noFill()
	gui()
}

function draw() {
	background(255)
	miseAJourGui()
	let u = min(r1-r3, r2-r4)
	s5.attribute('max', u)
  translate(width/2, height/2)
	dessin(r1, r2, s1.value(), s2.value())
	rotate(t)
	translate(s5.value(), 0)
	dessin(r3, r4, s3.value(), s4.value())
	t+=0.08
}

function dessin(r1, r2, e, h){
	fill(0)
	noStroke()
	for(let i = 0; i < 360; i+=e){
		let v = createVector(r1*cos(i), r2*sin(i))
		forme1(v, h)
	}
}

function forme1(v, h){
	let w = createVector(v.y, -v.x)
	w.normalize()
	w.mult(h/2)
	triangle(0, 0, v.x+w.x, v.y+w.y, v.x-w.x, v.y-w.y)
}

function gui(){
	s1 = createSlider(2, 10, 2, 0.1)
	s1.position(250, height + 40)
	t1 = createP("")
	t1.position(275, height+5)
	t1.html("Écartement1 : " + s1.value())
	
	s2 = createSlider(1, 10, 0.5, 0.5)
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
	
	
	s5 = createSlider(0, 400, 100, 1)
	s5.position(250, height + 135)
	t5 = createP("")
	t5.position(250, height+100)
	t5.html("Écart des centres : " + s5.value())
}

function miseAJourGui(){
	t1.html("Écartement1 : " + s1.value())
	t2.html("Épaisseur1 : " + s2.value())
	t3.html("Écartement2 : " + s3.value())
	t4.html("Épaisseur2 : " + s4.value())
	t5.html("Écart des centres : " + s5.value())
}
