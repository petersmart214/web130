class Vector { 
    static add_vector(vect1, vect2) {
        return [vect1[0] + vect2[0], vect1[1] + vect2[1]]
    }
    static mult_vector(vect, coeff) {
        return [vect[0] * coeff, vect[1] * coeff]
    }
}
class Collider {
    //should seperate into a series of shapes/dynamic form but not now NOW WITH LINES BABY!! (so I can get normals??)
    constructor(position1, position2) {
        this.position1 = position1;
        this.position2 = position2;
    }
    //TODO: change to all realitive pos, also default link collider pos to its parent body
    get_normal(collided) {
        //do cool maths
        return [1, 1];
    }
    is_colliding(obj_list) {
        var colliding_objs = [];
        console.log("Object: " + this);
        for (var i of obj_list) {
            if (i.collider === this) {
                continue;
            }
            if (i.collider == null) {
                continue;
            }
            console.log("Object to test: " + i);
            var tmp_col_x = Math.abs(i.collider.position1[0] - this.position1[0])
            var tmp_col_y = Math.abs(i.collider.position1[1] - this.position1[1])
            var tmp_rel_xdiff = Math.abs(i.collider.position1[0] - i.collider.position2[0])
            var tmp_rel_ydiff = Math.abs(i.collider.position1[1] - i.collider.position2[1])

            console.log("       x difference of objects: " + tmp_col_x);
            console.log("       y difference of objects: " + tmp_col_y);
            console.log("       difference of x together: " + tmp_rel_xdiff);
            console.log("       difference of y together: " + tmp_rel_ydiff);
            
            //console.log("rel x according to y on slope: " + (Math.max(0, Math.min(tmp_rel_xdiff, tmp_col_y * (tmp_rel_xdiff > 0 ? (tmp_rel_ydiff / tmp_rel_xdiff) : 0))))); 

            if (this.position1[0] >= (Math.max(0, Math.min(tmp_rel_xdiff, tmp_col_y * (tmp_rel_ydiff / tmp_rel_xdiff)))) + i.collider.position1[0]) {
                console.log("Objects colliding!");
                colliding_objs.push(i);
                continue;
            }
            /*
            //do checks, for now if overlap
            if (this.position1[0] >= i.collider.position1[0] || this.position1[1] <= i.collider.position1[1]) {
                colliding_objs.set([this, i], true); //need to ensure same order for different items (sorting??)
                continue;
            }
            if (this.position2[0] <= i.collider.position2[0] || this.position2[1] >= i.collider.position2[1]) {
                colliding_objs.set([this, i], true);
                continue;
            }
            */
        }
        return colliding_objs;
    }
}
//Assuming all phys objs are colliders for now
class PhysObject {
    constructor(mass, velocity, position, collider = null) {
        this.mass = mass;
        this.velocity = velocity;
        this.position = position;
        this.collider = collider
    }
    set_mass(new_mass) {
        this.mass = new_mass;
    }
    set_velo(new_velo) {
        this.velocity = new_velo;
    }
    set_pos(new_pos) {
        //TODO: link collider pos, dont do redundant calcs (have collider.set_pos method)
        var tmp_diff =  [(this.position[0] - new_pos[0]), (this.position[1] - new_pos[1])];
        this.position = new_pos;
        if (this.collider != null) {
            this.collider.position1 = Vector.add_vector(this.collider.position1, tmp_diff);
            this.collider.position2 = Vector.add_vector(this.collider.position2, tmp_diff);
        }
    }

    collide(obj) {
        var mass_ratio = obj.mass > 0 ? this.mass / obj.mass : 0;
        var vector_diff = Vector.add_vector(this.velocity, Vector.mult_vector(obj.velocity, -1))
        this.velocity = Vector.add_vector(this.velocity, Vector.mult_vector(vector_diff, mass_ratio))
    }

}

class DrivableObject extends PhysObject {
    constructor(mass, velocity, position, collider = null) {
        super(mass, velocity, position, collider);
        this.acceleration = [0, 0];
    }
    set_accel(new_accel) {
        this.acceleration = new_accel;
    }
}

function process_phys(objects) {
    for(var i of objects) {
        i.set_pos(Vector.add_vector(i.velocity, i.position));
        if (i.collider != null) i.set_pos(Vector.add_vector(i.velocity, i.position));
        if (i instanceof DrivableObject) {
            i.set_velo(Vector.add_vector(i.velocity, i.acceleration));
        }
        if(i.collider != null) {
            process_collides(i.collider.is_colliding(objects));
        }
    }
}

function process_collides(object, collided) {
    for(var i in collided) {
        object.collide(i);
    }
}

export {Vector, PhysObject, DrivableObject, Collider, process_phys};