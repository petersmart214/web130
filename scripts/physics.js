
class vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add_vector(vect) {
        this.x = this.x + vect.x;
        this.y = this.y + vect.y;
    }
}

class phys_object {
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
}

function process_velo(objects) {
    for(i in objects) {
        i.set_velo(i.velocity.add_vector(i.acceleration));
        i.set_pos(i.position.add_vector(i.velocity));
    }
    console.log(objects.position);
}

process_velo(new phys_object(10, new vector(5, 5), new vector(5, -5), new vector(0, 0)))