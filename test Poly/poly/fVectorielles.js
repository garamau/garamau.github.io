function lineV(v1, v2) {
	line(v1.x, v1.y, v2.x, v2.y)
}

function rectV(v, l, h){
	rect(v.x, v.y, l, h)
}

function ellipseV(v, l, h){
	ellipse(v.x, v.y, l, h)
}
									 

function triangleV(v1, v2, v3){
	triangle(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y)
}

function bezierV(point1, controle1, controle2, point2){
	bezier(point1.x, point1.y, controle1.x, controle1.y, controle2.x, controle2.y, point2.x, point2.y);
}

function vertexV(v){
	vertex(v.x, v.y)
}

function bezierVertexV(controle1, controle2, point2){
	bezierVertex(controle1.x, controle1.y, controle2.x, controle2.y, point2.x, point2.y)
}

function translateV(v){
	translate(v.x, v.y)
}