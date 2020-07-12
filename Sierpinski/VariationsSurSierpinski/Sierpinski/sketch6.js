let s = [];
let n = 4;
let = 0;
let compteur = 1;
let canvas



function setup() {
  canvas = createCanvas(420, 420);
	canvas.mouseReleased(clic)
	colorMode(HSB);
	frameRate(20);
  translate(width/2, height/2);
  let t = new Triangle(	createVector(0, -height/2 + 20),
  											createVector(-width/2+10, height-40),
  											createVector(width/2-10, height-40));
  s = [t];
  for(let j = 0; j < n; j++){
    let u = [];
    for(let i = 0; i < s.length; i++){
    	u = u.concat(subdivise(s[i]));
    }
		arrayCopy(u, s);
  }
	
	
	for(let i = 0; i < s.length; i++){
		s[i].tracer();
	}
}

function draw() {
  background(0, 0.2);
  translate(width/2, height/2);
  for(let i = 0; i < s.length; i++){
			let d = sqrt(s[i].s.x * s[i].s.x + s[i].s.y * s[i].s.y);
			let offset = map(frameCount, 0, TWO_PI*4, 0, 255)* noise(s[i].t);
			d = (d + offset)%255;
			s[i].tache.couleur = color(d, 250, 250, 0.2);
			s[i].tracer();
	}
}


class Triangle{
  constructor(p, v1, v2){
    this.s = p;
    this.v1 = v1;
    this.v2 = v2;
    let w = v1.copy();
    w.add(v2);
    w.mult(1/3);
    this.w = w;
		this.tache = new Tache(w.mag(), w.mag()*2, floor(random(10, 20)));
		this.ang = 0;
		this.ech = 1;
		this.t = random(1000);
  }
  
  tracer(){
		
    let d = dist(this.v1.x, this.v1.y, this.v2.x, this.v2.y);
    push();
    translate(this.s.x + this.w.x, this.s.y + this.w. y);
		this.ang += random(5) * PI/180;
		rotate(this.ang);
		this.ech *= 0.999;
		scale(this.ech, this.ech);
		this.tache.display();
		this.t += 0.00000001;
    pop();
	}
}

function subdivise(t){ // t un triangle
  let u = t.v1.copy().mult(1/2);;
  let v = t.v2.copy().mult(1/2);
  let p1 = t.s.copy().add(u);
  let p2 = t.s.copy().add(v);
  return [new Triangle(t.s, u, v),
          new Triangle(p1, u, v),
          new Triangle(p2, u, v)];
}

function clic(){
	if(compteur%2 == 1){noLoop();}else{loop();}
	compteur++;
}
