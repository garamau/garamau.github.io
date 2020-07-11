let nbPointes = 18
let nbPoly = 32
let polys = []
let s1, t1, s2, t2, s3, t3
let couleurs = []
let c, tr = true

function setup() {
	c = createCanvas(1000, 1000)
	translate(width/2, height/2)
	angleMode(DEGREES)
	couleurs = [color(0), color(255, 0, 0), color(255, 255, 0),
						  color(255, 0, 255), color(0, 255, 0), color(0, 255, 255), color(0, 0, 255)]
	gui()
	c.mouseReleased(tracer)
}

function draw() {
	if(tr){
		background(255)
		translate(width/2, height/2)
		nbPointes = s1.value()
		miseAJourGui()
		calculSommets(nbPointes)

		for(let i = nbPoly-1; i >= 0; i--){
			let t = s3.value()
			fill(couleurs[i%t])
			let angle = 8*i*(Math.sin(frameCount/80))
			push()
			rotate(angle)
			beginShape()
				for(let j = 0; j < 2*nbPointes; j++){
					vertex(polys[i][j].x, polys[i][j].y)
				}
			endShape(CLOSE)
			pop()
		}
	}
}

function gui(){
	let d = createDiv("")
	d.position(width + 10, 0)
	d.style('width: 300px')
	let e1 = 20, e2 = 40
	let h = e1
	let k = 40
	t1 = createP("Nombre de pointes")
	s1 = createSlider(3, 30, 3, 1)
	t1.parent(d)
	s1.parent(d)
	t1.position(k, h)
	h += e2
	s1.position(k, h)
	
	h += e1
	t2 = createP("Taille des pointes")
	s2 = createSlider(0, 10, 5, 1) // 0 -> 0, 10 -> 0.5 donc prendre value()/20
	t2.parent(d)
	s2.parent(d)
	t2.position(k, h)
	h += e2
	s2.position(k, h)
	
	h += e1
	t3 = createP("Nombre de couleurs")
	s3 = createSlider(2, 7, 2, 1) 
	t3.parent(d)
	s3.parent(d)
	t3.position(k, h)
	h += e2
	s3.position(k, h)
}

function calculSommets(n){
	nbPointes = n;
	polys = []
	let accr = s2.value()/20
	for(let i = 0; i < nbPoly; i++){
		let sommets = []
		for(let j = 0; j < 2*nbPointes; j+=2){
			let v = createVector(20+i*10, 0)
			let angle = j*360/(nbPointes*2)
			let w = v.copy().mult(1+accr)
			let l = w.mag()
			sommets[j] = createVector(l*cos(angle), l*sin(angle))
			w = v.copy().mult(1-accr)
			l = w.mag()
			angle = (j+1)*360/(nbPointes*2)
			sommets[j+1] = createVector(l*cos(angle), l*sin(angle))
		}
		polys.push(sommets)
	}
}

function miseAJourGui(){
	t1.html("Nombre de pointes : " + s1.value())
	t2.html("Taille des pointes : " + s2.value())
	t3.html("Nombre de couleurs : " + s3.value())
}

function tracer(){
	tr = !tr
}
