let s = [];
let tous = [];
let n = 5;

function setup() {
  createCanvas(400, 420);
  translate(width/2, height/2);
  let t = new Triangle(	createVector(0, -height/2),
  											createVector(-width/2+10, height-10),
  											createVector(width/2-10, height-10));
  let s = [t];
	tous.push(s);
  for(let j = 0; j < n; j++){
    let u = [];
    for(let i = 0; i < s.length; i++){
    	u = u.concat(subdivise(s[i]));
    }
    s = u;
		tous.push(u);
  }
	
	//for(let j = 0; j < tous.length; j++){
		//if(j%2 == 0){fill(0);}else{fill(255);}
		let a = tous[tous.length-1];
		for(let i = 0; i < a.length; i++){
			//if(i%3 == 0|| i%7 == 0){continue;}
			fill(0);
			a[i].tracer();
		}
	//}
}

function draw() {
  //background(255);
  
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
    push();
    translate(this.s.x + this.w.x, this.s.y + this.w. y);
    rotate(radians(random(-50, 50)));
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