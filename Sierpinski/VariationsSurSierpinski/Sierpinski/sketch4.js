let s = [];
let tous = [];
let n = 5;
let s1;

function setup() {
  createCanvas(420, 420);
  translate(width/2, height/2);
	colorMode(HSB);
	s1 = createSlider(0, 360, 0);
	s1.position(width +40, 100);
	s1.style('width', '180px');
  let t = new Triangle(	createVector(0, -height/2),
  											createVector(-width/2+10, height-10),
  											createVector(width/2-10, height-10));
  s = [t];
	tous.push(s);
  for(let j = 0; j < n; j++){
    let u = [];
    for(let i = 0; i < s.length; i++){
    	u = u.concat(subdivise(s[i]));
    }
    s = u;
		tous.push(u);
  }
	
	
}

function draw() {
  background(255);
	translate(width/2, height/2);
	for(let j = 0; j < tous.length; j++){
		//if(j%2 == 0){fill(0);}else{fill(255);}
		fill(0 + j*255/n, 200, 200);
		let a = tous[j];
		for(let i = 0; i < a.length; i++){
			//if(i%3 == 0|| i%7 == 0){continue;}
			a[i].tracer();
		}
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
  }
  
  tracer(){
    let a = -this.w.x;
    let b = -this.w.y;
		let angle = s1.value();
    push();
    translate(this.s.x + this.w.x, this.s.y + this.w. y);
    rotate(radians(angle));
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