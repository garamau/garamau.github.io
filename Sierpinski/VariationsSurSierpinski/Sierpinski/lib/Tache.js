class Tache{
	
	constructor(r, d, n){
		this.rayon = r;
		this.ecartMax = d;
		this.nbPoints = n;
		this.couleur = 0;
		this.points = [];
		this.controlesD = [];
		this.calculPoints();
		this.calculControles();
	}
	
	calculPoints(){
		var e = 360/this.nbPoints
		for(var i = 0; i < 360; i += e){	
			var r1 = this.rayon + random(-this.ecartMax, this.ecartMax);
			var t = random(-e/3, e/3);
			var u = createVector(r1*cos(radians(i + t)), r1*sin(radians(i + t)));
			this.points.push(u);
		}
	}
	
	calculControles(){
		var e = this.points.length;
		for(var i = 0; i<e; i++){	
			var v = createVector(random(-this.ecartMax, this.ecartMax), random(-this.ecartMax, this.ecartMax));
			v.add(this.points[i]);
			this.controlesD.push(v);
		}
	}
	
	display(){
		beginShape();
			noStroke();
			fill(this.couleur);
			vertex(this.points[0].x, this.points[0].y);
				for(var i = 0; i < this.points.length-1; i++){
					//print(i);
					bezierVertex(this.controlesD[i].x, this.controlesD[i].y, this.controlesD[i+1].x, this.controlesD[i+1].y, this.points[i+1].x, this.points[i+1].y);
				}
			bezierVertex(this.controlesD[i].x, this.controlesD[i].y, this.controlesD[0].x, this.controlesD[0].y, this.points[0].x, this.points[0].y);
		endShape();
	}
}