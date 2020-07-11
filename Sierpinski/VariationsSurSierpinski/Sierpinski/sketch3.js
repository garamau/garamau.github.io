let s = [], t;
let n = 5;
let s1, s2;

function setup() {
  createCanvas(420, 420);
  translate(width/2, height/2);
  t = new Triangle(	createVector(0, -height/2),
  											createVector(-width/2+10, height-10),
  											createVector(width/2-10, height-10));
  s = [t];
  for(let j = 0; j < n; j++){
    let u = [];
    for(let i = 0; i < s.length; i++){
    	u = u.concat(subdivise(s[i]));
    }
    s = u.slice(0);;
  }
	
	// guy
	s1 = createSlider(0, 360, 0);
	s1.position (width + 40, 50);
	s1.style('width', '200px');
	
	s2 = createSlider(0, 1, 1, 0.1);
	s2.position (width + 40, 80);
	s2.style('width', '100px');
}

function draw() {
  background(255);
  translate(width/2, height/2);
	fill(0);
	noStroke();
	t.tracer();
	fill(255);
  for(let i = 0; i < s.length; i++){
		if(s[i].prob > s2.value()){continue;}
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
		this.prob = random(1);
  }
  
  tracer(){
		let angle = s1.value();
    let a = -this.w.x;
    let b = -this.w.y;
    push();
		let u = this.s.x + this.w.x;
		let v = this.s.y + this.w.y;
		let c = get(u, v);
    translate(u, v);
    rotate(radians(angle));
		//if(red(c) == 0){fill(255);} //else{fill(0);}
    triangle(a, b, this.v1.x + a, this.v1.y + b, this.v2.x + a, this.v2.y + b);
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