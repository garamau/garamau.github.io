let s1, t1, s2, t2;

function setup() {
	createCanvas(600, 600)
	gui();
	noFill()
}

function draw() {
  background(255);
	let n = s1.value()
	let m = s2.value()
	t1.html("Écartement : " + s1.value())
	t2.html("Épaisseur : " + s2.value())
	strokeWeight(m)
	
  for (let i=0, j = 0; i< width, j < width/2; i+=n, j+=n/2) { 
    ellipse(mouseX, mouseY, j, j);
    ellipse(width/2, height/2, i, i);
  }
}

function gui(){
	s1 = createSlider(5, 50, 5)
	s1.position(250, height + 40)
	s1.style('width', '100px')
	t1 = createP("")
	t1.position(275, height+5)
	t1.html("Écartement : " + s1.value())
	
	s2 = createSlider(0.5, 15, 0.5)
	s2.position(450, height + 40)
	s2.style('width', '100px')
	t2 = createP("")
	t2.position(475, height+5)
	t2.html("Épaisseur : " + s2.value())
}
