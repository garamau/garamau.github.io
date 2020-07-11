let cote = 20
let l1, l2
let particules = []
let nbX, nbY, br, s, texte, cb, cbt, s2, texte2
let move = false, canvas
let trou = false
let img = 200

function preload(){
	img = loadImage("RotTache9.png")
}

function setup() {
  canvas = createCanvas(800, 800)
	canvas.mousePressed(click)
	background(img)
	angleMode(DEGREES)
	colorMode(HSB, 360, 100, 100, 100)
	gui()
	s.mouseMoved(miseAJourGui)
	s.mousePressed(function(){move = false})
	s.mouseReleased(init)
	s2.mouseMoved(miseAJourGui)
	cb.changed(miseAJourCb)
	init()
	
}

function draw() {
	if(move){
	background(img)
	translate(-cote, -l2*2)
	switch(br.value()){
		case "1": stroke(0); break;
		case "2": noStroke(); break;
		default:noStroke(); break;
	}
  for(let j = 0; j < nbY-2; j++){
		let ind
		if(j%2==0){ind = 0}else{ind = 1}
		for(let i = ind; i < nbX-2; i+=2){
			fill(particules[j][i].couleur)
			hexagone(j,i)
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
	constructor(xRef, yRef, ecart1, ecart2){
		this.pointRef = createVector(xRef, yRef)
		this.pos = createVector(xRef, yRef)
		this.e1 = ecart1
		this.e2 = ecart2
		this.vitesse = p5.Vector.random2D().mult(0.2)
		this.hue1 = random(0, 360)
		this.couleur = color(this.hue1, 100, 100, 100)
	}
	
	update(){
		let coeff = 0.005
		this.pos.add(this.vitesse)
		if(this.pos.x > this.pointRef.x + this.e1*0.9){this.pos.x = this.pointRef.x + this.e1*0.9; this.vitesse.x *= -1}
		if(this.pos.x < this.pointRef.x - this.e1*0.9){this.pos.x = this.pointRef.x - this.e1*0.9; this.vitesse.x *= -1}
		
		if(this.pos.y > this.pointRef.y + this.e2*0.9){this.pos.y = this.pointRef.y + this.e2*0.9; this.vitesse.y *= -1}
		if(this.pos.y < this.pointRef.y - this.e2*0.9){this.pos.y = this.pointRef.y - this.e2*0.9; this.vitesse.y *= -1}
		
		this.hue1 = (this.hue1+random(1))%360
		this.couleur = color(this.hue1, 100, 100, 100)
	}
	
	display(r){
		fill(this.couleur)
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
	cb = createCheckbox("Hexgones creux", false)
	cb.parent(g)
	cb.style('width', "200px")
	cb.position(15, h)
	h+= 25
	s2 = createSlider(0, 90, 0, 1)
	s2.parent(g)
	s2.position(30, h)
	s2.hide()
	texte2 = createP("0%")
	texte2.parent(g)
	texte2.position(180, h-18)
	texte2.style('width', "200px")
	texte2.hide()
	h+= m2
	texte = createP("Longueur initiale du côté des hexagones : " + 20 + " pixels")
	texte.parent(g)
	texte.position(15, h)
	texte.style('width', "400px")
	h += m2
	s = createSlider(10, 200, 20, 1)
	s.parent(g)
	s.position(15, h)
	s.style('width', '300px')
	
}

function hexagone(j, i){
	beginShape()
		vertexV(particules[j][i].pos)
		vertexV(particules[j][i+1].pos)
		vertexV(particules[j+1][i+1].pos)
		vertexV(particules[j+2][i+1].pos)
		vertexV(particules[j+2][i].pos)
		vertexV(particules[j+1][i].pos)
		vertexV(particules[j][i].pos)
	if(trou){
		let coeff = s2.value()/100
		let m = milieu(particules[j][i].pointRef,particules[j+2][i+1].pointRef)
		let sommets = []
		sommets[0] = particules[j][i].pos.copy().sub(m).mult(coeff).add(m)
		sommets[1] = particules[j][i+1].pos.copy().sub(m).mult(coeff).add(m)
		sommets[2] = particules[j+1][i+1].pos.copy().sub(m).mult(coeff).add(m)
		sommets[3] = particules[j+2][i+1].pos.copy().sub(m).mult(coeff).add(m)
		sommets[4] = particules[j+2][i].pos.copy().sub(m).mult(coeff).add(m)
		sommets[5] = particules[j+1][i].pos.copy().sub(m).mult(coeff).add(m)
		sommets[6] = sommets[0]
		beginContour()
		for(let i = 6; i >= 0; i-- ){
			vertexV(sommets[i])
		}
		endContour()
	}
	endShape()
}

function vertexV(p){
	vertex(p.x, p.y)
}

function click(){
	//print(move)
	move = !move
}

function init(){
	cote = s.value()
	move = false
	l1 = cote*(1+2*cos(60))
	l2 = cote*sin(60)
	nbX = ceil((width/(cote+l1)+2))*2
	nbY = ceil(height/l2)+4
	background(img)
	translate(-cote, -l2*2)
	
	// Calcul des sommets
	let x, y = 0, v1, v2
	for(let j = 0; j < nbY; j++){
		if(j%2 == 0){x = 0; v1 = cote; v2 = l1 }else{x = -cote*cos(60); v1 = l1; v2 = cote}
		let ligne = []
		for(let i = 0; i < nbX; i++){
			ligne[i] = new Particule(x, y, cote/2, l2/2)
			if(i%2 == 0){x += v1}else{x += v2}
		}
		particules[j] = ligne
		y+= l2
	}
	
	// Tracé des hexagones
	stroke(0)
	br.value("1")
	for(let j = 0; j < nbY-2; j++){
		let ind
		if(j%2==0){ind = 0}else{ind = 1}
		for(let i = ind; i < nbX-2; i+=2){
			fill(particules[j][i].couleur)
			hexagone(j,i)
		}
	}	
}

function miseAJourGui(){
	texte.html("Longueur initiale du côté des hexagones : " + s.value() + " pixels")
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






