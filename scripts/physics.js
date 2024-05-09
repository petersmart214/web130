
class Vector { 
    static add_vector(vect1, vect2) {
        return (vect1[0] + vect2[0], vect1[1] + vect2[1])
    }
}

class PhysObject {
    constructor(mass, velocity, acceleration, position) {
        this.mass = mass;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.position = position;
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
    set_pos(new_pos) {
        this.position = new_pos;
    }
}

function process_velo(objects) {
    for(i of objects) {
        console.log(objects)
        i.set_velo(Vector.add_vector(i.acceleration, i.velocity));
        i.set_pos(Vector.add_vector(i.velocity, i.position));
    }
}