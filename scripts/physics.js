class Vector { 
    static add_vector(vect1, vect2) {
        return [vect1[0] + vect2[0], vect1[1] + vect2[1]]
    }
}

class PhysObject {
    constructor(mass, velocity, position) {
        this.mass = mass;
        this.velocity = velocity;
        this.position = position;
    }
    set_mass(new_mass) {
        this.mass = new_mass;
    }
    set_velo(new_velo) {
        this.velocity = new_velo;
    }
    set_pos(new_pos) {
        this.position = new_pos;
    }
}

class DrivableObject extends PhysObject {
    constructor(mass, velocity, position) {
        super(mass, velocity, position);
        this.acceleration = [0, 0];
    }
    set_accel(new_accel) {
        this.acceleration = new_accel;
    }
}

function process_phys(objects) {
    for(var i of objects) {
        i.set_pos(Vector.add_vector(i.velocity, i.position));
        if (i instanceof DrivableObject) {
            i.set_velo(Vector.add_vector(i.velocity, i.acceleration));
        }
    }
}

export {Vector, PhysObject, DrivableObject, process_phys};