let s1, t1, s2, t2;

function setup() {
	createCanvas(800, 800)
	gui();
}

function draw() {
  background(255);
	let n = s1.value()
	let m = s2.value()
	t1.html("Écartement : " + s1.value())
	t2.html("Épaisseur : " + s2.value())
	strokeWeight(m)
  for (let i=0; i<width; i+=n) { 
    line(mouseX, mouseY, i, height);
    line(width/2, height, i, 0);
  }
}

function gui(){
	s1 = createSlider(5, 50, 5)
	s1.position(250, height + 40)
	t1 = createP("")
	t1.position(275, height+5)
	t1.html("Écartement : " + s1.value())
	
	s2 = createSlider(0.5, 15, 0.5)
	s2.position(450, height + 40)
	t2 = createP("")
	t2.position(475, height+5)
	t2.html("Épaisseur : " + s2.value())
}