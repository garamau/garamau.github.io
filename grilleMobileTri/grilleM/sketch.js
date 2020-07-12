let base = 30
let hauteur = 30
let particules = []
let nbX, nbY //, br, s, texte, cb, cbt, s2, texte2, s3, texte3
let move = false, canvas
let trou = false
let img

//
/*
function preload(){
	img = loadImage("RotTache9.png")
}
*/

function setup() {
  canvas = createCanvas(800, 800)
	canvas.mousePressed(click)
	background(200)
	angleMode(DEGREES)
	colorMode(HSB, 360, 100, 100, 100)
	gui()
	s.mouseMoved(miseAJourGui)
	s.mousePressed(function(){move = false})
	s.mouseReleased(init)
	s3.mouseMoved(miseAJourGui)
	s3.mousePressed(function(){move = false})
	s3.mouseReleased(init)
	s2.mouseMoved(miseAJourGui)
	cb.changed(miseAJourCb)
	init()
	
}

function draw() {
	if(move){
	background(200)
	translate(-base, -hauteur)
	switch(br.value()){
		case "1": stroke(0); break;
		case "2": noStroke(); break;
		default:noStroke(); break;
	}
		
  for(let j = 0; j < nbY-1; j++){
		for(let i = 0; i < nbX-1; i++){
			fill(particules[j][i].couleur1)
			beginShape()
				vertexV(particules[j][i].pos)
				vertexV(particules[j][i+1].pos)
				vertexV(particules[j+1][i].pos)
				vertexV(particules[j][i].pos)
			if(trou){
				let coeff = s2.value()/100
				let m = milieu(particules[j][i+1].pos, particules[j+1][i].pos)
				let v1 = m.copy().sub(particules[j][i].pos).mult(2/3).add(particules[j][i].pos)
				let sommets = []
				sommets[0] = particules[j][i].pos.copy().sub(v1).mult(coeff).add(v1)
				sommets[1] = particules[j][i+1].pos.copy().sub(v1).mult(coeff).add(v1)
				sommets[2] = particules[j+1][i].pos.copy().sub(v1).mult(coeff).add(v1)
				sommets[3] = sommets[0]
				beginContour()
					for(let i = 3; i >= 0; i-- ){
						vertexV(sommets[i])
					}
				endContour()
			}
			endShape()
			
			fill(particules[j][i].couleur2)
			beginShape()
				vertexV(particules[j][i+1].pos)
				vertexV(particules[j+1][i+1].pos)
				vertexV(particules[j+1][i].pos)
				vertexV(particules[j][i+1].pos)
			if(trou){
				let coeff = s2.value()/100
				let m = milieu(particules[j][i+1].pos, particules[j+1][i].pos)
				let v1 = m.copy().sub(particules[j+1][i+1].pos).mult(2/3).add(particules[j+1][i+1].pos)
				//let v2 = createVector(base, hauteur).mult(4/3)
				let sommets = []
				sommets[0] = particules[j][i+1].pos.copy().sub(v1).mult(coeff).add(v1)
				sommets[1] = particules[j+1][i+1].pos.copy().sub(v1).mult(coeff).add(v1)
				sommets[2] = particules[j+1][i].pos.copy().sub(v1).mult(coeff).add(v1)
				sommets[3] = sommets[0]
				beginContour()
					for(let i = 3; i >= 0; i-- ){
						vertexV(sommets[i])
					}
				endContour()
			}
			endShape()
		}
	}
	
	for(let j = 0; j < nbY; j++){
		for(let i = 0; i < nbX; i++){
			particules[j][i].update()
		}
	}
	
	}
}

class Particule{
	constructor(xRef, yRef, ecart1, ecart2){  // Ref sera le milieu de la diagonale
		// e1 et e2 seront le tiers de la base et de la hauteur
		this.pointRef = createVector(xRef, yRef)
		this.pos = createVector(xRef, yRef)
		this.e1 = ecart1
		this.e2 = ecart2
		this.vitesse = p5.Vector.random2D().mult(0.2)
		this.hue1 = random(0, 180)
		this.couleur1 = color(this.hue1, 100, 100, 100)
		
		this.hue2 = random(180, 360)
		this.couleur2 = color(this.hue2, 100, 100, 100)
	}
	
	update(){
		let coeff = 0.005
		this.pos.add(this.vitesse)
		if(this.pos.x > this.pointRef.x + this.e1*0.9){this.pos.x = this.pointRef.x + this.e1*0.9; this.vitesse.x *= -1}
		if(this.pos.x < this.pointRef.x - this.e1*0.9){this.pos.x = this.pointRef.x - this.e1*0.9; this.vitesse.x *= -1}
		
		if(this.pos.y > this.pointRef.y + this.e2*0.9){this.pos.y = this.pointRef.y + this.e2*0.9; this.vitesse.y *= -1}
		if(this.pos.y < this.pointRef.y - this.e2*0.9){this.pos.y = this.pointRef.y - this.e2*0.9; this.vitesse.y *= -1}
		
		this.hue1 = (this.hue1+random(1))%360
		this.couleur1 = color(this.hue1, 100, 100, 100)
		this.hue2 = (this.hue2+random(1))%360
		this.couleur2 = color(this.hue2, 100, 100, 100)
	}
	
	display(r){
		fill(this.couleur1)
		ellipse(this.pos.x, this.pos.y, r)
	}
}

function triangleV(p1, p2, p3){
	triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y)
}

function gui(){
	let g = createDiv(" ")
	g.position(width + 30, 30)
	let m1 = 30, m2 = 40, h = 60
	br = createRadio()
	br.parent(g)
	br.style('width', '120px')
	br.option('Avec contours', 1)
	br.option('Sans contours', 2)
	br.value("1")
	let t = createElement("h2", "Cliquez dans l'image pour arreter/démarrer")
	t.position(200, height + 20)
	cb = createCheckbox("Triangles creux", false)
	cb.parent(g)
	cb.style('width', "200px")
	cb.position(15, h)
	h+= 25
	s2 = createSlider(0, 90, 0, 1)
	s2.parent(g)
	s2.position(30, h)
	s2.style('width', '100px')
	s2.hide()
	texte2 = createP("0%")
	texte2.parent(g)
	texte2.position(180, h-18)
	texte2.style('width', "200px")
	texte2.hide()
	h+= m2
	texte = createP("Longueur initiale de la base des triangles : " + 20 + " pixels")
	texte.parent(g)
	texte.position(15, h)
	texte.style('width', "400px")
	h += m2
	s = createSlider(10, 200, 20, 1)
	s.parent(g)
	s.position(15, h)
	s.style('width', '300px')
	h+= m2
	texte3 = createP("Longueur initiale de la hauteur des triangles : " + 20 + " pixels")
	texte3.parent(g)
	texte3.position(15, h)
	texte3.style('width', "400px")
	h += m2
	s3 = createSlider(10, 200, 20, 1)
	s3.parent(g)
	s3.position(15, h)
	s3.style('width', '300px')
	
}

function vertexV(p){
	vertex(p.x, p.y)
}

function click(){
	move = !move
}

function init(){
	base = s.value()
	hauteur = s3.value()
	move = false
	nbX = ceil(width/base)+3
	nbY = ceil(height/hauteur)+3
	background(200)
	translate(-base, -hauteur)
	
	// Calcul des sommets
	for(let j = 0; j < nbY; j++){
		let ligne = []
		for(let i = 0; i < nbX; i++){
			ligne[i] = new Particule(i*base, j*hauteur, base/3, hauteur/3)
		}
		particules[j] = ligne
	}
	
	for(let j = 0; j < nbY-1; j++){
		for(let i = 0; i < nbX-1; i++){
			fill(particules[j][i].couleur1)
			triangleV(particules[j][i].pos, particules[j][i+1].pos, particules[j+1][i].pos)
			fill(particules[j][i].couleur2)
			triangleV(particules[j][i+1].pos, particules[j+1][i+1].pos, particules[j+1][i].pos)
		}
	}
}

function miseAJourGui(){
	texte.html("Longueur initiale de la base des triangles : " + s.value() + " pixels")
	texte3.html("Longueur initiale de la hauteur des triangles : " + s3.value() + " pixels")
	texte2.html(s2.value() + "%")
}

function miseAJourCb(){
	if(this.checked()){
		trou = true
		s2.show()
		texte2.show()
	}else{
		trou = false
		s2.hide()
		texte2.hide()
	}
}
	
function milieu(p, q){
	return createVector((p.x + q.x)/2, (p.y + q.y)/2)
}




