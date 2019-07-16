class LightSource {

    constructor(position, radius, heading, fov, radiusResolution, fillColour) {

        this.raycaster = new RayCaster(position, radius, heading, fov, radiusResolution);
        this.fillColour = fillColour;

        this.castVertices = [];

    }

    setRadius(radius) {
        this.raycaster.radius = radius;
    }

    setFov(fov) {
        this.raycaster.fov = Math.min(Math.PI*2, fov);
    }

    toggleDebug() {
        this.raycaster.debug = !this.raycaster.debug;
    }

    faceTowards(pos) {

        let vec = Vector2.sub(pos, this.raycaster.position);
        this.raycaster.heading = vec.heading();

    }

    move(vel) {
        this.raycaster.position.add(vel);
    }

    update(obstacles) {

        this.castVertices = this.raycaster.raycast(obstacles);

    }

    render() {

        noStroke();

        beginShape();  // render illuminated area
        vertex(this.raycaster.position.x, this.raycaster.position.y);
        
        for (let v of this.castVertices) {
            vertex(v.x, v.y);
        }
        if (this.raycaster.debug) {
            for (let v of this.castVertices) {
                fill("rgb(255,0,0)");
                circle(v.x, v.y, 3);
            }
        }

        fill(this.fillColour);
        endShape(CLOSE);

        let front = Vector2.mult( Vector2.fromHeading( this.raycaster.heading ), 10),
        left  = Vector2.mult( Vector2.fromHeading( this.raycaster.heading + Math.PI * 2/3), 6 ),
        right = Vector2.mult( Vector2.fromHeading( this.raycaster.heading - Math.PI * 2/3), 6 );

        front.add(this.raycaster.position);
        left.add(this.raycaster.position);
        right.add(this.raycaster.position);

        fill("rgb(255,255,0)");
        stroke(0);

        beginShape();  // render triangle to show direction we are facing

        vertex(front.x, front.y);
        vertex(left.x, left.y);
        vertex(right.x, right.y);

        endShape(CLOSE);

    }

}