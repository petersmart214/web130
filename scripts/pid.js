
class pid {
    constructor(set_time, assumed_acceleration, gain) {
        this.time = set_time;
        this.acceleration = assumed_acceleration;
        this.gain = gain;
    }
    process(wantedpos, pos, velo) {
        //Perform error correction, returns from -1 to 1
        var difference = (wantedpos - pos);
        var drive = Math.max(Math.min(((((difference / this.time) - velo) / this.acceleration) * this.gain), 1), -1);
        return drive
    }   
}

export {pid};