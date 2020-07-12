let sym = 6
let button, clearButton
let xoff = 0
let s, t
let d

function setup() {
	createCanvas(800, 800)
	d = new Date()
	background(0)
	angleMode(DEGREES)
	gui(20, 40, 20)
	miseAJourGui()
	button.mousePressed(sauveFlocon)
	clearButton.mousePressed(effacer)
	colorMode(HSB, 255, 255, 255)
}

function sauveFlocon(){
	save('flocon-'+d.getTime()+'.png')
}

function effacer(){
	background(0)
}

function gui(mg, ec1, ec2){
	mg = mg + width
	let h = ec1
	let texte = createP("Commencez à dessiner!")
	texte.position(mg, h)
	texte.style('color', '#ff0000')
	texte.style('font-size', '24px')
	h+=ec1+20
	button = createButton('Enregistrer')
	button.position(mg, h)
	clearButton = createButton('Éffacer')
	h += ec1
	clearButton.position(mg, h)
	h+= ec1
	t = createP("Épaisseur du trait : ")
	t.position(mg, h)
	h+=ec1
	s = createSlider(1, 32, 4, 0.1)
	s.position(mg, h)
	s.style('width', '100px')
}

function miseAJourGui(){
	t.html("Épaisseur du trait : "+s.value())
}

function draw() {
	translate(width/2, height/2)
	miseAJourGui()
	if(mouseX >0 && mouseX < width && mouseY >0 && mouseY < height){
		let mx = mouseX - width/2
		let my = mouseY - height/2
		let pmx = pmouseX - width/2
		let pmy = pmouseY - height/2

		if(mouseIsPressed){
			let hu = noise(xoff)*255
			// Pour niveaux de gris, enlever HSB et envoyer entre 0 et 255
			//let hu = map(sin(xoff)-cos(xoff), -1, 1, 0, 360)
			xoff += 0.01
			stroke(hu, 255, 255, 100)
			//let d = dist(mx, my, pmx, pmy)
			//let sw = map(d, 0, 8,8, 1)
			let sw = s.value()
			strokeWeight(sw)
			for(let i = 0; i < sym; i++){
			let angle = 360/sym	
			rotate(angle)
			line(mx, my, pmx, pmy)
			push()
			scale(1, -1)
			line(mx, my, pmx, pmy)
			pop()
			}
		}
	}
}
