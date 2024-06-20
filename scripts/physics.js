class Vector { 
    static add_vector(vect1, vect2) {
        return [vect1[0] + vect2[0], vect1[1] + vect2[1]]
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
    is_colliding(obj_list, colliding_objs) {
        for (var i of obj_list) {
            if (i.collider == null) {
                continue;
            }
            var tmp_col_x = Math.abs(i.collider.position1[0] - this.position1[0])
            var tmp_col_y = Math.abs(i.collider.position1[1] - this.position1[1])
            var tmp_rel_xdiff = Math.abs(i.collider.position1[0] - i.collider.position2[0])
            var tmp_rel_ydiff = Math.abs(i.collider.position1[1] - i.collider.position2[1])

            console.log("col x: " + tmp_col_x);
            console.log("col y: " + tmp_col_y);
            console.log("rel x: " + tmp_rel_xdiff);
            console.log("rel y: " + tmp_rel_ydiff);
            
            console.log("rel x according to y on slope: " + (Math.max(0, Math.min(tmp_rel_xdiff, tmp_col_y * (tmp_rel_xdiff > 0 ? (tmp_rel_ydiff / tmp_rel_xdiff) : 0))))); 

            if (this.position1[0] >= (Math.max(0, Math.min(tmp_rel_xdiff, tmp_col_y * (tmp_rel_ydiff / tmp_rel_xdiff)))) + i.collider.position1[0]) {
                console.log("Objects colliding!");
                colliding_objs.set([this, i], true);
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
        //console.log(colliding_objs);
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

    collide(collider) {
        return;
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
    var colliding_objs = new Map();
    for(var i of objects) {
        console.log(i);
        i.set_pos(Vector.add_vector(i.velocity, i.position));
        if (i.collider != null) i.set_pos(Vector.add_vector(i.velocity, i.position));
        if (i instanceof DrivableObject) {
            i.set_velo(Vector.add_vector(i.velocity, i.acceleration));
        }
        if(i.collider != null) {
            colliding_objs = i.collider.is_colliding(objects, colliding_objs);
        }
    }
    for (var ii in colliding_objs) {

    }
}

export {Vector, PhysObject, DrivableObject, Collider, process_phys};