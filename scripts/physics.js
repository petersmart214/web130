
class Vector { 
    add_vector(vect1, vect2) {
        return (vect1.x + vect2.x, vect1.y + vect2.y)
    }
}

class PhysObject {
    constructor(mass, velocity, acceleration, position) {
        this.mass = mass;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.position = position;
        return this
    }
    set_mass(new_mass) {
        this.mass = new_mass;
    }
    set_velo(new_velo) {
        this.velocity = new_velo;
    }
    set_accel(new_accel) {
        this.acceleration = new_accel;
    }
}

function process_velo(objects) {
    for(i in objects) {
        i.set_velo(Vector.add_vector(i.acceleration, i.velocity));
        i.set_pos(Vector.add_vector(i.velocity, i.position));
    }
    console.log(objects.position);
}

process_velo(new PhysObject(10, (5, 5), (5, -5), (0, 0)))